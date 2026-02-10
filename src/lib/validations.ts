import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export const listingSchema = z.object({
    title: z.string().min(5),
    description: z.string().min(10),
    price: z.number().positive(),
    location: z.string().min(2),
    images: z.array(z.string()).optional(),
    amenities: z.array(z.string()).optional(),
    availableDate: z.string().optional(),
    leaseDuration: z.string().optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
