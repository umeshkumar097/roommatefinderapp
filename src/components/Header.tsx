"use client";

import { Sparkles, MessageCircle, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export function Header() {
    const { user } = useAuth();

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl">
                            <Sparkles className="size-6 text-white" />
                        </div>
                        <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold text-xl">
                            RoomMateC
                        </h1>
                    </Link>

                    <nav className="flex items-center gap-4">
                        <Button variant="ghost" className="gap-2 hidden md:flex" onClick={() => window.location.href = '/chats'}>
                            <MessageCircle className="size-4" />
                            Chats
                        </Button>

                        <Button variant="ghost" className="gap-2 hidden md:flex">
                            <Bell className="size-4" />
                            Alerts
                        </Button>

                        {user ? (
                            <div className="relative group">
                                <Button variant="outline" className="border-purple-200 gap-2">
                                    <User className="size-4" />
                                    <span>Profile</span>
                                </Button>
                                {/* Dropdown Menu */}
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-purple-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                                    <div className="py-1">
                                        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition-colors">
                                            My Profile
                                        </Link>
                                        <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition-colors">
                                            Settings
                                        </Link>
                                        <div className="border-t border-gray-100 my-1"></div>
                                        <button
                                            // onClick={logout} // Assuming logout exists in useAuth
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            onClick={() => {
                                                // Implement logout call if available, or just redirect for now
                                                window.location.href = '/login';
                                            }}
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link href="/login">
                                    <Button variant="ghost" className="hidden sm:flex">
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md shadow-purple-200">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        )}
                        {user && (
                            <Link href="/listings/create">
                                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md shadow-purple-200">
                                    Post Ad
                                </Button>
                            </Link>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
