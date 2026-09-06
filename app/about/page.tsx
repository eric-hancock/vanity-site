import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Background, current practice, and approach behind the work.",
};

export default function AboutPage() {
  return (
    <section className="page-stack" aria-labelledby="about-heading">
      <p className="home-kicker">About</p>
      <h1 id="about-heading">A quiet practice of noticing and collecting frames.</h1>
      <p>
        I make photographs, keep notes, and document scenes that feel brief,
        tender, or strange. This site is an evolving archive where one random
        image appears at a time, emphasizing pace over volume.
      </p>
      <p>
        The work moves between city textures, chance encounters, and ordinary
        gestures that become meaningful when held still. I prefer minimal edits,
        natural light, and strong composition over heavy post-processing.
      </p>

      <section className="about-grid" aria-label="Practice highlights">
        <article className="about-card">
          <h2>Current focus</h2>
          <p>
            Street-level studies of architecture, signage, and social traces.
            Ongoing sequencing work explores contrast between crowded and empty
            public space.
          </p>
        </article>

        <article className="about-card">
          <h2>Approach</h2>
          <p>
            Observe slowly, shoot deliberately, and keep the final presentation
            simple. The frame should carry the feeling without visual noise.
          </p>
        </article>

        <article className="about-card">
          <h2>Now</h2>
          <p>
            Building this space as a lightweight, standards-first site on
            Cloudflare with an R2-backed image library and minimal interface.
          </p>
        </article>
      </section>
    </section>
  );
}
