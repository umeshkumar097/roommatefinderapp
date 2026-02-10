"use client";

import { Sparkles, MessageCircle, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export function Header() {
    const { user } = useAuth();

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl">
                            <Sparkles className="size-6 text-white" />
                        </div>
                        <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold text-xl">
                            RoomieVibes
                        </h1>
                    </Link>

                    <nav className="flex items-center gap-4">
                        {/* Common Nav Items often seen in the design */}
                        <Button variant="ghost" className="gap-2 hidden md:flex" onClick={() => window.location.href = '/chats'}>
                            <MessageCircle className="size-4" />
                            Chats
                        </Button>

                        <Button variant="ghost" className="gap-2 hidden md:flex">
                            <Bell className="size-4" />
                            Alerts
                        </Button>

                        {user ? (
                            <Button variant="outline" className="border-purple-200" onClick={() => window.location.href = '/profile'}>
                                <User className="size-4 mr-2" />
                                Profile
                            </Button>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Button variant="ghost" onClick={() => window.location.href = '/login'} className="hidden sm:flex">
                                    Sign In
                                </Button>
                                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                    Get Started
                                </Button>
                            </div>
                        )}
                        {user && (
                            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                Post Ad
                            </Button>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
