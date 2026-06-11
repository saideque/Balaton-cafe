export default function NotFound() {
  return (
    <main className="flex min-h-[70svh] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-7xl font-extrabold text-forest">404</p>
      <p className="mt-4 max-w-[40ch] text-ink-soft">
        Balaton<span className="text-gold">.</span> — strona nie istnieje · page not
        found.
      </p>
      <a
        href="/"
        className="u-pill mt-8 bg-forest text-cream hover:bg-forest-deep"
      >
        ← Balaton Cafe
      </a>
    </main>
  );
}
