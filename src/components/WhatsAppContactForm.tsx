'use client';

import { FormEvent, useState } from 'react';
import NeuButton from './ui/NeuButton';
import NeuInput from './ui/NeuInput';
import NeuTextarea from './ui/NeuTextarea';
import { AiOutlineWhatsApp } from 'react-icons/ai';

export default function WhatsAppContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to prepare your message.');

      if (result.whatsappUrl) {
        window.location.href = result.whatsappUrl;
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Something went wrong. Please connect with us directly.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
      <NeuInput
        label="Your Full Name *"
        name="name"
        required
        maxLength={80}
        placeholder="e.g. Vikramaditya Singhania"
      />

      <NeuInput
        label="Email or Phone Number *"
        name="contact"
        required
        maxLength={120}
        placeholder="e.g. vikram@company.com or +91 98..."
      />

      <label className="hidden" aria-hidden="true">
        Website <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label className="text-xs font-bold uppercase tracking-wider text-neu-textSec">
          Service Discipline *
        </label>
        <select
          name="service"
          required
          defaultValue=""
          className="w-full rounded-xl neu-recessed px-4 py-3 text-sm text-neu-text focus:outline-none focus:ring-2 focus:ring-neu-purple"
        >
          <option value="" disabled>Select a discipline</option>
          <option value="Web Development">Web Development (Next.js / Full-Stack)</option>
          <option value="Mobile App Development">Mobile App Development (iOS &amp; Android)</option>
          <option value="AI Integration">AI Integration &amp; Workflow Automation</option>
          <option value="Custom Engineering">Custom Engineering, APIs &amp; Dashboards</option>
          <option value="UI/UX Design">UI/UX Design &amp; Figma Design Systems</option>
          <option value="Digital Marketing">Digital Marketing &amp; Performance Acquisition</option>
          <option value="SEO & Analytics">SEO &amp; Growth Analytics</option>
          <option value="Branding & Strategy">Branding &amp; Market Positioning</option>
          <option value="General Consultation">Not sure yet / Strategic Discovery</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-neu-textSec">
          Project Budget
        </label>
        <select
          name="budget"
          defaultValue="Flexible / Discussion"
          className="w-full rounded-xl neu-recessed px-4 py-3 text-sm text-neu-text focus:outline-none focus:ring-2 focus:ring-neu-purple"
        >
          <option value="Flexible / Discussion">Flexible / To be estimated</option>
          <option value="₹50,000 - ₹1,50,000">₹50,000 - ₹1,50,000 (Sprint Starter)</option>
          <option value="₹1,50,000 - ₹3,00,000">₹1,50,000 - ₹3,00,000 (MVP Launch)</option>
          <option value="₹3,00,000 - ₹6,00,000">₹3,00,000 - ₹6,00,000 (Full Production)</option>
          <option value="₹6,00,000+ / Retainer">₹6,00,000+ or Monthly Retainer</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-neu-textSec">
          Target Timeline
        </label>
        <select
          name="timeline"
          defaultValue="As soon as possible"
          className="w-full rounded-xl neu-recessed px-4 py-3 text-sm text-neu-text focus:outline-none focus:ring-2 focus:ring-neu-purple"
        >
          <option value="As soon as possible">Immediate sprint (ASAP)</option>
          <option value="1–2 months">Within 1–2 months</option>
          <option value="3–6 months">Within 3–6 months</option>
          <option value="Exploring for later">Exploring / Budget planning</option>
        </select>
      </div>

      <NeuTextarea
        label="Tell Us About The Project *"
        name="message"
        rows={4}
        required
        minLength={10}
        maxLength={1500}
        placeholder="Briefly describe what you are building, the problem you are solving, and any relevant links..."
        containerClassName="sm:col-span-2"
      />

      {error && (
        <div role="alert" className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-bold sm:col-span-2">
          {error}
        </div>
      )}

      <div className="sm:col-span-2 pt-2">
        <NeuButton
          type="submit"
          disabled={loading}
          variant="purple"
          size="lg"
          icon={<AiOutlineWhatsApp size={18} />}
          className="w-full justify-center shadow-lg"
        >
          {loading ? 'Preparing WhatsApp...' : 'Continue on WhatsApp →'}
        </NeuButton>

        <p className="text-center text-xs text-neu-textSec mt-3">
          Your inquiry is securely recorded in our CRM and opened as a prefilled chat with our technical leadership.
        </p>
      </div>
    </form>
  );
}
