"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    MapPin,
    Heart,
    Share2,
    Flag,
    CheckCircle,
    Wifi,
    Wind,
    Car,
    Dumbbell,
    Droplets,
    Waves,
    Utensils,
    Tv,
    ShieldCheck,
    Calendar,
    Home,
    DollarSign,
    User,
    Phone,
    MessageCircle,
    BadgeCheck
} from "lucide-react";
import Link from "next/link";

export default function ListingDetailPage() {
    const params = useParams();
    const id = params?.id;
    const [listing, setListing] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        if (!id) return;

        const fetchListing = async () => {
            try {
                const { data } = await axios.get(`/api/listings/${id}`);
                setListing(data.listing);
            } catch (error) {
                console.error("Failed to fetch listing", error);
            } finally {
                setLoading(false);
            }
        };
        fetchListing();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF5F7]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
    );

    if (!listing) return <div className="p-10 text-center">Listing not found</div>;

    const isOwner = user && user.id === listing.userId;
    const amenitiesList = listing.amenities && listing.amenities.length > 0 ? listing.amenities : ["WiFi", "AC", "Parking", "Gym"]; // Fallback for verified UI feel
    const houseRules = listing.houseRules && listing.houseRules.length > 0 ? listing.houseRules : ["Maintain cleanliness", "Respect quiet hours", "No illegal activities"];

    const formatDate = (dateString: string) => {
        if (!dateString) return "Immediate";
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
            {/* Breadcrumb / Back Navigation could go here */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Images & Details */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Image Carousel / Hero */}
                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 relative group">
                        <div className="aspect-video relative bg-gray-200">
                            <img
                                src={listing.images?.[activeImageIndex] || "/placeholder-room.jpg"}
                                alt={listing.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                                <BadgeCheck className="w-3 h-3" /> Verified Property
                            </div>
                            <button className="absolute top-4 right-4 p-2 bg-white/40 backdrop-blur-md rounded-full hover:bg-white text-white hover:text-red-500 transition-all">
                                <Heart className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Thumbnails if multiple images (Vertical scrolling or small grid) */}
                        {listing.images && listing.images.length > 1 && (
                            <div className="flex gap-2 p-4 overflow-x-auto">
                                {listing.images.map((img: string, idx: number) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImageIndex(idx)}
                                        className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-purple-600' : 'border-transparent'}`}
                                    >
                                        <img src={img} className="w-full h-full object-cover" alt="" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Title & Price Header */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-heading mb-2">{listing.title}</h1>
                                <div className="flex items-center text-gray-500 text-sm">
                                    <MapPin className="w-4 h-4 mr-1 text-purple-500" />
                                    {listing.location}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-2xl font-bold text-purple-600">${listing.price}</span>
                                    <span className="text-gray-400 text-sm">/month</span>
                                </div>
                                <div className="flex gap-2 justify-end">
                                    {listing.roomType && (
                                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">
                                            {listing.roomType}
                                        </span>
                                    )}
                                    {listing.furnishingStatus && (
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
                                            {listing.furnishingStatus}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 my-6"></div>

                        {/* About This Place */}
                        <div>
                            <h3 className="text-lg font-bold text-purple-900 mb-3">About this place</h3>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                {listing.description}
                            </p>
                        </div>
                    </div>

                    {/* Key Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoCard icon={<MapPin className="w-5 h-5 text-purple-500" />} label="Location" value={listing.location.split(',')[0]} />
                        <InfoCard icon={<DollarSign className="w-5 h-5 text-green-500" />} label="Security Deposit" value={`$${listing.deposit || listing.price * 2}`} />
                        <InfoCard icon={<Calendar className="w-5 h-5 text-orange-500" />} label="Available From" value={formatDate(listing.availableDate)} />
                        <InfoCard icon={<Home className="w-5 h-5 text-blue-500" />} label="Room Type" value={listing.roomType || "Private Room"} />
                    </div>

                    {/* Amenities */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-purple-900 mb-6 flex items-center gap-2">
                            <Wifi className="w-5 h-5" /> Amenities & Facilities
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {amenitiesList.map((item: string, idx: number) => (
                                <div key={idx} className="flex items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-colors">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span className="text-gray-700 text-sm font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* House Rules */}
                    <div className="bg-purple-50 rounded-3xl p-6 border border-purple-100">
                        <h3 className="text-lg font-bold text-purple-900 mb-4">House Rules & Guidelines</h3>
                        <ul className="space-y-3">
                            {houseRules.map((rule: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="mt-1 min-w-[20px]">
                                        <ShieldCheck className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <span className="text-gray-700 text-sm">{rule}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Right Column: Host & Actions */}
                <div className="lg:col-span-1 space-y-6">

                    {/* Host Card */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden ring-4 ring-purple-50">
                                <img
                                    src={listing.user?.images?.[0] || `https://ui-avatars.com/api/?name=${listing.user?.name}&background=random`}
                                    alt={listing.user?.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{listing.user?.name}</h3>
                                <p className="text-sm text-gray-500">Property Owner</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white py-3 rounded-xl font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-transform active:scale-95 flex items-center justify-center gap-2">
                                <MessageCircle className="w-5 h-5" /> Contact Owner
                            </button>

                            <div className="grid grid-cols-2 gap-3">
                                <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium text-gray-700 transition">
                                    <Phone className="w-4 h-4" /> Call
                                </button>
                                <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium text-gray-700 transition">
                                    <Calendar className="w-4 h-4" /> Visit
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-4">
                                <button className="flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-purple-600 transition">
                                    <Share2 className="w-4 h-4" /> Share
                                </button>
                                <button className="flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-red-600 transition">
                                    <Flag className="w-4 h-4" /> Report
                                </button>
                            </div>
                        </div>

                        {/* Safety Tips */}
                        <div className="mt-8 bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <h4 className="text-blue-800 font-bold text-sm mb-2 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4" /> Safety Tips
                            </h4>
                            <p className="text-blue-600 text-xs leading-relaxed">
                                Never transfer money before visiting. Verify the property owner's identity.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                {icon}
            </div>
            <div>
                <p className="text-xs text-gray-400 font-medium uppercase">{label}</p>
                <p className="text-gray-900 font-bold text-sm">{value}</p>
            </div>
        </div>
    );
}
