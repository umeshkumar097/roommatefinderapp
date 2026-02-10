
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Quote } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

export default function SuccessStoriesPage() {
    const stories = [
        {
            name: "Riya & Anjali",
            location: "Bangalore",
            image: "https://images.unsplash.com/photo-1596245195341-b33a7f275fdb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            story: "We both moved to Bangalore for our first jobs and didn't know anyone. RoomieVibes matched us based on our love for hiking and early mornings. Best roomies ever!"
        },
        {
            name: "The Tech House",
            location: "Gurgaon",
            image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            story: "Found 2 amazing flatmates within a week. Now we code together on weekends. The verification system gave us peace of mind."
        },
        {
            name: "Siddharth",
            location: "Mumbai",
            image: "https://images.unsplash.com/photo-1542596594-649edbc13630?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            story: "I had a spare room and needed someone reliable. Found a great tenant through RoomieVibes who respects the house rules perfectly."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                        Success Stories
                    </h1>
                    <p className="text-slate-600 text-lg">
                        Real people finding their perfect living situation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.map((story, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-purple-50 hover:border-purple-200 transition-all hover:transform hover:-translate-y-1">
                            <div className="relative h-64 w-full mb-6 rounded-xl overflow-hidden">
                                <ImageWithFallback
                                    src={story.image}
                                    alt={story.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative">
                                <Quote className="absolute -top-4 -left-2 size-8 text-purple-200 fill-purple-100" />
                                <p className="text-slate-600 italic mb-4 relative z-10 pl-4">
                                    "{story.story}"
                                </p>
                                <div className="border-t pt-4">
                                    <h3 className="font-bold text-lg text-gray-900">{story.name}</h3>
                                    <p className="text-purple-600 text-sm">{story.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
