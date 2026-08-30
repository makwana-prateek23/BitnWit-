'use client';

import { FormEvent, useState } from 'react';

const inputClass = 'mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-ink outline-none transition placeholder:text-slate-400 focus:border-rabbit focus:bg-white focus:ring-4 focus:ring-rabbit/10';

export default function WhatsAppContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError('');
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to prepare your message.');
      window.location.href = result.whatsappUrl;
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Something went wrong. Please call us directly.');
      setLoading(false);
    }
  }

  return <form onSubmit={submit} className="mt-7 grid gap-6 sm:grid-cols-2">
    <label className="text-sm font-semibold text-slate-700">Your name<input name="name" required maxLength={80} placeholder="Jane Smith" className={inputClass} /></label>
    <label className="text-sm font-semibold text-slate-700">Email or phone<input name="contact" required maxLength={120} placeholder="How should we reach you?" className={inputClass} /></label>
    <label className="hidden" aria-hidden="true">Company website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <label className="text-sm font-semibold text-slate-700 sm:col-span-2">What do you need?<select name="service" required className={inputClass} defaultValue=""><option value="" disabled>Select a service</option><option>Website or web app</option><option>Mobile app</option><option>UI/UX and product design</option><option>AI integration</option><option>Marketing, SEO, or branding</option><option>Custom software</option><option>Not sure yet</option></select></label>
    <label className="text-sm font-semibold text-slate-700">Ideal timeline<select name="timeline" className={inputClass} defaultValue=""><option value="" disabled>Select timeline</option><option>As soon as possible</option><option>1–2 months</option><option>3–6 months</option><option>Exploring for later</option></select></label>
    <label className="text-sm font-semibold text-slate-700">Your location<input name="location" maxLength={100} placeholder="City, country" className={inputClass} /></label>
    <label className="text-sm font-semibold text-slate-700 sm:col-span-2">Tell us about the project<textarea name="message" rows={5} required minLength={10} maxLength={1500} placeholder="The goal, the problem, and anything we should know..." className={inputClass} /></label>
    {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700 sm:col-span-2">{error}</p>}
    <button type="submit" disabled={loading} className="btn-shine rounded-xl bg-[#25D366] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-[#1fbd5a] disabled:cursor-wait disabled:opacity-70 sm:col-span-2">{loading ? 'Preparing WhatsApp…' : 'Continue on WhatsApp →'}</button>
    <p className="text-center text-xs leading-5 text-slate-500 sm:col-span-2">Your details are placed in a prefilled WhatsApp message. Nothing is stored by this website.</p>
  </form>;
}
