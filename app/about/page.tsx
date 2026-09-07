import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Background, current practice, and approach behind the work.",
};

export default function AboutPage() {
  return (
    <section className="page-stack" aria-labelledby="about-heading">
      <p className="home-kicker">About</p>
      <h1 id="about-heading">Software engineer based in New York, NY.</h1>
      <p>
        I lead engineering teams building high-throughput distributed systems
        for the financial sector, across both on-prem infrastructure and AWS.
        Day to day, I balance technical strategy and execution: setting service
        direction, mentoring engineers, and driving delivery against strict
        latency, uptime, and operational risk constraints.
      </p>
      <p>
        I partner with product, operations, and business stakeholders
        to translate priorities into clear plans, trade-offs, and
        milestones. I am most effective in roles where I can represent
        engineering in high-visibility conversations while helping teams ship
        resilient systems with measurable business impact.
      </p>

      <section className="about-grid" aria-label="Practice highlights">
        <article className="about-card">
          <h2>Distributed systems</h2>
          <p>
            I design and tune microservice ecosystems for throughput, fault
            tolerance, and maintainability. My focus includes service
            boundaries, asynchronous workflows, resilience patterns, and
            pragmatic SLO-driven operations that improve reliability at scale.
          </p>
        </article>

        <article className="about-card">
          <h2>Financial domain focus</h2>
          <p>
            In financial systems, correctness and reliability are non-negotiable.
            I emphasize clear contracts, verifiable data flows, and controlled
            delivery practices that hold up in regulated, high-stakes
            environments where auditability and predictability matter.
          </p>
        </article>

        <article className="about-card">
          <h2>Outside engineering</h2>
          <p>
            I am deeply interested in literature, music, science, and photography. Those
            interests reflect a broader generalist background across arts,
            entertainment, and finance. Bringing those perspectives together
            helps me communicate across disciplines, adapt quickly to context,
            and make practical decisions that are both technically sound and
            aligned with business goals.
          </p>
        </article>
      </section>
    </section>
  );
}
