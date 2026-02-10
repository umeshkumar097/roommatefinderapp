"use client";

import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import { Check, Star, Shield, Zap, MessageCircle } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function UpgradePage() {
    const { user } = useAuth();
    const { currency, symbol, formatPrice } = useCurrency();
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async (plan: 'premium' | 'vip') => {
        setLoading(true);
        try {
            const { data } = await axios.post("/api/checkout", {
                plan,
                currency
            });
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error("Checkout failed", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const getPrice = (plan: 'premium' | 'vip') => {
        if (currency === 'INR') {
            return plan === 'premium' ? 99 : 599;
        }
        return plan === 'premium' ? 1.99 : 9.99;
    };

    return (
        <div className="min-h-screen bg-[#FFF5F7] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl font-heading bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    Upgrade to Premium ✨
                </h2>
                <p className="mt-4 text-xl text-gray-500">
                    Unlock exclusive features and find your perfect roommate faster!
                </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-8">

                {/* Free Plan */}
                <div className="relative p-6 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Free</h3>
                        <p className="mt-2 text-sm text-gray-500">Basic access.</p>
                    </div>
                    <div className="mb-6">
                        <span className="text-3xl font-extrabold text-gray-900">{symbol}0</span>
                        <span className="text-sm font-medium text-gray-500">/mo</span>
                    </div>
                    <ul className="space-y-3 mb-6 flex-1 text-sm">
                        <li className="flex items-center text-gray-600">
                            <Check className="w-4 h-4 text-green-500 mr-2" /> 1 Post / Month
                        </li>
                        <li className="flex items-center text-gray-600">
                            <Check className="w-4 h-4 text-green-500 mr-2" /> View Listings
                        </li>
                    </ul>
                    <button className="w-full py-2 px-4 bg-gray-100 text-gray-800 font-bold rounded-xl hover:bg-gray-200 transition text-sm" disabled>
                        Current Plan
                    </button>
                </div>

                {/* Premium Plan - 99 */}
                <div className="relative p-6 bg-white border-2 border-purple-500 rounded-2xl shadow-xl flex flex-col transform md:-translate-y-4">
                    <div className="absolute top-0 right-0 -mt-3 mr-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                        VALUE
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-900">Premium</h3>
                        <p className="mt-2 text-sm text-gray-500">More visibility.</p>
                    </div>
                    <div className="mb-6">
                        <span className="text-4xl font-extrabold text-gray-900">{symbol}{getPrice('premium')}</span>
                        <span className="text-sm font-medium text-gray-500">/mo</span>
                    </div>
                    <ul className="space-y-3 mb-6 flex-1 text-sm">
                        <li className="flex items-center text-gray-900 font-medium">
                            <Zap className="w-4 h-4 text-purple-600 mr-2" /> 3 Posts / Month
                        </li>
                        <li className="flex items-center text-gray-900 font-medium">
                            <Star className="w-4 h-4 text-purple-600 mr-2" /> 1 Featured Listing
                        </li>
                        <li className="flex items-center text-gray-900 font-medium">
                            <Check className="w-4 h-4 text-purple-600 mr-2" /> Unlocked Chat
                        </li>
                    </ul>
                    <button
                        onClick={() => handleUpgrade('premium')}
                        disabled={loading}
                        className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:opacity-90 transition shadow-lg shadow-purple-500/30 active:scale-95 text-sm"
                    >
                        {loading ? "Processing..." : "Get Premium"}
                    </button>
                </div>

                {/* VIP Plan - 599 */}
                <div className="relative p-6 bg-gradient-to-b from-gray-900 to-gray-800 text-white border border-gray-700 rounded-2xl shadow-2xl flex flex-col">
                    <div className="absolute top-0 right-0 -mt-3 mr-3 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold shadow-md">
                        VIP
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-white">VIP Access</h3>
                        <p className="mt-2 text-sm text-gray-400">Direct connections.</p>
                    </div>
                    <div className="mb-6">
                        <span className="text-4xl font-extrabold text-white">{symbol}{getPrice('vip')}</span>
                        <span className="text-sm font-medium text-gray-400">/mo</span>
                    </div>
                    <ul className="space-y-3 mb-6 flex-1 text-sm">
                        <li className="flex items-center text-white font-medium">
                            <MessageCircle className="w-4 h-4 text-yellow-400 mr-2" /> Direct Contact Info
                        </li>
                        <li className="flex items-center text-white font-medium">
                            <Zap className="w-4 h-4 text-yellow-400 mr-2" /> Unlimited Posts
                        </li>
                        <li className="flex items-center text-white font-medium">
                            <Star className="w-4 h-4 text-yellow-400 mr-2" /> Verified Badge
                        </li>
                        <li className="flex items-center text-white font-medium">
                            <Shield className="w-4 h-4 text-yellow-400 mr-2" /> Priority Visibility
                        </li>
                    </ul>
                    <button
                        onClick={() => handleUpgrade('vip')}
                        disabled={loading}
                        className="w-full py-3 px-4 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition shadow-lg active:scale-95 text-sm"
                    >
                        {loading ? "Processing..." : "Go VIP"}
                    </button>
                </div>

            </div>
        </div>
    );
}
