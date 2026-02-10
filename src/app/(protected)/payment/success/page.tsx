"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import Confetti from "react-confetti";

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const sessionId = searchParams?.get("session_id");
    const [timeLeft, setTimeLeft] = useState(5);
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        if (!sessionId) {
            // router.push("/upgrade"); // Commented out to prevent immediate redirect if just testing UI without param
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push("/dashboard");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [sessionId, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF5F7] overflow-hidden">
            <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md mx-4"
            >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2 font-heading">Payment Successful!</h1>
                <p className="text-gray-500 mb-8">
                    Welcome to Premium! Your account has been upgraded. You can now enjoy unlimited swipes and verification status.
                </p>

                <div className="p-4 bg-gray-50 rounded-xl mb-6">
                    <p className="text-sm text-gray-400 mb-1">Session ID</p>
                    <code className="text-xs text-gray-600 break-all">{sessionId || "Processing..."}</code>
                </div>

                <div className="text-sm text-gray-400">
                    Redirecting to dashboard in {timeLeft} seconds...
                </div>

                <button
                    onClick={() => router.push("/dashboard")}
                    className="mt-6 w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition flex items-center justify-center gap-2"
                >
                    Go to Dashboard <ArrowRight className="w-4 h-4" />
                </button>
            </motion.div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FFF5F7]">Loading...</div>}>
            <PaymentSuccessContent />
        </Suspense>
    );
}

// Simple hook for window dimensions
function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1000,
        height: typeof window !== 'undefined' ? window.innerHeight : 800,
    });

    useEffect(() => {
        function handleResize() {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    return windowDimensions;
}
