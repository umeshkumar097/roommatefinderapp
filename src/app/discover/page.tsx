"use client";

import SwipeContainer from "@/components/SwipeContainer";
import { Header } from "@/components/Header";

export default function DiscoverPage() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Find Your Match</h1>
                <SwipeContainer />
            </main>
        </div>
    );
}
