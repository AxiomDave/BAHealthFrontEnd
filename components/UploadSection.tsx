'use client';

import { useState, useCallback } from 'react';
import { Upload, Mail, ArrowRight, Shield, Zap, File } from 'lucide-react';

export const UploadSection = () => {
    const [file, setFile] = useState<File | null>(null);
    const [email, setEmail] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState('');

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

    const handleSubmit = () => {
        if (!file) {
            setError('Please upload a CSV file');
            return;
        }
        if (!email) {
            setError('Please enter your email address');
            return;
        }
        console.log('Submitting:', { file, email });
    };

    return (
        <section className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 md:py-16">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 px-2">
                        <span className="text-foreground">Upload Your Data.</span>
                        <br />
                        <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">Get Clear Results.</span>
                    </h1>
                    <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto px-4">Submit your trading data for comprehensive analysis. Results displayed instantly, with a full report sent to your inbox.</p>
                </div>

                <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 shadow-xl">
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`relative border-2 border-dashed rounded-xl sm:rounded-2xl p-8 sm:p-12 md:p-16 text-center transition-all duration-300 ${
                            isDragging ? 'border-blue-500 bg-blue-50 scale-[1.02] shadow-lg' : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-gray-50 hover:shadow-md'
                        }`}
                    >
                        <input type="file" accept=".csv" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" id="file-upload" />
                        <div className={`flex flex-col gap-3 sm:gap-4 ${file ? 'items-start w-full' : 'items-center'}`}>
                            {file ? (
                                <div className="w-full space-y-3">
                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="font-medium">File uploaded successfully</span>
                                    </div>
                                    <div className="bg-white border-2 border-blue-200 rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                                                <File className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">{file.name}</p>
                                                <div className="flex items-center gap-3 mt-0.5">
                                                    <span className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</span>
                                                    <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                                        Ready
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setFile(null);
                                                }}
                                                className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg flex-shrink-0 group"
                                                title="Remove file"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <button onClick={() => setFile(null)} className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors">
                                        Upload a different file
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 duration-300">
                                        <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2.5} />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-900 font-semibold text-base sm:text-lg">Drop your CSV file here</p>
                                        <p className="text-xs sm:text-sm text-gray-600">
                                            or{' '}
                                            <label htmlFor="file-upload" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline cursor-pointer transition-colors">
                                                browse
                                            </label>{' '}
                                            to choose a file
                                        </p>
                                        <p className="text-xs text-gray-500 mt-2 sm:mt-3 bg-gray-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full inline-flex items-center gap-1">
                                            <File className="w-3 h-3 sm:w-4 sm:h-4" /> CSV format only
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
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
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2 group cursor-pointer"
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
