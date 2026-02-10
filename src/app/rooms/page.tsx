
"use client";
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ListingCard from '@/components/listings/ListingCard';

import axios from 'axios';
import { Loader2, Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function RoomsPage() {
    const [listings, setListings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

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

    const filteredListings = listings.filter(listing =>
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
                {/* Hero / Fileters Header */}
                <div className="mb-8 space-y-4">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Find Your Perfect Room
                        </h1>
                        <p className="text-slate-500">
                            Browse verified listings and find a place to call home.
                        </p>
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                            <Input
                                placeholder="Search by location or keyword..."
                                className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <Button variant="outline" className="flex-1 md:flex-none gap-2 h-12">
                                <SlidersHorizontal className="size-4" />
                                Filters
                            </Button>
                            <Button className="flex-1 md:flex-none bg-gradient-to-r from-purple-600 to-pink-600 text-white h-12 px-8">
                                Search
                            </Button>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="size-10 text-purple-600 animate-spin" />
                    </div>
                ) : filteredListings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredListings.map((listing) => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                        <div className="mx-auto size-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Search className="size-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-xl font-medium">No rooms found</p>
                        <p className="text-gray-400 mt-2">Try adjusting your search terms</p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
