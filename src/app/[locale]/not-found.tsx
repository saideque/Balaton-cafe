export default function NotFound() {
  return (
    <main className="flex min-h-[70svh] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-7xl text-terracotta">404</p>
      <p className="mt-4 max-w-[40ch] text-ink-soft">
        Balaton<span className="text-terracotta">.</span> — strona nie istnieje · page not
        found.
      </p>
      <a
        href="/"
        className="mt-8 rounded-full border border-ink px-6 py-3 text-sm text-ink transition-colors hover:bg-ink hover:text-paper"
      >
        ← Balaton Cafe
      </a>
    </main>
  );
}
