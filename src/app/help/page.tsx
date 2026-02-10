
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function HelpCenterPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                        Help Center
                    </h1>
                    <p className="text-slate-600 text-lg">
                        Frequently asked questions and support guides.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>How do I verify my profile?</AccordionTrigger>
                            <AccordionContent>
                                To verify your profile, go to Settings &gt; Verification. Upload a valid government ID (Aadhaar, PAN, etc.). Our team will review it within 24 hours.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Is there a fee to post a room?</AccordionTrigger>
                            <AccordionContent>
                                You can post one room for free! For more visibility and unlimited posts, check out our Premium plans.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>How does the matching system work?</AccordionTrigger>
                            <AccordionContent>
                                We use a smart algorithm based on your lifestyle preferences (sleep schedule, habits, interests). Swipe right to match with compatible roommates!
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>Is my contact info safe?</AccordionTrigger>
                            <AccordionContent>
                                Yes! Your phone number is hidden by default. You can choose to share it only when you feel comfortable with a match.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </main>
            <Footer />
        </div>
    );
}
