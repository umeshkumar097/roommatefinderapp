"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { X, Heart, MapPin } from "lucide-react";

interface SwipeCardProps {
    listing: any;
    onSwipe: (direction: "left" | "right") => void;
    isFront: boolean;
}

import { useCurrency } from "@/context/CurrencyContext";

const SwipeCard: React.FC<SwipeCardProps> = ({ listing, onSwipe, isFront }) => {
    const { formatPrice } = useCurrency();
    const [exitX, setExitX] = useState<number | null>(null);
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

    // Stamp opacity logic
    const likeOpacity = useTransform(x, [10, 100], [0, 1]);
    const nopeOpacity = useTransform(x, [-100, -10], [1, 0]);

    const handleDragEnd = (e: any, info: PanInfo) => {
        if (info.offset.x > 100) {
            setExitX(200);
            onSwipe("right");
        } else if (info.offset.x < -100) {
            setExitX(-200);
            onSwipe("left");
        }
    };

    return (
        <motion.div
            style={{
                gridRow: 1,
                gridColumn: 1,
                x,
                rotate,
                opacity,
                zIndex: isFront ? 1 : 0,
                boxShadow: isFront ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" : "none",
            }}
            drag={isFront ? "x" : false}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
            animate={exitX ? { x: exitX, opacity: 0 } : { x: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative w-full max-w-sm h-[600px] bg-white dark:bg-gray-800 rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
        >
            {/* Image */}
            <div className="relative h-3/4 w-full bg-gray-200">
                {listing.images && listing.images.length > 0 ? (
                    <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover pointer-events-none" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black/80 to-transparent" />

                {/* Swiping Stamps */}
                <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-8 border-4 border-green-500 rounded-lg p-2 transform -rotate-12">
                    <span className="text-green-500 font-bold text-4xl uppercase tracking-widest">Like</span>
                </motion.div>
                <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 right-8 border-4 border-red-500 rounded-lg p-2 transform rotate-12">
                    <span className="text-red-500 font-bold text-4xl uppercase tracking-widest">Nope</span>
                </motion.div>
            </div>

            {/* Content */}
            <div className="p-6 h-1/4 flex flex-col justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white truncate">{listing.title}</h3>
                    <div className="flex items-center text-gray-500 dark:text-gray-300 mt-1">
                        <MapPin size={16} className="mr-1" />
                        <span className="text-sm">{listing.location}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{formatPrice(listing.price)}<span className="text-sm font-normal text-gray-500">/mo</span></span>
                    {/* Icons or minor details */}
                </div>
            </div>

        </motion.div>
    );
};

export default SwipeCard;
