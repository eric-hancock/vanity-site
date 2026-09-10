import type { Metadata } from "next";
import { GalleryFrame } from "@/components/GalleryFrame";
import { getRandomImage } from "@/lib/image-manifest";

export const metadata: Metadata = {
  title: {
    absolute: "Eric Hancock | Brooklyn, NY Software Engineer",
  },
  description:
    "Eric Hancock is a Brooklyn, NY software engineering leader building reliable financial systems, payment platforms, and distributed teams.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Eric Hancock | Brooklyn, NY Software Engineer",
    description:
      "Eric Hancock is a Brooklyn, NY software engineering leader building reliable financial systems, payment platforms, and distributed teams.",
    url: "/",
  },
};

export default function Home() {
  const initialImage = getRandomImage();

  return (
    <section className="home-minimal" aria-labelledby="home-heading">
      <div className="home-intro">
        <h1 id="home-heading">
          Eric Hancock is a Brooklyn, NY software engineering leader building
          reliable financial systems and distributed teams.
        </h1>
      </div>
      <GalleryFrame initialImage={initialImage} />
    </section>
  );
}
