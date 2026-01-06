import type { Metadata } from 'next';
import { Poppins, Playfair_Display } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
    variable: '--font-poppins',
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    style: ['normal', 'italic'],
});

const playfair = Playfair_Display({
    variable: '--font-playfair',
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800', '900'],
    style: ['normal', 'italic'],
});

export const metadata: Metadata = {
    title: 'Build Alpha - CSV Upload & Analysis',
    description: 'CSV Upload & Analysis',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${poppins.variable} ${playfair.variable} antialiased font-sans`}>{children}</body>
        </html>
    );
}
