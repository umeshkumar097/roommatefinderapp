
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Shield, AlertTriangle, Eye, Lock } from 'lucide-react';

export default function SafetyTipsPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1 max-w-5xl mx-auto px-4 py-12 w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                        Safety Tips
                    </h1>
                    <p className="text-slate-600 text-lg">
                        Your safety is our top priority. Read these tips to stay safe.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100 flex gap-4">
                        <div className="bg-purple-100 p-3 rounded-xl h-fit">
                            <Shield className="size-6 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Verify Profiles</h3>
                            <p className="text-slate-600">
                                Always look for the <span className="text-green-600 font-medium">Verified</span> badge. This means we have checked their government ID.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100 flex gap-4">
                        <div className="bg-orange-100 p-3 rounded-xl h-fit">
                            <AlertTriangle className="size-6 text-orange-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Meet in Public</h3>
                            <p className="text-slate-600">
                                For the first meeting, always choose a public place like a cafe or mall. Do not go to private residences alone initially.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100 flex gap-4">
                        <div className="bg-blue-100 p-3 rounded-xl h-fit">
                            <Eye className="size-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Protect Personal Info</h3>
                            <p className="text-slate-600">
                                Keep your phone number and exact address private until you trust the person. Use our in-app chat for initial communication.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100 flex gap-4">
                        <div className="bg-red-100 p-3 rounded-xl h-fit">
                            <Lock className="size-6 text-red-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Avoid Scams</h3>
                            <p className="text-slate-600">
                                Never transfer money without seeing the room or signing an agreement. Be wary of requests for "reservation fees" via UPI.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
