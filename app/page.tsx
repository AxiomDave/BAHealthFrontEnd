import { Header } from '@/components/Header';
import { UploadSection } from '@/components/UploadSection';
import { Footer } from '@/components/Footer';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <UploadSection />
            <Footer />
        </div>
    );
}
