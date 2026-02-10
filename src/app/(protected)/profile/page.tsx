"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import ImageUpload from "@/components/profile/ImageUpload";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Settings, Grid, Bookmark, User as UserIcon, MapPin, Briefcase, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
    const { user, isLoading: authLoading } = useAuth();
    const [activeTab, setActiveTab] = useState("posts");
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        bio: "",
        gender: "",
        dob: "",
        location: "", // Added location
        profession: "", // Added profession
    });
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                bio: user.bio || "",
                gender: user.gender || "",
                dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : "",
                location: user.location || "",
                profession: user.profession || "",
            });
            setImages(user.images || []);
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (url: string) => {
        setImages([...images, url]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put("/api/profile", {
                ...formData,
                images,
            });
            alert("Profile updated!");
            setIsEditOpen(false);
            router.refresh();
        } catch (error) {
            console.error("Update failed", error);
            alert("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!user) {
        router.push("/login"); // Should typically be handled by protected route wrapper
        return null;
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header />
            <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-12 items-center md:items-start">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        <div className="w-24 h-24 md:w-40 md:h-40 rounded-full border-2 border-purple-100 p-1">
                            <img
                                src={images[0] || `https://ui-avatars.com/api/?name=${user.name}&background=random`}
                                alt={user.name}
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 w-full">
                        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                            <h2 className="text-2xl font-light text-gray-800">{user.name}</h2>
                            <div className="flex gap-2">
                                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 h-8 text-sm">
                                            Edit Profile
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[500px]">
                                        <DialogHeader>
                                            <DialogTitle>Edit Profile</DialogTitle>
                                        </DialogHeader>
                                        <form onSubmit={handleSubmit} className="space-y-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <label className="text-right text-sm font-medium">Name</label>
                                                <Input name="name" value={formData.name} onChange={handleChange} className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <label className="text-right text-sm font-medium">Bio</label>
                                                <Textarea name="bio" value={formData.bio} onChange={handleChange} className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <label className="text-right text-sm font-medium">Photos</label>
                                                <div className="col-span-3">
                                                    <ImageUpload onUpload={handleImageUpload} />
                                                    <div className="flex gap-2 mt-2 overflow-x-auto">
                                                        {images.map((img, i) => (
                                                            <img key={i} src={img} className="size-10 rounded-md object-cover" />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <Button type="submit" disabled={loading} className="w-full bg-black text-white hover:bg-gray-800">
                                                {loading ? "Saving..." : "Done"}
                                            </Button>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                                <Button variant="ghost" size="icon">
                                    <Settings className="size-6 text-gray-600" />
                                </Button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex justify-between md:justify-start md:gap-10 mb-6 border-y md:border-none py-4 md:py-0">
                            <div className="text-center md:text-left">
                                <span className="font-bold block md:inline text-gray-900">{images.length}</span> posts
                            </div>
                            <div className="text-center md:text-left">
                                <span className="font-bold block md:inline text-gray-900">128</span> followers
                            </div>
                            <div className="text-center md:text-left">
                                <span className="font-bold block md:inline text-gray-900">142</span> following
                            </div>
                        </div>

                        {/* Bio / Details */}
                        <div className="space-y-1">
                            <div className="font-semibold text-gray-900">{formData.profession || "RoomieVibes User"}</div>
                            <div className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">
                                {user.gender === 'male' ? 'Him/He' : user.gender === 'female' ? 'She/Her' : 'They/Them'}
                            </div>
                            <p className="text-gray-700 whitespace-pre-wrap">{formData.bio}</p>
                            {formData.location && (
                                <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                                    <MapPin className="size-3" />
                                    {formData.location}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Highlights (Optional - using tags for now) */}
                <div className="flex gap-4 md:gap-8 overflow-x-auto pb-4 mb-8 no-scrollbar">
                    {['Lifestyle', 'Music', 'Travel', 'Food', 'Art'].map((item) => (
                        <div key={item} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
                            <div className="w-16 h-16 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center group-hover:border-purple-300 transition-colors">
                                <span className="text-xs text-gray-500">{item[0]}</span>
                            </div>
                            <span className="text-xs text-gray-700">{item}</span>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="border-t border-gray-200">
                    <div className="flex justify-center gap-12">
                        <button
                            onClick={() => setActiveTab('posts')}
                            className={`flex items-center gap-2 h-[52px] border-t border-black -mt-px text-xs font-semibold tracking-widest uppercase ${activeTab === 'posts' ? 'text-black border-black' : 'text-gray-400 border-transparent'}`}
                        >
                            <Grid className="size-3" />
                            Posts
                        </button>
                        <button
                            onClick={() => setActiveTab('saved')}
                            className={`flex items-center gap-2 h-[52px] border-t -mt-px text-xs font-semibold tracking-widest uppercase ${activeTab === 'saved' ? 'text-black border-black' : 'text-gray-400 border-transparent border-t-0'}`}
                        >
                            <Bookmark className="size-3" />
                            Saved
                        </button>
                        <button
                            onClick={() => setActiveTab('tagged')}
                            className={`flex items-center gap-2 h-[52px] border-t -mt-px text-xs font-semibold tracking-widest uppercase ${activeTab === 'tagged' ? 'text-black border-black' : 'text-gray-400 border-transparent border-t-0'}`}
                        >
                            <UserIcon className="size-3" />
                            Tagged
                        </button>
                    </div>

                    {/* Grid Content */}
                    <div className="grid grid-cols-3 gap-1 md:gap-8 mt-4">
                        {images.length > 0 ? images.map((img, i) => (
                            <div key={i} className="aspect-square relative group cursor-pointer bg-gray-100">
                                <img src={img} alt="Post" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold">
                                    <div className="flex gap-4">
                                        <span>❤️ 42</span>
                                        <span>💬 4</span>
                                    </div>
                                </div>
                            </div>
                        )) : activeTab === 'posts' && (
                            <div className="col-span-3 py-20 text-center">
                                <div className="w-16 h-16 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Grid className="size-8 text-black" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Share Photos</h3>
                                <p className="text-gray-500 mb-4">When you share photos, they will appear on your profile.</p>
                                <Button className="text-blue-500 font-semibold" variant="link">Share your first photo</Button>
                            </div>
                        )}
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
