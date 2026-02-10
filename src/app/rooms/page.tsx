
"use client";
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ListingCard from '@/components/listings/ListingCard';
import { Listing } from '@/types'; // Assuming types exist, otherwise define or use any
import axios from 'axios';
import { Loader2 } from 'lucide-react';

export default function RoomsPage() {
    const [listings, setListings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const { data } = await axios.get('/api/listings');
                setListings(data.listings || []);
            } catch (error) {
                console.error("Failed to fetch listings", error);
            } finally {
                setLoading(false);
            }
        };
        fetchListings();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                        Find Your Perfect Room
                    </h1>
                    <p className="text-slate-600 text-lg">
                        Browse verified listings and find a place to call home.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="size-10 text-purple-600 animate-spin" />
                    </div>
                ) : listings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {listings.map((listing) => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                        <p className="text-gray-500 text-xl">No rooms found at the moment.</p>
                        <p className="text-gray-400 mt-2">Check back later or post your own!</p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
