import { NextResponse } from 'next/server';

const WHATSAPP_NUMBER = '918949728810';

const clean = (value: unknown, max: number) => typeof value === 'string' ? value.trim().slice(0, max) : '';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (clean(body.website, 100)) return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
    const lead = { name: clean(body.name, 80), contact: clean(body.contact, 120), service: clean(body.service, 100), timeline: clean(body.timeline, 80) || 'Not specified', location: clean(body.location, 100) || 'Not specified', message: clean(body.message, 1500) };
    if (!lead.name || !lead.contact || !lead.service || lead.message.length < 10) return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 });
    const text = [`Hello BITnWIT! 👋`, `I would like to discuss a project.`, ``, `Name: ${lead.name}`, `Contact: ${lead.contact}`, `Service: ${lead.service}`, `Timeline: ${lead.timeline}`, `Location: ${lead.location}`, ``, `Project details:`, lead.message, ``, `Sent from the BITnWIT website.`].join('\n');
    return NextResponse.json({ whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}` });
  } catch { return NextResponse.json({ error: 'We could not prepare your WhatsApp message.' }, { status: 400 }); }
}
