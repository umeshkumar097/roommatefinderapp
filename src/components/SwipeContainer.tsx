"use client";

import React, { useState, useEffect } from "react";
import SwipeCard from "./SwipeCard";
import axios from "axios";
import { AnimatePresence } from "framer-motion";

const SwipeContainer = () => {
    const [listings, setListings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeed();
    }, []);

    const fetchFeed = async () => {
        try {
            const { data } = await axios.get("/api/listings/feed");
            setListings(data.listings);
        } catch (error) {
            console.error("Failed to fetch feed", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSwipe = async (direction: "left" | "right", listingId: number) => {
        // Optimistically update UI
        setListings((prev) => prev.slice(1)); // Remove the top card

        if (direction === "right") {
            try {
                await axios.post("/api/matches", { listingId });
                console.log("Matched with listing", listingId);
            } catch (error) {
                console.error("Failed to like listing", error);
                // Maybe revert UI or show toast error?
            }
        }
        // "left" swipe is just a pass, no API call needed immediately unless we want to track passes
    };

    if (loading) {
        return <div className="flex justify-center items-center h-full">Loading candidates...</div>;
    }

    if (listings.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[600px] text-center p-6">
                <h3 className="text-2xl font-bold mb-2">No more listings!</h3>
                <p className="text-gray-500">Check back later for new potential roommates.</p>
                <button onClick={fetchFeed} className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition">
                    Refresh
                </button>
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-sm h-[600px] mx-auto">
            {/* Render only the top 2 cards for performance */}
            {listings.slice(0, 2).reverse().map((listing, index) => (
                <SwipeCard
                    key={listing.id}
                    listing={listing}
                    onSwipe={(dir) => handleSwipe(dir, listing.id)}
                    isFront={index === listings.slice(0, 2).length - 1} // Last one in sliced reversed array is the "front" visually if we stack them? 
                // Actually standard implementation:
                // Map order: Bottom to Top.
                // Listings: [A, B, C]. Slice(0,2) -> [A, B]. Reverse -> [B, A].
                // Render B (index 0), then A (index 1). A is top z-index.
                // So isFront is true for the last element in this mapped array.
                />
            ))}
        </div>
    );
};

export default SwipeContainer;
