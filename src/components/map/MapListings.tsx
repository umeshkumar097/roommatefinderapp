"use client";

import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { useState, useMemo } from "react";
import Link from "next/link";

interface MapListingsProps {
    listings: any[];
}

export default function MapListings({ listings }: MapListingsProps) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: ["places"], // Needed for shared library load if used elsewhere
    });

    const [selectedListing, setSelectedListing] = useState<any>(null);

    const center = useMemo(() => {
        if (listings.length > 0) {
            // Naive center: first listing
            // Better: Average lat/lng or bounds
            const valid = listings.find(l => l.latitude && l.longitude);
            if (valid) return { lat: valid.latitude, lng: valid.longitude };
        }
        return { lat: 40.7128, lng: -74.0060 }; // Default: New York
    }, [listings]);

    if (!isLoaded) return <div>Loading Map...</div>;

    return (
        <GoogleMap
            zoom={12}
            center={center}
            mapContainerClassName="w-full h-full rounded-lg shadow-md"
        >
            {listings.map((listing) => (
                listing.latitude && listing.longitude && (
                    <Marker
                        key={listing.id}
                        position={{ lat: listing.latitude, lng: listing.longitude }}
                        onClick={() => setSelectedListing(listing)}
                    />
                )
            ))}

            {selectedListing && (
                <InfoWindow
                    position={{ lat: selectedListing.latitude, lng: selectedListing.longitude }}
                    onCloseClick={() => setSelectedListing(null)}
                >
                    <div className="p-2 max-w-xs">
                        <h3 className="font-bold text-sm">{selectedListing.title}</h3>
                        <p className="text-green-600 font-semibold">${selectedListing.price}/mo</p>
                        <Link href={`/listings/${selectedListing.id}`} className="text-indigo-600 text-xs mt-1 block hover:underline">
                            View Details
                        </Link>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}
