export default function AboutPage() {
  return (
    <main className="site-page min-h-screen py-10 px-6 text-ink">
      <div className="mx-auto max-w-5xl space-y-10">
        <section className="rounded-3xl bg-white p-10 shadow-sm shadow-slate-200/50">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">About BITnWIT</p>
          <h1 className="mt-4 text-4xl font-bold">Building Intelligence Through Technology</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
            BITnWIT is a creative technology studio focused on digital marketing, product development, app experiences, UI/UX design, SEO, and brand strategy.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-line bg-cloud p-6">
              <h2 className="text-xl font-semibold">Our mission</h2>
              <p className="mt-3 text-slate-700 leading-7">
                Help small teams and solo founders launch polished digital products without the overhead of big agencies.
              </p>
            </div>
            <div className="rounded-3xl border border-line bg-cloud p-6">
              <h2 className="text-xl font-semibold">Our personality</h2>
              <p className="mt-3 text-slate-700 leading-7">
                Confident, friendly, clever — delivered through strong design, thoughtful code, and the White Rabbit mascot.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-10 shadow-sm shadow-slate-200/50">
          <h2 className="text-2xl font-bold">Meet White Rabbit</h2>
          <p className="mt-4 text-slate-700 leading-7">
            White Rabbit is our mascot and voice. Tech-savvy, precise, and a little playful, the rabbit guides users through the site, especially in AI interactions and support flows.
          </p>
        </section>
      </div>
    </main>
  );
}
