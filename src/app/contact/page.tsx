export default function ContactPage() {
  return (
    <main className="site-page min-h-screen py-10 px-6 text-ink">
      <div className="mx-auto max-w-5xl space-y-10">
        <section className="rounded-3xl bg-white p-10 shadow-sm shadow-slate-200/50">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Contact</p>
          <h1 className="mt-4 text-4xl font-bold">Start your next project</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
            Share your idea, timeline, and budget. White Rabbit will help qualify your request and send it to the BITnWIT team.
          </p>
        </section>

        <section className="rounded-3xl bg-white p-10 shadow-sm shadow-slate-200/50">
          <form className="grid gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700">
                Name
              </label>
              <input id="name" name="name" type="text" required className="mt-2 w-full rounded-3xl border border-line bg-cloud px-4 py-3 text-ink focus:border-rabbit focus:outline-none focus:ring-2 focus:ring-rabbit/20" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                Email
              </label>
              <input id="email" name="email" type="email" required className="mt-2 w-full rounded-3xl border border-line bg-cloud px-4 py-3 text-ink focus:border-rabbit focus:outline-none focus:ring-2 focus:ring-rabbit/20" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-slate-700">
                Tell us about your project
              </label>
              <textarea id="message" name="message" rows={6} required className="mt-2 w-full rounded-3xl border border-line bg-cloud px-4 py-3 text-ink focus:border-rabbit focus:outline-none focus:ring-2 focus:ring-rabbit/20" />
            </div>
            <button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-rabbit px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rabbit/20 transition hover:bg-blue-600">
              Send message
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
