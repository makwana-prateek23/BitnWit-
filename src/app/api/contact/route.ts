import { NextResponse } from 'next/server';
import { store } from '@/lib/db/store';

const WHATSAPP_NUMBER = '918949728810';

const clean = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot spam check
    if (clean(body.website, 100)) {
      return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
    }

    const leadInput = {
      name: clean(body.name, 80),
      contact: clean(body.contact, 120),
      service: clean(body.service, 100),
      timeline: clean(body.timeline, 80) || 'Not specified',
      location: clean(body.location, 100) || 'Not specified',
      message: clean(body.message, 1500),
      budget: clean(body.budget, 100) || 'Flexible / To be discussed',
      company: clean(body.company, 120) || '',
    };

    if (!leadInput.name || !leadInput.contact || !leadInput.service || leadInput.message.length < 10) {
      return NextResponse.json(
        { error: 'Please complete all required fields.' },
        { status: 400 }
      );
    }

    // Determine if contact is email or phone
    const isEmail = leadInput.contact.includes('@');
    const email = isEmail ? leadInput.contact : '';
    const phone = !isEmail ? leadInput.contact : '';

    // Automatically store lead in CRM database
    try {
      await store.createLead({
        fullName: leadInput.name,
        email: email || `${leadInput.name.toLowerCase().replace(/[^a-z0-9]/g, '')}@lead.bitnwit.com`,
        phone: phone || leadInput.contact,
        companyName: leadInput.company,
        interestedService: leadInput.service,
        projectBudget: leadInput.budget,
        message: `${leadInput.message}\n\n[Location: ${leadInput.location} | Timeline: ${leadInput.timeline}]`,
        leadSource: 'WEBSITE',
        status: 'NEW',
      });
    } catch (dbErr) {
      console.error('Failed to auto-persist lead in CRM:', dbErr);
      // Non-fatal for client: continue so user gets WhatsApp connection
    }

    const text = [
      `Hello BITnWIT! 👋`,
      `I would like to discuss a project.`,
      ``,
      `Name: ${leadInput.name}`,
      `Contact: ${leadInput.contact}`,
      `Service: ${leadInput.service}`,
      `Timeline: ${leadInput.timeline}`,
      `Location: ${leadInput.location}`,
      ``,
      `Project details:`,
      leadInput.message,
      ``,
      `Sent from the BITnWIT website.`,
    ].join('\n');

    return NextResponse.json({
      success: true,
      whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
    });
  } catch (err) {
    console.error('Contact endpoint error:', err);
    return NextResponse.json(
      { error: 'We could not prepare your WhatsApp message.' },
      { status: 400 }
    );
  }
}
