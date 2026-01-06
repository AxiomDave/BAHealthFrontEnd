import Link from 'next/link';

export const Header = () => {
    return (
        <header className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex h-14 sm:h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-xl sm:text-2xl font-serif font-semibold text-foreground tracking-tight">Build Alpha</span>
                    </Link>

                    <nav className="flex items-center gap-1">
                        <Link href="/" className="px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent">
                            Home
                        </Link>
                        <Link href="/" className="hidden sm:block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent">
                            Documentation
                        </Link>
                        <Link href="/" className="px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent">
                            Support
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};
