"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { auth } from "@/lib/firebase";
import { signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier, ConfirmationResult, GoogleAuthProvider } from "firebase/auth";

export interface User {
    id: number;
    email: string | null;
    name: string;
    role: string;
    bio?: string;
    images?: string[];
    isVerified?: boolean;
    gender?: string;
    dob?: string | Date;
    preferences?: any;
    location?: string;
    profession?: string;
    phoneNumber?: string;
    firebaseUid?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (data: any) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    loginWithPhone: (phoneNumber: string) => Promise<ConfirmationResult>;
    verifyOtp: (confirmationResult: ConfirmationResult, code: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const { data } = await axios.get("/api/auth/me");
            setUser(data.user);
        } catch (error) {
            console.error("Auth check failed", error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (credentials: any) => {
        try {
            const { data } = await axios.post("/api/auth/login", credentials);
            setUser(data.user);
            router.push("/");
        } catch (error) {
            throw error;
        }
    };

    const register = async (userData: any) => {
        try {
            const { data } = await axios.post("/api/auth/register", userData);
            setUser(data.user);
            router.push("/");
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.post("/api/auth/logout");
            setUser(null);
            router.push("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const loginWithGoogle = async () => {
        try {
            const googleProvider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, googleProvider);
            const token = await result.user.getIdToken();
            await verifyBackendToken(token);
        } catch (error) {
            console.error("Google login failed", error);
            throw error;
        }
    };

    const loginWithPhone = async (phoneNumber: string) => {
        try {
            const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
            });
            return await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
        } catch (error) {
            console.error("Phone login failed", error);
            throw error;
        }
    };

    const verifyOtp = async (confirmationResult: ConfirmationResult, code: string) => {
        try {
            const result = await confirmationResult.confirm(code);
            const token = await result.user.getIdToken();
            await verifyBackendToken(token);
        } catch (error) {
            console.error("OTP verification failed", error);
            throw error;
        }
    };

    const verifyBackendToken = async (token: string) => {
        try {
            const { data } = await axios.post("/api/auth/firebase", { token });
            setUser(data.user);
            router.push("/");
        } catch (error) {
            console.error("Backend token verification failed", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout, loginWithGoogle, loginWithPhone, verifyOtp }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
