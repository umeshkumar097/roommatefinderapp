"use client";

import { AuthProvider } from "@/context/AuthContext";
import { SocketProvider } from "@/components/providers/SocketProvider";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {

    return (
        <AuthProvider>
            <SocketProvider>

                {children}
            </SocketProvider>
        </AuthProvider>
    );
}
