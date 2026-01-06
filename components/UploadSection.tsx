'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Mail, ArrowRight, Shield, Zap, File, Download } from 'lucide-react';
import { LoadingState } from './LoadingState';
import { analyzeStrategy } from '@/lib/api-client';
import { ApiError } from '@/types/api';

export const UploadSection = () => {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [email, setEmail] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        setError('');

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            if (droppedFile.type === 'text/csv' || droppedFile.name.endsWith('.csv')) {
                setFile(droppedFile);
            } else {
                setError('Please upload a CSV file only');
            }
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
                setFile(selectedFile);
            } else {
                setError('Please upload a CSV file only');
            }
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            setError('Please upload a CSV file');
            return;
        }
        if (!email) {
            setError('Please enter your email address');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await analyzeStrategy(file);
            sessionStorage.setItem('analysisResult', JSON.stringify(response));
            router.push('/results');
        } catch (err: unknown) {
            const apiError = err as ApiError;
            setError(apiError.message);
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <section className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 md:py-16">
                <LoadingState />
            </section>
        );
    }

    return (
        <section className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 md:py-16">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 px-2">
                        <span className="text-foreground">Upload Your Trades.</span>
                        <br />
                        <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">Get Clear Results.</span>
                    </h1>
                    <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto px-4">Instantly see whether your strategy is structurally sound — or quietly fragile. Full report shown here and sent to your inbox.</p>
                </div>

                <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 shadow-xl">
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`relative border-2 rounded-lg sm:rounded-xl p-8 sm:p-10 md:p-12 transition-all duration-200 ${isDragging ? 'border-blue-500 bg-blue-500/5 shadow-lg shadow-blue-500/10' : 'border-border bg-card/50 hover:border-blue-500/50 hover:bg-card/80'}`}
                    >
                        <input type="file" accept=".csv" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" id="file-upload" />
                        <div className={`flex flex-col gap-4 sm:gap-5 ${file ? 'items-start w-full' : 'items-center'}`}>
                            {file ? (
                                <div className="w-full space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="font-medium">File ready for analysis</span>
                                    </div>
                                    <div className="bg-card border-2 border-border rounded-lg p-3 sm:p-4 hover:border-blue-500/50 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 border border-border">
                                                <File className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm sm:text-base font-medium text-foreground truncate">{file.name}</p>
                                                <div className="flex items-center gap-3 mt-0.5">
                                                    <span className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</span>
                                                    <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                                        Ready
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setFile(null);
                                                }}
                                                className="text-muted-foreground hover:text-destructive transition-colors p-2 hover:bg-muted rounded-lg flex-shrink-0"
                                                title="Remove file"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <button onClick={() => setFile(null)} className="text-xs sm:text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors">
                                        Replace file
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-muted border border-border flex items-center justify-center">
                                        <Upload className="w-6 h-6 sm:w-7 sm:h-7 text-muted-foreground" strokeWidth={2} />
                                    </div>
                                    <div className="space-y-2 text-center">
                                        <p className="text-foreground font-medium text-base sm:text-lg">Upload Trade History</p>
                                        <p className="text-sm sm:text-base text-muted-foreground">
                                            Drag and drop your CSV file, or{' '}
                                            <label htmlFor="file-upload" className="text-blue-500 hover:text-blue-600 font-medium cursor-pointer transition-colors underline decoration-blue-500/30 hover:decoration-blue-600">
                                                browse
                                            </label>
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border inline-flex items-center gap-2">
                                            <File className="w-3.5 h-3.5" />
                                            CSV format required
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="text-center">
                        <a
                            href="/example-trades.csv"
                            download="example-trades.csv"
                            className="inline-flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            Download example file
                        </a>
                    </div>

                    <div className="relative group">
                        <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-600 transition-colors">
                            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white border-2 border-gray-300 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow-md"
                        />
                    </div>

                    {error && <p className="text-xs sm:text-sm text-destructive text-center">{error}</p>}

                    <button
                        onClick={handleSubmit}
                        disabled={!file || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        Run Analysis
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="text-xs sm:text-sm text-muted-foreground text-center px-2">After submission, you&apos;ll see your results immediately. A detailed report will also be sent to your email.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-6 sm:mt-8 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span>Secure & encrypted</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-green-500" />
                        <span>Results in seconds</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
