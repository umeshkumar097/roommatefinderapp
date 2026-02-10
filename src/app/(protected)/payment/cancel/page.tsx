"use client";

import { useRouter } from "next/navigation";
import { XCircle, ArrowLeft } from "lucide-react";

export default function PaymentCancelPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF5F7]">
            <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md mx-4">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <XCircle className="w-10 h-10 text-red-600" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2 font-heading">Payment Cancelled</h1>
                <p className="text-gray-500 mb-8">
                    Your payment was not processed. No charges were made. You can try upgrading again whenever you're ready.
                </p>

                <div className="space-y-3">
                    <button
                        onClick={() => router.push("/upgrade")}
                        className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition"
                    >
                        Try Again
                    </button>
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="w-full py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}
