"use client";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
    const { user, logout } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
            <p className="mt-4">You are logged in as {user?.email}</p>
            <button
                onClick={logout}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Logout
            </button>
        </div>
    );
}
