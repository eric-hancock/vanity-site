import type { Metadata } from "next";
import { GalleryFrame } from "@/components/GalleryFrame";
import { getRandomImage } from "@/lib/image-manifest";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Eric Hancock builds reliable financial systems and leads distributed teams.",
};

export default function Home() {
  const initialImage = getRandomImage();

  return (
    <section className="home-minimal" aria-labelledby="home-heading">
      <div className="home-intro">
        <h1 id="home-heading">
          Building reliable financial systems and leading distributed teams.
        </h1>
      </div>
      <GalleryFrame initialImage={initialImage} />
    </section>
  );
}
