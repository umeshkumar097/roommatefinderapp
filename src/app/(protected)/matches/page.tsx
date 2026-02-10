"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function MatchesListPage() {
    const [matches, setMatches] = useState<any[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const { data } = await axios.get("/api/matches");
                setMatches(data.matches);
            } catch (error) {
                console.error("Failed to fetch matches", error);
            }
        };
        if (user) fetchMatches();
    }, [user]);

    if (!user) return <div>Please login</div>;

    return (
        <div className="max-w-2xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold mb-6">Your Matches (Interested Roommates)</h1>

            {matches.length === 0 ? (
                <p className="text-gray-500">No matches yet.</p>
            ) : (
                <div className="space-y-4">
                    {matches.map((match) => (
                        <div key={match.matchId} className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                {match.user.name[0]}
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold">{match.user.name} <span className="text-gray-400 font-normal">liked</span> {match.listing.title}</p>
                                <p className="text-sm text-gray-500">{match.user.email}</p>
                            </div>
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700">
                                Message
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
