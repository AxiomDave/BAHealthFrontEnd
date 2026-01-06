'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HealthStateBadge } from '@/components/HealthStateBadge';
import { TopReasonsList } from '@/components/TopReasonsList';
import { UpgradeSection } from '@/components/UpgradeSection';
import { AnalyzeResponse } from '@/types/api';

export default function ResultsPage() {
    const router = useRouter();
    const [data, setData] = useState<AnalyzeResponse | null>(() => {
        if (typeof window === 'undefined') return null;
        const storedData = sessionStorage.getItem('analysisResult');
        if (!storedData) return null;
        try {
            return JSON.parse(storedData);
        } catch {
            return null;
        }
    });

    useEffect(() => {
        if (!data) {
            router.push('/');
            return;
        }

        const sendEmail = async () => {
            const emailSent = sessionStorage.getItem('emailSent');
            const userEmail = sessionStorage.getItem('userEmail');

            if (emailSent === 'true' || !userEmail) {
                return;
            }

            try {
                const response = await fetch('/api/send-report', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: userEmail,
                        result: data,
                    }),
                });

                if (response.ok) {
                    sessionStorage.setItem('emailSent', 'true');
                }
            } catch (error) {
                console.error('Failed to send email report:', error);
            }
        };

        sendEmail();
    }, [data, router]);

    if (!data) {
        return null;
    }

    const { health_state, reasons } = data;

    const simplifiedReasons = reasons.map((reason) => ({
        code: reason.code,
        details: reason.details,
    }));

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 bg-background px-4 sm:px-6 py-8 sm:py-12 md:py-16">
                <div className="container mx-auto max-w-4xl">
                    <div className="mb-8 sm:mb-12 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">Strategy Health Result</h1>
                        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">A quick structural health check based on your trade history</p>
                    </div>

                    <div className="space-y-8 sm:space-y-10 md:space-y-12">
                        <HealthStateBadge healthState={health_state} />

                        <TopReasonsList reasons={simplifiedReasons} />

                        <UpgradeSection />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
