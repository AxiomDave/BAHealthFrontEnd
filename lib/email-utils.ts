import { formatReasonCode } from './format-utils';

interface Reason {
    code: string;
    details: string;
}

export function formatReasonsForEmail(reasons: Reason[]): string {
    if (!reasons || reasons.length === 0) {
        return 'No specific reasons identified.';
    }

    return reasons
        .filter((r) => r.code !== 'LIMITATION_TRADE_DATA_ONLY')
        .map((r) => {
            const title = formatReasonCode(r.code);
            return `${title}: ${r.details}`;
        })
        .join('. \n');
}

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function sanitizeHealthState(state: string): string {
    const validStates = ['TRADE', 'MONITOR', 'SUPPRESS'];
    const upperState = state.toUpperCase();
    return validStates.includes(upperState) ? upperState : 'UNKNOWN';
}

export function truncateText(text: string, maxLength: number = 5000): string {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength - 3) + '...';
}
