import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Eric Hancock",
  description:
    "Background and current practice for Eric Hancock, a Brooklyn, NY software engineering leader working across financial systems and distributed teams.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Eric Hancock",
    description:
      "Background and current practice for Eric Hancock, a Brooklyn, NY software engineering leader working across financial systems and distributed teams.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <section className="profile-page" aria-labelledby="about-heading">
      <div className="page-hero">
        <p className="home-kicker">About</p>
        <h1 id="about-heading">
          Eric Hancock is a software engineering leader based in Brooklyn, NY.
        </h1>
        <p>
          I lead engineering teams building high-throughput systems for
          financial services, across both on-prem Unix environments and AWS.
          Day to day, I balance technical strategy and execution: setting
          service direction, mentoring engineers, and driving delivery against
          strict correctness, latency, uptime, and operational risk constraints.
        </p>
      </div>

      <section className="profile-section" aria-labelledby="career-heading">
        <h2 id="career-heading">Career Arc</h2>
        <div className="profile-copy">
          <p>
            My career started in entertainment rights management software, where
            I spent a decade building systems around ownership, licensing, and
            operational workflows. For more than twenty years since, I have
            worked in finance, leading teams and building systems where
            correctness, auditability, resilience, and clear delivery matter.
          </p>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="leadership-heading">
        <h2 id="leadership-heading">Leadership Practice</h2>
        <div className="profile-copy">
          <p>
            I partner with product, operations, and business stakeholders to
            translate priorities into clear plans, trade-offs, and milestones. I
            have worked with globally distributed teams and am most effective in
            roles where I can represent engineering in high-visibility
            conversations while helping teams ship resilient systems with
            measurable business impact.
          </p>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="focus-heading">
        <h2 id="focus-heading">Focus Areas</h2>
        <div className="focus-list">
          <article>
            <h3>Distributed systems</h3>
            <p>
              I design and tune distributed systems for throughput, fault
              tolerance, and maintainability. My focus includes service
              boundaries, asynchronous workflows, observability, resilience
              patterns, and pragmatic operations that improve reliability at
              scale.
            </p>
          </article>

          <article>
            <h3>Financial domain focus</h3>
            <p>
              In financial systems, correctness and reliability are
              non-negotiable. I have worked across derivative confirmation,
              payments, and risk systems, emphasizing clear contracts,
              verifiable data flows, and controlled delivery practices.
            </p>
          </article>

          <article>
            <h3>Outside engineering</h3>
            <p>
              I am deeply interested in literature, music, science, and
              photography. Those interests reflect a broader generalist
              background across arts, entertainment, and finance, and they shape
              how I communicate across disciplines and adapt to context.
            </p>
          </article>
        </div>
      </section>
    </section>
  );
}
