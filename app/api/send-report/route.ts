import { NextRequest, NextResponse } from 'next/server';
import { createBrevoClient } from '@/lib/brevo-client';
import { formatReasonsForEmail, validateEmail, sanitizeHealthState, truncateText } from '@/lib/email-utils';
import { SendReportRequest, SendReportResponse } from '@/types/brevo';

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as SendReportRequest;

        if (!body.email || !validateEmail(body.email)) {
            return NextResponse.json({ success: false, message: 'Invalid email address' }, { status: 400 });
        }

        if (!body.result || !body.result.health_state || !body.result.reasons) {
            return NextResponse.json({ success: false, message: 'Invalid result data' }, { status: 400 });
        }

        const listId = process.env.BREVO_LIST_ID;
        if (!listId) {
            console.error('BREVO_LIST_ID environment variable is not set');
            return NextResponse.json({ success: false, message: 'Email service configuration error' }, { status: 500 });
        }

        const healthState = sanitizeHealthState(body.result.health_state);
        const healthReasons = truncateText(formatReasonsForEmail(body.result.reasons));

        const brevoClient = createBrevoClient();

        await brevoClient.createOrUpdateContact({
            email: body.email,
            attributes: {
                HEALTH_STATE: healthState,
                HEALTH_REASONS: healthReasons,
            },
            listIds: [parseInt(listId, 10)],
            updateEnabled: true,
        });

        const response: SendReportResponse = {
            success: true,
            message: 'Report sent successfully',
        };

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error('Error sending report to Brevo:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to send report. Please try again later.',
            },
            { status: 500 }
        );
    }
}
