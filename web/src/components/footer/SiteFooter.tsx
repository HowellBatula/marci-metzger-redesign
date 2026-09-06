import { SOCIAL_LINKS } from "@/lib/social-links";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-on-dark">
      <div className="container flex flex-col items-center gap-6 py-10 text-center md:flex-row md:justify-between md:text-left">
        <p className="text-sm">Marci Metzger Homes</p>
        <div className="flex gap-5">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener"
              className="text-xs tracking-[0.14em] text-on-dark-muted uppercase hover:text-on-dark"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-xs text-on-dark-muted">
          Copyright &copy; {year} Marci Metzger — All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
