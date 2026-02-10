
"use client";
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function ReportIssuePage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, send to API
        toast.success("Report submitted successfully. We will investigate shortly.");
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1 max-w-2xl mx-auto px-4 py-12 w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                        Report an Issue
                    </h1>
                    <p className="text-slate-600 text-lg">
                        Found a bug or suspicious activity? Let us know.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100">
                    {submitted ? (
                        <div className="text-center py-12">
                            <div className="size-16 get-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 bg-green-100">
                                <span className="text-4xl">✅</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You</h3>
                            <p className="text-slate-600">Your report has been received.</p>
                            <Button
                                className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                                onClick={() => setSubmitted(false)}
                            >
                                Submit Another
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <select
                                    id="category"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="bug">Bug / Technical Issue</option>
                                    <option value="user">Report User</option>
                                    <option value="content">Inappropriate Content</option>
                                    <option value="scam">Scam Attempt</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Your Email</Label>
                                <Input type="email" id="email" placeholder="you@example.com" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Please provide as much detail as possible..."
                                    className="min-h-[150px]"
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold h-12 text-lg hover:opacity-90 transition-opacity">
                                Submit Report
                            </Button>
                        </form>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
