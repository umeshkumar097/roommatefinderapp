"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSocket } from "@/components/providers/SocketProvider";
import { useAuth } from "@/context/AuthContext";

interface Message {
    id: number;
    senderId: number;
    receiverId: number;
    content: string;
    createdAt: string;
}

export default function ChatWindow({ peerId, peerName }: { peerId: number, peerName: string }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const { socket, isConnected } = useSocket();
    const { user } = useAuth();
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!user || !peerId) return;

        // Fetch history
        axios.get(`/api/messages/${peerId}`).then(({ data }) => {
            setMessages(data.messages);
            scrollToBottom();
        });

        if (socket) {
            const roomId = [user.id, peerId].sort().join('-'); // Simple room ID: "1-2"
            socket.emit("join-room", roomId);

            const messageHandler = (msg: Message) => {
                if ((msg.senderId === peerId && msg.receiverId === user.id) ||
                    (msg.senderId === user.id && msg.receiverId === peerId)) {
                    setMessages((prev) => [...prev, msg]);
                    scrollToBottom();
                }
            };

            socket.on("new-message", messageHandler);

            return () => {
                socket.off("new-message", messageHandler);
            };
        }
    }, [user, peerId, socket]);

    const scrollToBottom = () => {
        setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    };

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !user) return;

        const tempMsg = {
            id: Date.now(),
            senderId: user.id,
            receiverId: peerId,
            content: input,
            createdAt: new Date().toISOString()
        };

        // Optimistic update
        setMessages((prev) => [...prev, tempMsg]);
        setInput("");
        scrollToBottom();

        // Send to API (which saves to DB)
        // We also need to emit socket event here manually if the API doesn't do it via Redis
        // Or we rely on the API response. Let's send via socket client too for immediate peer update?
        // Actually, sending via API is safer for persistence first.

        try {
            await axios.post("/api/messages", {
                receiverId: peerId,
                content: tempMsg.content
            });

            // Emit socket event for real-time
            if (socket) {
                socket.emit("send-message", tempMsg);
            }

        } catch (error) {
            console.error("Failed to send", error);
            // Should rollback optimistic update here
        }
    };

    return (
        <div className="flex flex-col h-[600px] border border-gray-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
            <div className="bg-indigo-600 p-4 text-white font-bold flex justify-between items-center">
                <span>Chat with {peerName}</span>
                <span className={`text-xs px-2 py-1 rounded ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}>
                    {isConnected ? 'Connected' : 'Offline'}
                </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-black space-y-4">
                {messages.map((msg) => {
                    const isMe = msg.senderId === user?.id;
                    return (
                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] p-3 rounded-lg text-sm ${isMe
                                    ? 'bg-indigo-600 text-white rounded-br-none'
                                    : 'bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-zinc-700 rounded-bl-none shadow-sm'
                                }`}>
                                <p>{msg.content}</p>
                                <span className="text-[10px] opacity-70 block text-right mt-1">
                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            <form onSubmit={sendMessage} className="p-4 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent"
                />
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 font-medium">Send</button>
            </form>
        </div>
    );
}
