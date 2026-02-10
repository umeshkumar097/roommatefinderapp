"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface User {
    id: number;
    email: string;
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
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (data: any) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => Promise<void>;
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
            router.push("/dashboard");
        } catch (error) {
            throw error;
        }
    };

    const register = async (userData: any) => {
        try {
            const { data } = await axios.post("/api/auth/register", userData);
            setUser(data.user);
            router.push("/dashboard"); // Redirect to dashboard or onboarding
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.post("/api/auth/logout"); // Need to implement logout API to clear cookie
            setUser(null);
            router.push("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
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
