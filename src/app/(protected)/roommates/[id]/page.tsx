"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import {
    MapPin,
    Briefcase,
    MessageCircle,
    CheckCircle,
    Sparkles,
    Coffee,
    Moon,
    Sun,
    Music,
    Ghost,
    User,
    Calendar,
    BadgeCheck,
    Wind,
    Utensils
} from "lucide-react";

import { useCurrency } from "@/context/CurrencyContext";

export default function RoommateProfilePage() {
    const params = useParams();
    const id = params?.id;
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { formatPrice } = useCurrency();

    useEffect(() => {
        if (!id) return;

        const fetchProfile = async () => {
            try {
                const { data } = await axios.get(`/api/users/${id}`);
                setProfile(data.user);
            } catch (error) {
                console.error("Failed to fetch profile", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF5F7]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
    );

    if (!profile) return <div className="p-10 text-center">User not found</div>;

    const age = profile.dob ? new Date().getFullYear() - new Date(profile.dob).getFullYear() : "N/A";
    const lifestyleTags = profile.lifestyle && profile.lifestyle.length > 0 ? profile.lifestyle : ["Non-smoker", "Early bird", "Clean"];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">

                {/* Cover / Header */}
                <div className="h-48 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] relative">
                    {/* Edit Profile Button if owner? Not needed here as this is public view */}
                </div>

                <div className="px-8 pb-8">
                    <div className="relative -top-16 mb-[-3rem] flex items-end justify-between">
                        <div className="flex items-end gap-6">
                            <div className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-gray-100 overflow-hidden">
                                <img
                                    src={profile.images?.[0] || `https://ui-avatars.com/api/?name=${profile.name}&background=random`}
                                    alt={profile.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="mb-4">
                                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                                    {profile.name}, {age}
                                    {profile.isVerified && <BadgeCheck className="w-6 h-6 text-blue-500" fill="currentColor" color="white" />}
                                </h1>
                                <p className="text-gray-500 flex items-center gap-2">
                                    <Briefcase className="w-4 h-4" /> {profile.profession || "Professional"}
                                </p>
                            </div>
                        </div>
                        <div className="mb-4 hidden sm:block">
                            <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 transition shadow-lg shadow-purple-200 flex items-center gap-2">
                                <MessageCircle className="w-5 h-5" /> Send Message
                            </button>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">

                        {/* Left Column: Stats & Tags */}
                        <div className="md:col-span-1 space-y-6">
                            {/* Budget & Location */}
                            <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Monthly Budget</p>
                                    <p className="text-xl font-bold text-gray-900">
                                        {profile.budgetMin && profile.budgetMax
                                            ? `${formatPrice(profile.budgetMin)} - ${formatPrice(profile.budgetMax)}`
                                            : "Budget Negotiable"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Move-in Date</p>
                                    <p className="text-gray-900 font-medium flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-purple-500" />
                                        {profile.moveInDate ? new Date(profile.moveInDate).toLocaleDateString() : "Flexible"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Looking In</p>
                                    <p className="text-gray-900 font-medium flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-purple-500" />
                                        {profile.preferredLocation || "Anywhere"}
                                    </p>
                                </div>
                            </div>

                            {/* Languages */}
                            <div>
                                <h3 className="font-bold text-gray-900 mb-3">Languages</h3>
                                <div className="flex flex-wrap gap-2">
                                    {profile.languages?.map((lang: string, idx: number) => (
                                        <span key={idx} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                                            {lang}
                                        </span>
                                    )) || <span className="text-gray-400 text-sm">English</span>}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Bio & Lifestyle */}
                        <div className="md:col-span-2 space-y-8">

                            {/* About Me */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                    {profile.bio || "No bio yet. Ask me anything!"}
                                </p>
                            </div>

                            {/* Vibes & Lifestyle */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-purple-500" /> Vibes & Lifestyle
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {lifestyleTags.map((tag: string, idx: number) => (
                                        <span key={idx} className="px-4 py-2 bg-purple-50 text-purple-700 border border-purple-100 rounded-xl text-sm font-medium flex items-center gap-2">
                                            {getTagIcon(tag)} {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Action Button */}
                            <div className="block sm:hidden mt-8">
                                <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 transition shadow-lg shadow-purple-200 flex items-center justify-center gap-2">
                                    <MessageCircle className="w-5 h-5" /> Send Message
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getTagIcon(tag: string) {
    const t = tag.toLowerCase();
    if (t.includes("smoker")) return <Wind className="w-4 h-4" />;
    if (t.includes("pet")) return <Ghost className="w-4 h-4" />; // Paw icon fallback or Ghost
    if (t.includes("foodie")) return <Utensils className="w-4 h-4" />;
    if (t.includes("night")) return <Moon className="w-4 h-4" />;
    if (t.includes("early")) return <Sun className="w-4 h-4" />;
    if (t.includes("music")) return <Music className="w-4 h-4" />;
    return <Coffee className="w-4 h-4" />;
}
