export function Logo({ className }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <span
        aria-hidden
        className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M14 3c-3 1-5 3.5-5 6.5 0 1.2.3 2.2.8 3" strokeLinecap="round" />
          <path d="M9.8 12.5C7.5 13.5 6 15.6 6 18v3h9c3.3 0 6-2.7 6-6 0-2.3-1.3-4.3-3.2-5.3" strokeLinecap="round" />
          <path d="M13 21c0-3 1.5-5.5 4-7" strokeLinecap="round" />
        </svg>
      </span>
      <span className="font-display text-xl leading-none tracking-tight">
        Ekorrit <span className="text-muted-foreground">AB</span>
      </span>
    </span>
  );
}
