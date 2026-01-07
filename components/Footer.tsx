import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="bg-gray-100 border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-md flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-xs">BA</span>
                        </div>
                        <span className="text-center sm:text-left">© {new Date().getFullYear()} Build Alpha. All rights reserved.</span>
                    </div>

                    <nav className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm flex-wrap justify-center">
                        <Link href="https://www.buildalpha.com/privacypolicy" className="text-gray-600 hover:text-gray-800 transition-colors whitespace-nowrap">
                            Privacy Policy
                        </Link>
                        <Link href="https://www.buildalpha.com/terms-and-conditions/" className="text-gray-600 hover:text-gray-800 transition-colors whitespace-nowrap">
                            Terms of Service
                        </Link>
                        <Link href="https://www.buildalpha.com/contact/" className="text-gray-600 hover:text-gray-800 transition-colors whitespace-nowrap">
                            Contact
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
};
