"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Save, AlertCircle } from "lucide-react";

export default function AdminSettingsPage() {
    const { user, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // System Config State
    const [paymentEnabled, setPaymentEnabled] = useState(true);
    const [stripeEnabled, setStripeEnabled] = useState(true);

    useEffect(() => {
        if (authLoading) return;
        if (!user || user.role !== 'admin') {
            router.push("/");
            return;
        }

        fetchSettings();
    }, [user, authLoading, router]);

    const fetchSettings = () => {
        axios.get("/api/admin/settings")
            .then(({ data }) => {
                const s = data.settings;
                setPaymentEnabled(s.enabled ?? true);
                setStripeEnabled(s.stripe?.enabled ?? true);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await axios.post("/api/admin/settings", {
                enabled: paymentEnabled,
                stripeEnabled: stripeEnabled
            });
            alert("Settings saved successfully!");
        } catch (error) {
            console.error("Failed to save settings", error);
            alert("Failed to save settings");
        } finally {
            setSaving(false);
        }
    };

    if (loading || authLoading) return <div className="p-10 text-center">Loading Settings...</div>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Admin Settings</h1>

            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 p-8 space-y-8">

                {/* Payment Configuration */}
                <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        Payment Configuration
                    </h2>
                    <div className="bg-purple-50 dark:bg-zinc-800/50 p-6 rounded-xl border border-purple-100 dark:border-zinc-700 space-y-6">

                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Enable Payments</h3>
                                <p className="text-sm text-gray-500">Global switch to turn off all payment processing.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={paymentEnabled}
                                    onChange={(e) => setPaymentEnabled(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                            </label>
                        </div>

                        <div className="border-t border-purple-200/50 dark:border-zinc-700"></div>

                        <div className="flex items-center justify-between opacity-90">
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Stripe Gateway</h3>
                                <p className="text-sm text-gray-500">Enable/Disable Stripe as a payment provider.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={stripeEnabled}
                                    onChange={(e) => setStripeEnabled(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 dark:peer-focus:ring-pink-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-pink-600"></div>
                            </label>
                        </div>

                    </div>
                    {!paymentEnabled && (
                        <div className="flex items-center gap-2 mt-4 text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
                            <AlertCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">Payments are currently disabled. Users will see a maintenance message.</span>
                        </div>
                    )}
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition shadow-lg flex items-center gap-2 disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>

            </div>
        </div>
    );
}
