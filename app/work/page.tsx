import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected engineering themes and portfolio notes.",
};

export default function WorkPage() {
  return (
    <section className="profile-page" aria-labelledby="work-heading">
      <div className="page-hero">
        <p className="home-kicker">Work</p>
        <h1 id="work-heading">Selected work, systems, and operating themes.</h1>
        <p>
          A place for engineering work that benefits from context: technical
          leadership, system evolution, reliability practice, and the judgment
          behind trade-offs.
        </p>
      </div>

      <section className="profile-section" aria-labelledby="work-shape-heading">
        <h2 id="work-shape-heading">Working Areas</h2>
        <div className="focus-list">
          <article>
            <h3>Engineering leadership</h3>
            <p>
              Team direction, delivery strategy, mentoring, stakeholder
              alignment, and practical execution under operational constraints.
            </p>
          </article>

          <article>
            <h3>Distributed platforms</h3>
            <p>
              Service boundaries, asynchronous workflows, resilient operations,
              performance tuning, and measurable reliability improvements.
            </p>
          </article>

          <article>
            <h3>Photography archive</h3>
            <p>
              A long-running visual record of objects, streets, weather,
              signage, interiors, and small public moments.
            </p>
          </article>
        </div>
      </section>
    </section>
  );
}
