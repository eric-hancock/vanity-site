import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work by Eric Hancock",
  description:
    "Eric Hancock's engineering work across financial systems, payments, platforms, and distributed teams in Brooklyn, NY and New York.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work by Eric Hancock",
    description:
      "Eric Hancock's engineering work across financial systems, payments, platforms, and distributed teams in Brooklyn, NY and New York.",
    url: "/work",
  },
};

export default function WorkPage() {
  return (
    <section className="profile-page" aria-labelledby="work-heading">
      <div className="page-hero">
        <p className="home-kicker">Work</p>
        <h1 id="work-heading">
          Eric Hancock&apos;s engineering work spans financial systems, payments,
          and distributed teams.
        </h1>
        <p>
          My work sits where software architecture, operational risk, and
          cross-functional delivery meet: financial platforms, payment systems,
          risk workflows, and teams that need steady execution across locations
          and time zones.
        </p>
      </div>

      <section className="profile-section" aria-labelledby="domains-heading">
        <h2 id="domains-heading">Domains</h2>
        <div className="focus-list">
          <article>
            <h3>Financial systems</h3>
            <p>
              More than twenty years in finance, including cross-asset
              derivative confirmation, payment systems, and risk systems where
              correctness, auditability, and operational reliability are central.
            </p>
          </article>

          <article>
            <h3>Payments</h3>
            <p>
              Experience with both consumer-facing and institutional payment
              systems, balancing throughput, resilience, stakeholder needs, and
              the practical realities of production operations.
            </p>
          </article>

          <article>
            <h3>Rights management</h3>
            <p>
              Ten years in entertainment rights management software, building
              systems around ownership, licensing, workflow, and operational
              data for media businesses.
            </p>
          </article>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="technical-heading">
        <h2 id="technical-heading">Technical Range</h2>
        <div className="focus-list">
          <article>
            <h3>Languages and platforms</h3>
            <p>
              Long-running production experience across Java, C#, and Python,
              with a strong on-prem Unix foundation and modern AWS work using
              CDK.
            </p>
          </article>

          <article>
            <h3>Distributed architecture</h3>
            <p>
              Service boundaries, asynchronous workflows, performance tuning,
              fault tolerance, data flow design, and production hardening for
              systems that need to hold up under real operational pressure.
            </p>
          </article>

          <article>
            <h3>Observability and operations</h3>
            <p>
              Reliability work grounded in useful telemetry, clear service
              ownership, incident learning, measurable behavior, and practical
              operational controls.
            </p>
          </article>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="delivery-heading">
        <h2 id="delivery-heading">Leadership & Delivery</h2>
        <div className="focus-list">
          <article>
            <h3>Distributed teams</h3>
            <p>
              Leading globally distributed engineering groups through planning,
              execution, delivery risk, and coordination across time zones and
              organizational boundaries.
            </p>
          </article>

          <article>
            <h3>Agile execution</h3>
            <p>
              Agile project management, sprint planning, scrum management,
              prioritization, and translating open-ended business goals into
              clear engineering milestones.
            </p>
          </article>

          <article>
            <h3>Stakeholder alignment</h3>
            <p>
              Partnering with product, operations, and business stakeholders to
              make trade-offs explicit, keep delivery grounded, and represent
              engineering clearly in high-visibility settings.
            </p>
          </article>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="useful-heading">
        <h2 id="useful-heading">Useful In</h2>
        <div className="profile-copy">
          <p>
            I am especially useful in environments where technical systems,
            operational risk, and cross-functional delivery all matter at once:
            financial platforms, payment systems, regulated workflows,
            reliability programs, and teams that need clear execution across
            multiple locations.
          </p>
        </div>
      </section>
    </section>
  );
}
