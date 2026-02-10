"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import MapListings from "@/components/map/MapListings";

export default function MapPage() {
    const [listings, setListings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/api/listings")
            .then(({ data }) => {
                setListings(data.listings);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="h-[calc(100vh-64px)] w-full flex flex-col">
            <div className="p-4 bg-white dark:bg-zinc-900 shadow-sm z-10">
                <h1 className="text-xl font-bold">Explore on Map</h1>
            </div>
            <div className="flex-1 relative">
                {loading ? (
                    <div className="flex items-center justify-center h-full">Loading...</div>
                ) : (
                    <MapListings listings={listings} />
                )}
            </div>
        </div>
    );
}
