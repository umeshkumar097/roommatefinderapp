import Link from "next/link";
import { MapPin, Heart, BadgeCheck } from "lucide-react";

interface ListingCardProps {
    listing: {
        id: number;
        title: string;
        price: number;
        location: string;
        images: string[];
        user?: {
            name: string;
            image: string[];
        };
    };
}

import { useCurrency } from "@/context/CurrencyContext";

export default function ListingCard({ listing }: ListingCardProps) {
    const { formatPrice } = useCurrency();

    return (
        <Link href={`/listings/${listing.id}`} className="group block h-full">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={listing.images[0] || "/placeholder-room.jpg"}
                        alt={listing.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1">
                        <BadgeCheck className="w-3 h-3 text-green-500" /> Verified
                    </div>
                    <button className="absolute top-3 right-3 p-2 bg-white/50 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-3 left-3">
                        <span className="bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
                            {formatPrice(listing.price)}/mo
                        </span>
                    </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-heading font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-purple-600 transition-colors">
                            {listing.title}
                        </h3>
                    </div>

                    <div className="flex items-center text-gray-500 text-sm mb-4">
                        <MapPin className="w-4 h-4 mr-1 text-purple-400" />
                        <span className="truncate">{listing.location}</span>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden ring-2 ring-white shadow-sm">
                                <img
                                    src={listing.user?.image?.[0] || `https://ui-avatars.com/api/?name=${listing.user?.name || 'User'}&background=random`}
                                    alt={listing.user?.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-sm font-medium text-gray-600 truncate max-w-[100px]">
                                {listing.user?.name || "Anonymous"}
                            </span>
                        </div>
                        <span className="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-md">
                            Room
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
