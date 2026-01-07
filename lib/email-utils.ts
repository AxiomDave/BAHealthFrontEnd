import { formatReasonCode } from './format-utils';

interface Reason {
    code: string;
    details: string;
}

export function formatReasonsForBrevo(reasons: Reason[]): Record<string, string> {
    if (!reasons || reasons.length === 0) {
        return {};
    }

    const filteredReasons = reasons.filter((r) => r.code !== 'LIMITATION_TRADE_DATA_ONLY').slice(0, 5);

    const attributes: Record<string, string> = {};

    filteredReasons.forEach((reason, index) => {
        const title = formatReasonCode(reason.code);
        const fieldName = `HEALTH_REASON_${index + 1}`;
        attributes[fieldName] = `${title}: ${reason.details}`;
    });

    return attributes;
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
