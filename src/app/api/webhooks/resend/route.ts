import { resend } from '@/lib/resend';
import { sendWelcomeEmail } from '@/actions/welcome-artist';
import { headers } from 'next/headers';

export async function POST(req: Request) {
    try {
        const payload = await req.text(); // Retrieve raw body for signature verification
        const headerList = await headers();

        // Validate that the secret exists
        const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
        if (!webhookSecret) {
            console.error('RESEND_WEBHOOK_SECRET is not defined');
            return new Response('Server configuration error', { status: 500 });
        }

        const svixId = headerList.get('svix-id');
        const svixTimestamp = headerList.get('svix-timestamp');
        const svixSignature = headerList.get('svix-signature');

        if (!svixId || !svixTimestamp || !svixSignature) {
            return new Response('Missing svix headers', { status: 400 });
        }

        // Resend uses Svix for webhook signing under the hood
        const result = resend.webhooks.verify({
            payload,
            headers: {
                id: svixId,
                timestamp: svixTimestamp,
                signature: svixSignature,
            },
            webhookSecret,
        });

        if (result.type === 'contact.created') {
            const { email, first_name, last_name, audience_id } = result.data as any; // Cast as any because the type definitions might be strict
            console.log(`Contact created event received for ${email} in audience ${audience_id}`);

            const artistName = first_name ? `${first_name}${last_name ? ' ' + last_name : ''}` : undefined;
            await sendWelcomeEmail(email, artistName);
            console.log(`Welcome email triggered for ${email}`);
        }

        return new Response('OK', { status: 200 });
    } catch (err: any) {
        if (err.name === 'WebhookVerificationError') {
            console.error('Webhook signature verification failed:', err.message);
            return new Response('Webhook verification failed', { status: 400 });
        }
        console.error('Webhook Error:', err);
        return new Response('Internal Server Error', { status: 500 });
    }
}
