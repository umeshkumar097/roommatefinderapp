"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

type Currency = 'INR' | 'USD';

interface CurrencyContextType {
    currency: Currency;
    symbol: string;
    loading: boolean;
    formatPrice: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
    currency: 'INR',
    symbol: '₹',
    loading: false,
    formatPrice: (amount) => `₹${amount}`,
});

export const useCurrency = () => useContext(CurrencyContext);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currency, setCurrency] = useState<Currency>('INR');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const detectLocation = async () => {
            try {
                // Using ipapi.co for simple country detection (free tier)
                const response = await axios.get('https://ipapi.co/json/');
                const { country_code } = response.data;

                if (country_code === 'IN') {
                    setCurrency('INR');
                } else {
                    setCurrency('USD');
                }
            } catch (error) {
                console.warn("Could not detect location, defaulting to INR", error);
                setCurrency('INR'); // Default fallback
            } finally {
                setLoading(false);
            }
        };

        detectLocation();
    }, []);

    const symbol = currency === 'INR' ? '₹' : '$';

    const formatPrice = (amount: number) => {
        if (currency === 'INR') {
            return `₹${amount}`;
        } else {
            // Rough conversion logic or fixed pricing
            // 99 INR ~ 1.20 USD -> Let's use standard tiers
            // Free -> Free
            // 99 INR -> $1.99
            // 599 INR -> $9.99

            // Dynamic conversion for display if needed
            // But for plans we usually have fixed price points
            return `$${amount}`;
        }
    };

    return (
        <CurrencyContext.Provider value={{ currency, symbol, loading, formatPrice }}>
            {children}
        </CurrencyContext.Provider>
    );
}
