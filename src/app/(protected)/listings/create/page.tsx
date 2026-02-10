"use client";

import { useAuth } from "@/context/AuthContext";
import LoadingScreen from "@/components/ui/LoadingScreen";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageUpload from "@/components/profile/ImageUpload";
import LocationSearch from "@/components/map/LocationSearch";
import { useLoadScript } from "@react-google-maps/api";

export default function CreateListingPage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        latitude: null as number | null,
        longitude: null as number | null,
        leaseDuration: "",
        availableDate: "",
        images: [] as string[],
        amenities: [] as string[], // We'll handle this as simple array or string input converted
        amenitiesInput: "" // Helper for input field
    });

    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: ["places"],
    });

    if (isLoading) return <LoadingScreen />;
    if (!user) return <div>Please login</div>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLocationSelect = (address: string, lat: number, lng: number) => {
        setFormData({ ...formData, location: address, latitude: lat, longitude: lng });
    };

    const handleImageUploaded = (url: string) => {
        setFormData(prev => ({ ...prev, images: [...prev.images, url] }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            const amenities = formData.amenitiesInput.split(',').map(s => s.trim()).filter(Boolean);

            await axios.post("/api/listings", {
                userId: user.id,
                title: formData.title,
                description: formData.description,
                price: parseInt(formData.price),
                location: formData.location,
                latitude: formData.latitude,
                longitude: formData.longitude,
                leaseDuration: formData.leaseDuration,
                availableDate: formData.availableDate,
                images: formData.images,
                amenities: amenities
            });
            router.push("/");
        } catch (err: any) {
            console.error("Create listing error:", err);
            setError(err.response?.data?.error || "Failed to create listing");
            setSubmitting(false);
        }
    };

    if (!isLoaded) return <div>Loading Maps...</div>;

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Post a New Room</h1>
            {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <LocationSearch onSelect={handleLocationSelect} defaultValue={formData.location} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price ($/month)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Lease Duration</label>
                        <select
                            name="leaseDuration"
                            value={formData.leaseDuration}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        >
                            <option value="">Select duration</option>
                            <option value="Month-to-Month">Month-to-Month</option>
                            <option value="6 Months">6 Months</option>
                            <option value="1 Year">1 Year</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Available Date</label>
                    <input
                        type="date"
                        name="availableDate"
                        value={formData.availableDate}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Amenities (comma separated)</label>
                    <input
                        type="text"
                        name="amenitiesInput"
                        value={formData.amenitiesInput}
                        onChange={handleChange}
                        placeholder="Wifi, Gym, Parking"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Photos</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {formData.images.map((img, idx) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img key={idx} src={img} alt="preview" className="w-20 h-20 object-cover rounded" />
                        ))}
                    </div>

                    {/* Corrected prop name: onUpload */}
                    <ImageUpload onUpload={handleImageUploaded} />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {submitting ? "Creating..." : "Create Listing"}
                </button>
            </form>
        </div>
    );
}
