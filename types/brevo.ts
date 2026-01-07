export interface BrevoContact {
    email: string;
    attributes: {
        HEALTH_STATE: string;
        HEALTH_REASON_1?: string;
        HEALTH_REASON_2?: string;
        HEALTH_REASON_3?: string;
        HEALTH_REASON_4?: string;
        HEALTH_REASON_5?: string;
    };
    listIds: number[];
    updateEnabled: boolean;
}

export interface BrevoCreateContactRequest {
    email: string;
    attributes?: Record<string, string | number>;
    listIds?: number[];
    updateEnabled?: boolean;
}

export interface BrevoCreateContactResponse {
    id: number;
}

export interface BrevoError {
    code: string;
    message: string;
}

export interface SendReportRequest {
    email: string;
    result: {
        health_state: string;
        reasons: Array<{
            code: string;
            details: string;
        }>;
    };
}

export interface SendReportResponse {
    success: boolean;
    message: string;
}
