"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
// Button and Input imports removed as we use native elements for style consistency
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FirebaseAuth() {
    const { loginWithGoogle, loginWithPhone, verifyOtp } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [verificationId, setVerificationId] = useState<any>(null);
    const [showOtpInput, setShowOtpInput] = useState(false);

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            await loginWithGoogle();
        } catch (error) {
            console.error(error);
            alert("Google Login Failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendOtp = async () => {
        if (!phoneNumber) return alert("Please enter a phone number");
        setIsLoading(true);
        try {
            const result = await loginWithPhone(phoneNumber);
            setVerificationId(result);
            setShowOtpInput(true);
        } catch (error) {
            console.error(error);
            alert("Failed to send OTP. Make sure phone number includes country code (e.g., +91...)");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp) return alert("Please enter OTP");
        setIsLoading(true);
        try {
            await verifyOtp(verificationId, otp);
        } catch (error) {
            console.error(error);
            alert("Invalid OTP");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full space-y-4">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
            </div>

            <button
                type="button"
                disabled={isLoading}
                onClick={handleGoogleLogin}
                className="w-full py-3 rounded-xl font-bold text-gray-700 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (
                    <svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                    </svg>
                )}
                Google
            </button>

            {!showOtpInput ? (
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="+91 9876543210"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="input-field flex-1"
                    />
                    <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={isLoading}
                        className="px-4 py-2 bg-purple-600 text-white font-bold rounded-xl shadow-purple-500/40 hover:bg-purple-700 transition-all disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send OTP"}
                    </button>
                </div>
            ) : (
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="input-field flex-1"
                    />
                    <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={isLoading}
                        className="px-4 py-2 bg-green-600 text-white font-bold rounded-xl shadow-green-500/40 hover:bg-green-700 transition-all disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
                    </button>
                </div>
            )}
            <div id="recaptcha-container"></div>
        </div>
    );
}
