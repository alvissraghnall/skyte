export function Footer() {
  return (
    <footer className="bg-background text-on-surface-variant font-hanken text-label-sm py-8 border-t border-white/5 opacity-80 hover:opacity-100 transition-opacity w-full mt-auto px-margin-page flex justify-between items-center z-10">
      <div>&copy; 2026 SKYTE. Not affiliated with Spotify AB.</div>
      <nav className="flex gap-6">
        <a className="hover:text-primary transition-colors" href="#">
          Privacy Policy
        </a>
        <a className="hover:text-primary transition-colors" href="#">
          Terms of Service
        </a>
        <a className="hover:text-primary transition-colors" href="#">
          API Documentation
        </a>
      </nav>
    </footer>
  );
}
