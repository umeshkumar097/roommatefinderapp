"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import ChatWindow from "@/components/chat/ChatWindow";

export default function MessagesPage() {
    const { user } = useAuth();
    const [conversations, setConversations] = useState<any[]>([]);
    const [phoneRequests, setPhoneRequests] = useState<any[]>([]);
    const [selectedPeer, setSelectedPeer] = useState<{ id: number, name: string } | null>(null);

    useEffect(() => {
        if (!user) return;

        // Fetch pending phone requests
        axios.get("/api/chat/phone-access?type=incoming")
            .then(({ data }) => setPhoneRequests(data))
            .catch(err => console.error(err));

        // In a real app, we'd have a specific endpoint for "my conversations"
        // For now, let's reuse the matches endpoint since matches = conversations starters
        if (!user) return;

        axios.get("/api/matches").then(({ data }) => {
            // Transform matches to conversations list
            const convos = data.matches.map((m: any) => ({
                id: m.matchId,
                peerId: m.user.id, // The other user
                peerName: m.user.name,
                peerImage: m.user.images?.[0],
                lastMessage: "Start chatting..." // Placeholder or fetch real last message
            }));
            setConversations(convos);
        });
    }, [user]);

    const handleRequestAction = async (requestId: number, status: 'approved' | 'rejected') => {
        try {
            await axios.put('/api/chat/phone-access', { requestId, status });
            // Remove from list
            setPhoneRequests(prev => prev.filter(req => req.id !== requestId));
        } catch (error) {
            console.error("Failed to update request", error);
        }
    };

    if (!user) return <div className="p-10">Please login</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 h-[calc(100vh-80px)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                {/* Sidebar */}
                <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-gray-100 dark:border-zinc-800">
                        <h2 className="font-bold text-lg">Messages</h2>
                    </div>

                    {/* Phone Requests Section */}
                    {phoneRequests.length > 0 && (
                        <div className="p-4 bg-orange-50 border-b border-orange-100">
                            <h3 className="text-sm font-semibold text-orange-800 mb-2">Phone Requests</h3>
                            <div className="space-y-2">
                                {phoneRequests.map((req) => (
                                    <div key={req.id} className="flex items-center justify-between text-sm bg-white p-2 rounded border border-orange-200">
                                        <span className="font-medium">{req.requesterName}</span>
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => handleRequestAction(req.id, 'approved')}
                                                className="px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-xs"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleRequestAction(req.id, 'rejected')}
                                                className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex-1 overflow-y-auto">
                        {conversations.length === 0 && <p className="p-4 text-gray-400 text-sm">No conversations yet.</p>}
                        {conversations.map((c) => (
                            <div
                                key={c.id}
                                onClick={() => setSelectedPeer({ id: c.peerId, name: c.peerName })}
                                className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition ${selectedPeer?.id === c.peerId ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}`}
                            >
                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold shrink-0">
                                    {c.peerName[0]}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="font-semibold text-sm truncate">{c.peerName}</p>
                                    <p className="text-xs text-gray-500 truncate">{c.lastMessage}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="md:col-span-2 h-full">
                    {selectedPeer ? (
                        <ChatWindow peerId={selectedPeer.id} peerName={selectedPeer.name} />
                    ) : (
                        <div className="h-full bg-gray-50 dark:bg-zinc-900/50 rounded-lg border border-dashed border-gray-300 dark:border-zinc-700 flex items-center justify-center text-gray-400">
                            Select a conversation to start chatting
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
