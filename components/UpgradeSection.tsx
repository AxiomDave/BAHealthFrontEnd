import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const UpgradeSection = () => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-2 border-gray-700 rounded-xl sm:rounded-2xl p-8 sm:p-10 md:p-12 mt-12 sm:mt-16 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
                <div className="text-center mb-8 sm:mb-10">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-5">What This Free Report Can&apos;t Tell You</h2>
                    <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">This check analyzes trade data only. It cannot evaluate market regime sensitivity, volatility stress, or portfolio-level risks that require deeper context.</p>
                </div>

                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 sm:p-8 mb-8 sm:mb-10">
                    <h3 className="text-md sm:text-lg font-semibold text-white mb-4 sm:mb-5">Professional traders go further, because most failures happen when context changes, not when statistics drift.</h3>

                    <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-300">
                        <li className="flex items-start gap-3">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>Is this drawdown normal for the current market regime, or a warning sign?</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>Does this strategy fail at the same time as your other strategies?</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>Is recent performance statistically sustainable, even if it’s positive?</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>Should risk be reduced now, or is this just noise?</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>What happens to portfolio drawdown if this strategy stays on?</span>
                        </li>
                    </ul>
                </div>

                <div className="text-center mb-8">
                    <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
                        This is what <span className="text-white font-medium">Strategy Health inside Build Alpha</span> answers automatically.
                    </p>
                </div>

                <div className="text-center">
                    <Link
                        href="https://www.buildalpha.com/strategy-health-score/"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2 group cursor-pointer"
                    >
                        Unlock Full Strategy & Portfolio Health
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <p className="text-xs sm:text-sm text-gray-400 mt-3">Includes full Build Alpha license</p>
                </div>
            </div>
        </div>
    );
};
