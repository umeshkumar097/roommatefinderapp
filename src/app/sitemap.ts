import { MetadataRoute } from 'next';
import { db } from '@/db';
import { listings } from '@/db/schema';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const allListings = await db.select().from(listings);

    const listingUrls = allListings.map((listing) => ({
        url: `https://roomievibes.com/listings/${listing.id}`,
        lastModified: listing.updatedAt || new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }));

    return [
        {
            url: 'https://roomievibes.com',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://roomievibes.com/discover',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: 'https://roomievibes.com/map',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        ...listingUrls,
    ];
}
