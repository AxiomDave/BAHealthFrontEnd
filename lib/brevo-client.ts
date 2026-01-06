import { BrevoCreateContactRequest, BrevoCreateContactResponse, BrevoError } from '@/types/brevo';

const BREVO_API_URL = process.env.BREVO_API_URL || 'https://api.brevo.com/v3';

export class BrevoClient {
    private apiKey: string;

    constructor(apiKey: string) {
        if (!apiKey) {
            throw new Error('Brevo API key is required');
        }
        this.apiKey = apiKey;
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${BREVO_API_URL}${endpoint}`;

        const response = await fetch(url, {
            ...options,
            headers: {
                'api-key': this.apiKey,
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            const error = (await response.json().catch(() => ({}))) as BrevoError;
            throw new Error(error.message || `Brevo API error: ${response.status}`);
        }

        if (response.status === 204) {
            return {} as T;
        }

        return response.json();
    }

    async createOrUpdateContact(data: BrevoCreateContactRequest): Promise<BrevoCreateContactResponse | void> {
        return this.request<BrevoCreateContactResponse>('/contacts', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async addContactToList(email: string, listId: number): Promise<void> {
        return this.request<void>(`/contacts/lists/${listId}/contacts/add`, {
            method: 'POST',
            body: JSON.stringify({ emails: [email] }),
        });
    }
}

export function createBrevoClient(): BrevoClient {
    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
        throw new Error('BREVO_API_KEY environment variable is not set');
    }

    return new BrevoClient(apiKey);
}
