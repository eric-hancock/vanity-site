import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="site-title">
        Vanity Site
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/about" className="nav-link">
          About
        </Link>
        <Link href="/contact" className="nav-link">
          Contact
        </Link>
      </nav>
    </header>
  );
}
