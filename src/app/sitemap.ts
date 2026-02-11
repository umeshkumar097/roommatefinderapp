import { MetadataRoute } from 'next';
import { db } from '@/db';
import { listings } from '@/db/schema';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const allListings = await db.select().from(listings);

    const listingUrls = allListings.map((listing) => ({
        url: `https://roommatec.com/listings/${listing.id}`,
        lastModified: listing.updatedAt || new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }));

    // Extract unique locations from listings
    const uniqueLocations = Array.from(new Set(allListings.map(l => l.location).filter(Boolean)));

    const locationUrls = uniqueLocations.map((location) => ({
        url: `https://roommatec.com/locations/${encodeURIComponent(location)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [
        {
            url: 'https://roommatec.com',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://roommatec.com/rooms',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: 'https://roommatec.com/discover',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: 'https://roommatec.com/contact',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://roommatec.com/login',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://roommatec.com/register',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        ...locationUrls,
        ...listingUrls,
    ];
}
