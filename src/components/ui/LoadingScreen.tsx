"use client";

import { motion } from "framer-motion";

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFF5F7]">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
            >
                <div className="w-20 h-20 bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-10 h-10 text-white"
                    >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] mb-2 font-heading">
                    RoomieVibes
                </h1>
                <p className="text-gray-500 text-sm mb-8">Getting the vibes ready... ✨</p>

                <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "linear",
                        }}
                        className="w-full h-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]"
                    />
                </div>
            </motion.div>
        </div>
    );
}
