export default function Footer() {
  return (
    <footer className="relative mt-12 px-6 md:px-10 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="divider-glow mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60 font-display tracking-[0.2em] uppercase">
          <div>
            © {new Date().getFullYear()} · Miguel Angel Briseño Flores
          </div>
          <div className="flex items-center gap-2 text-glow-ice/70">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-glow-cyan animate-pulse" />
            Hosted at miguelabf-devops.com
          </div>
        </div>
      </div>
    </footer>
  );
}
