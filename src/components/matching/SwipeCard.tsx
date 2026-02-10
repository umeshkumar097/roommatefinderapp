"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import axios from "axios";

interface Listing {
    id: number;
    title: string;
    price: number;
    location: string;
    images: string[];
    description: string;
}

interface SwipeCardProps {
    listing: Listing;
    onSwipe: (direction: "left" | "right") => void;
}

export default function SwipeCard({ listing, onSwipe }: SwipeCardProps) {
    const x = useMotionValue(0);
    const controls = useAnimation();
    const rotate = useTransform(x, [-200, 200], [-30, 30]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
    const background = useTransform(
        x,
        [-200, 0, 200],
        ["rgb(255, 0, 0)", "rgb(255, 255, 255)", "rgb(0, 255, 0)"]
    );

    const handleDragEnd = async (event: any, info: any) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        if (offset > 100 || velocity > 500) {
            await controls.start({ x: 500, opacity: 0 });
            onSwipe("right");
        } else if (offset < -100 || velocity < -500) {
            await controls.start({ x: -500, opacity: 0 });
            onSwipe("left");
        } else {
            controls.start({ x: 0 });
        }
    };

    const imageUrl = listing.images && listing.images.length > 0
        ? listing.images[0]
        : "https://placehold.co/600x800";

    return (
        <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={controls}
            style={{ x, rotate, opacity }}
            className="absolute top-0 left-0 w-full h-full max-w-sm bg-white dark:bg-zinc-800 rounded-2xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing"
        >
            <div className="relative h-3/4 w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt={listing.title} className="w-full h-full object-cover pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 text-white pointer-events-none">
                    <h2 className="text-2xl font-bold drop-shadow-md">{listing.title}</h2>
                    <p className="text-lg font-medium drop-shadow-md">${listing.price}/mo</p>
                </div>
            </div>
            <div className="h-1/4 p-4 flex flex-col justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{listing.description}</p>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-400">📍 {listing.location}</p>
                    <button className="text-blue-500 text-sm font-semibold">View Details</button>
                </div>
            </div>

            {/* Overlay indicators */}
            <motion.div
                style={{ opacity: useTransform(x, [20, 100], [0, 1]) }}
                className="absolute top-8 left-8 border-4 border-green-500 text-green-500 px-4 py-2 rounded-lg font-bold text-2xl -rotate-12 pointer-events-none"
            >
                LIKE
            </motion.div>
            <motion.div
                style={{ opacity: useTransform(x, [-20, -100], [0, 1]) }}
                className="absolute top-8 right-8 border-4 border-red-500 text-red-500 px-4 py-2 rounded-lg font-bold text-2xl rotate-12 pointer-events-none"
            >
                NOPE
            </motion.div>
        </motion.div>
    );
}
