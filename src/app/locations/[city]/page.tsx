import { Metadata } from 'next';
import { db } from '@/db';
import { listings } from '@/db/schema';
import { eq, ilike } from 'drizzle-orm';
import ListingCard from '@/components/listings/ListingCard';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Props = {
    params: { city: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const city = decodeURIComponent(params.city);
    const title = `Roommates in ${city} | RoomMateC`;
    const description = `Find the best roommates and rooms for rent in ${city}. Verified listings, secure chats, and perfect matches on RoomMateC.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: ['/og-image.png'],
        },
    };
}

export default async function LocationPage({ params }: Props) {
    const city = decodeURIComponent(params.city);
    const cityListings = await db.select().from(listings).where(ilike(listings.location, `%${city}%`));

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
                <div className="mb-8 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Roommates in <span className="text-purple-600 capitalize">{city}</span>
                    </h1>
                    <p className="text-slate-600">
                        Found {cityListings.length} results for rooms and roommates in {city}.
                    </p>
                </div>

                {cityListings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cityListings.map((listing) => (
                            <ListingCard
                                key={listing.id}
                                listing={{
                                    ...listing,
                                    images: (listing.images as string[]) || [],
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">No listings found in {city} yet</h2>
                        <p className="text-gray-500 mb-6">Be the first to post a room in this area!</p>
                        <Link href="/listings/create">
                            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                                Post a Room in {city}
                            </Button>
                        </Link>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
