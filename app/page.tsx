import type { Metadata } from "next";
import { GalleryFrame } from "@/components/GalleryFrame";
import { getRandomImage } from "@/lib/image-manifest";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Eric Hancock builds and leads reliable financial systems with distributed teams.",
};

export default function Home() {
  const initialImage = getRandomImage();

  return (
    <section className="home-minimal" aria-labelledby="home-heading">
      <div className="home-intro">
        <h1 id="home-heading">
          Building and leading reliable financial systems with distributed teams.
        </h1>
      </div>
      <GalleryFrame initialImage={initialImage} />
    </section>
  );
}
