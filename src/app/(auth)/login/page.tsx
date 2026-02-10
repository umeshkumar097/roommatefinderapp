"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
    const { login } = useAuth();
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
            await login({ email, password });
        } catch (err: any) {
            setError(err.response?.data?.error || "Login failed");
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
                <h2 className="text-xl font-semibold text-gray-800">Welcome back!</h2>
                <p className="text-gray-500 text-sm">Ready to vibe? ✨</p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl mb-4 text-center border border-red-100">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>

                <div className="text-right">
                    <Link href={{ pathname: "/forgot-password", query: { email } }} className="text-xs text-purple-600 hover:text-purple-700 font-medium">
                        Forgot password?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-3 rounded-xl font-bold text-lg shadow-purple-500/40 hover:shadow-purple-500/60 transition-all flex items-center justify-center gap-2"
                >
                    {loading ? "Vibing..." : "Let's Vibe! 🚀"}
                </button>
            </form>

            <div className="mt-8 text-center space-y-4">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-200"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500">or</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Google
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Facebook
                    </button>
                </div>

                <p className="text-gray-500 text-sm">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-purple-600 font-bold hover:underline">
                        Sign up here! 🦄
                    </Link>
                </p>
            </div>
        </motion.div>
    );
}
