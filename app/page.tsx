import type { Metadata } from "next";
import Link from "next/link";
import { GalleryFrame } from "@/components/GalleryFrame";
import { getRandomImage } from "@/lib/image-manifest";

export const metadata: Metadata = {
  title: "Home",
  description:
    "A minimal, progressively enhanced gallery showing one random image from the archive.",
};

export default function Home() {
  const initialImage = getRandomImage();

  return (
    <section className="home-grid" aria-labelledby="home-heading">
      <div className="home-copy">
        <p className="home-kicker">Personal Archive</p>
        <h1 id="home-heading">A random frame from the ongoing image archive.</h1>
        <p>
          The first image is server-rendered for a standards-friendly baseline.
          JavaScript progressively enhances the page with in-place random
          refresh and prefetching.
        </p>
        <div className="home-actions">
          <Link href="/about" className="button button-solid">
            About
          </Link>
          <Link href="/contact" className="button button-ghost">
            Contact
          </Link>
        </div>
      </div>

      <GalleryFrame initialImage={initialImage} />
    </section>
  );
}
