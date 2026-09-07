import type { Metadata } from "next";
import { GalleryFrame } from "@/components/GalleryFrame";
import { getRandomImage } from "@/lib/image-manifest";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Eric Hancock: engineering leadership, distributed systems, and photography.",
};

export default function Home() {
  const initialImage = getRandomImage();

  return (
    <section className="home-minimal" aria-labelledby="home-heading">
      <div className="home-intro">
        <h1 id="home-heading">
          Engineering leadership, distributed systems, photography.
        </h1>
      </div>
      <GalleryFrame initialImage={initialImage} />
    </section>
  );
}
