import type { Metadata } from "next";
import { GalleryFrame } from "@/components/GalleryFrame";
import { getRandomImage } from "@/lib/image-manifest";

export const metadata: Metadata = {
  title: "Home",
  description: "A minimal, progressively enhanced random image gallery.",
};

export default function Home() {
  const initialImage = getRandomImage();

  return (
    <section className="home-minimal" aria-labelledby="home-heading">
      <h1 id="home-heading" className="visually-hidden">
        Random gallery
      </h1>
      <GalleryFrame initialImage={initialImage} />
    </section>
  );
}
