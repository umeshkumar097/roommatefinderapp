"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import ImageUpload from "@/components/profile/ImageUpload";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const { user, isLoading: authLoading } = useAuth(); // Need to update useAuth to potentially refresh user
    const [formData, setFormData] = useState({
        name: "",
        bio: "",
        gender: "",
        dob: "",
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
            router.refresh(); // Refresh to update server components or re-fetch
        } catch (error) {
            console.error("Update failed", error);
            alert("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) return <div>Loading...</div>;
    if (!user) {
        router.push("/login");
        return null;
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-md mt-10">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Edit Profile</h1>

            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Photos</h2>
                <div className="flex gap-4 flex-wrap mb-4">
                    {images.map((img, idx) => (
                        <img key={idx} src={img} alt="Profile" className="w-24 h-24 object-cover rounded-lg" />
                    ))}
                </div>
                <ImageUpload onUpload={handleImageUpload} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border dark:bg-zinc-800 dark:border-zinc-700"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border dark:bg-zinc-800 dark:border-zinc-700"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border dark:bg-zinc-800 dark:border-zinc-700"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border dark:bg-zinc-800 dark:border-zinc-700"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Profile"}
                </button>
            </form>
        </div>
    );
}
