"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import SwipeCard from "@/components/matching/SwipeCard";
import { useAuth } from "@/context/AuthContext";

export default function MatchPage() {
    const [listings, setListings] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { user } = useAuth();

    useEffect(() => {
        const fetchListings = async () => {
            // Fetch all listings for now to match against
            // Ideally exclude own listings and already matched ones
            try {
                const { data } = await axios.get("/api/listings");
                const filtered = data.listings.filter((l: any) => l.userId !== user?.id);
                setListings(filtered);
            } catch (error) {
                console.error("Failed to fetch listings", error);
            }
        };
        if (user) fetchListings();
    }, [user]);

    const handleSwipe = async (direction: "left" | "right") => {
        const currentListing = listings[currentIndex];

        if (direction === "right") {
            try {
                await axios.post("/api/matches", { listingId: currentListing.id });
                console.log("Liked listing", currentListing.id);
            } catch (error) {
                console.error("Failed to like listing", error);
            }
        }

        // Move to next card
        setTimeout(() => {
            setCurrentIndex(prev => prev + 1);
        }, 200); // Wait for animation roughly
    };

    if (!user) return <div className="p-10 text-center">Please login</div>;
    if (listings.length === 0) return <div className="p-10 text-center">Loading or No Listings Found</div>;
    if (currentIndex >= listings.length) return <div className="p-10 text-center text-xl">You've reached the end! Check back later.</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] overflow-hidden bg-gray-100 dark:bg-black">
            <div className="relative w-full max-w-sm h-[600px]">
                {/* We can stack cards, but for simplicity just show current one and maybe next one underneath */}

                {/* Next Card (Behind) */}
                {currentIndex + 1 < listings.length && (
                    <div className="absolute top-0 left-0 w-full h-full scale-95 opacity-50 pointer-events-none transform translate-y-4">
                        <SwipeCard key={listings[currentIndex + 1].id} listing={listings[currentIndex + 1]} onSwipe={() => { }} />
                    </div>
                )}

                {/* Current Card */}
                <SwipeCard
                    key={listings[currentIndex].id}
                    listing={listings[currentIndex]}
                    onSwipe={handleSwipe}
                />
            </div>

            <div className="mt-8 flex gap-8">
                <button
                    onClick={() => handleSwipe("left")}
                    className="w-16 h-16 rounded-full bg-white dark:bg-zinc-800 shadow-lg text-red-500 text-3xl flex items-center justify-center hover:scale-110 transition"
                >
                    ✕
                </button>
                <button
                    onClick={() => handleSwipe("right")}
                    className="w-16 h-16 rounded-full bg-white dark:bg-zinc-800 shadow-lg text-green-500 text-3xl flex items-center justify-center hover:scale-110 transition"
                >
                    ♥
                </button>
            </div>
        </div>
    );
}
