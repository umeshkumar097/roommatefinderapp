"use client";

import { useState } from "react";
import axios from "axios";

interface ImageUploadProps {
    onUpload: (url: string) => void;
}

export default function ImageUpload({ onUpload }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            onUpload(response.data.secure_url);
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed. Please check console.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                {uploading ? "Uploading..." : "Upload Photo"}
                <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                />
            </label>
        </div>
    );
}
