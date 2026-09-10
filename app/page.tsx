import type { Metadata } from "next";
import { GalleryFrame } from "@/components/GalleryFrame";
import { getRandomImage } from "@/lib/image-manifest";

export const metadata: Metadata = {
  title: {
    absolute: "Eric Hancock | Software Engineering | New York",
  },
  description:
    "Personal site for Eric Hancock in Brooklyn, NY, with software work, photography, and contact information.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Eric Hancock | Software Engineering | New York",
    description:
      "Personal site for Eric Hancock in Brooklyn, NY, with software work, photography, and contact information.",
    url: "/",
  },
};

export default function Home() {
  const initialImage = getRandomImage();

  return (
    <section className="home-minimal" aria-labelledby="home-heading">
      <div className="home-intro">
        <h1 id="home-heading">
          Eric Hancock | Software Engineering | New York
        </h1>
        <p>Brooklyn, NY / Financial systems / Payments / Distributed systems</p>
      </div>
      <GalleryFrame initialImage={initialImage} />
    </section>
  );
}
