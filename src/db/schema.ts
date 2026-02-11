import { pgTable, serial, text, timestamp, boolean, jsonb, integer, doublePrecision } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    // Wait, better to keep email unique but allow nulls? Drizzle/Postgres allows multiple nulls in unique column? Yes.
    // Making email nullable for Phone Auth users who haven't provided one yet.
    email: text('email').unique(),
    passwordHash: text('password_hash'), // Optional for Firebase users
    firebaseUid: text('firebase_uid').unique(),
    phoneNumber: text('phone_number').unique(),
    role: text('role').default('user').notNull(), // 'user', 'admin'
    bio: text('bio'),
    gender: text('gender'),
    dob: timestamp('dob'),
    profession: text('profession'), // "Software Developer"
    languages: jsonb('languages').default([]), // ["English", "Hindi"]
    lifestyle: jsonb('lifestyle').default([]), // ["Non-smoker", "Night owl", "Pet lover"]
    images: jsonb('images').default([]),
    preferences: jsonb('preferences').default({}),
    isVerified: boolean('is_verified').default(false),
    verificationStatus: text('verification_status').default('unverified'), // 'unverified', 'pending', 'verified', 'rejected'
    verificationDocument: text('verification_document'),
    stripeCustomerId: text('stripe_customer_id'),
    subscriptionStatus: text('subscription_status').default('free'), // 'active', 'inactive', 'past_due'
    subscriptionPlan: text('subscription_plan').default('free'), // 'free', 'premium'
    subscriptionId: text('subscription_id'),
    location: text('location'), // Added to schema to match AuthContext

    // Roommate Finder Specific Fields
    budgetMin: integer('budget_min'),
    budgetMax: integer('budget_max'),
    preferredLocation: text('preferred_location'),
    moveInDate: timestamp('move_in_date'),

    // Subscription Limits & Usage
    planPostsLimit: integer('plan_posts_limit').default(1), // Default Free plan limit
    planFeaturedLimit: integer('plan_featured_limit').default(0),
    postsUsed: integer('posts_used').default(0),
    featuredUsed: integer('featured_used').default(0),
    planExpiry: timestamp('plan_expiry'),

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const listings = pgTable('listings', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id).notNull(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    price: integer('price').notNull(),
    deposit: integer('deposit'), // Security Deposit
    location: text('location').notNull(),
    latitude: doublePrecision('latitude'),
    longitude: doublePrecision('longitude'),
    images: jsonb('images').default([]),
    amenities: jsonb('amenities').default([]),
    houseRules: jsonb('house_rules').default([]), // ["No smoking", "No pets"]
    availableDate: timestamp('available_date'),
    leaseDuration: text('lease_duration'),
    roomType: text('room_type').default('Private Room'), // "Private Room", "Shared Room"
    furnishingStatus: text('furnishing_status').default('Unfurnished'), // "Fully Furnished", "Semi-Furnished"
    isFeatured: boolean('is_featured').default(false),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const matches = pgTable('matches', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id).notNull(), // The user who swiped right
    listingId: integer('listing_id').references(() => listings.id).notNull(), // The listing they liked
    status: text('status').default('pending').notNull(), // 'pending', 'accepted', 'rejected'
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const messages = pgTable('messages', {
    id: serial('id').primaryKey(),
    senderId: integer('sender_id').references(() => users.id).notNull(),
    receiverId: integer('receiver_id').references(() => users.id).notNull(),
    content: text('content').notNull(),
    matchId: integer('match_id').references(() => matches.id), // Optional: link to a specific match context
    isRead: boolean('is_read').default(false),
    createdAt: timestamp('created_at').defaultNow(),
});

export const systemSettings = pgTable('system_settings', {
    key: text('key').primaryKey(), // e.g., 'payment_config'
    value: jsonb('value').default({}), // e.g., { enabled: true, stripe: { enabled: true } }
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const phoneExchanges = pgTable('phone_exchanges', {
    id: serial('id').primaryKey(),
    requesterId: integer('requester_id').references(() => users.id).notNull(),
    targetUserId: integer('target_user_id').references(() => users.id).notNull(),
    status: text('status').default('pending').notNull(), // 'pending', 'approved', 'rejected'
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});
