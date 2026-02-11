"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import FirebaseAuth from "@/components/auth/FirebaseAuth";

export default function RegisterPage() {
    const { register } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await register({ name, email, password });
        } catch (err: any) {
            setError(err.response?.data?.error || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-gray-800">New here?</h2>
                <p className="text-gray-500 text-sm">Join the vibe tribe! ✨</p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl mb-4 text-center border border-red-100">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-field pl-12"
                        required
                    />
                </div>

                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field pl-12"
                        required
                    />
                </div>

                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field pl-12 pr-12"
                        required
                        minLength={6}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-3 rounded-xl font-bold text-lg shadow-purple-500/40 hover:shadow-purple-500/60 transition-all flex items-center justify-center gap-2 mt-4"
                >
                    {loading ? "Creating Account..." : "Sign Up & Vibe! 🎉"}
                </button>
            </form>

            <div className="mt-6">
                <FirebaseAuth />
            </div>

            <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-purple-600 font-bold hover:underline">
                        Login here! 🚀
                    </Link>
                </p>
            </div>
        </motion.div>
    );
}
