import JobSeekerPortalScaffold from "./JobSeekerPortalScaffold";

function JobSeekerProfile() {
  return (
    <JobSeekerPortalScaffold activePage="profile">
      <section>
        <h1 className="section-title">Profile</h1>
        <p className="section-subtitle">Review and update your job seeker information.</p>

        <div className="job-search-hero" style={{ paddingTop: 24 }}>
          <div className="jobseeker-metrics" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
            <article className="metric-card">
              <p>Name</p>
              <h2>Mary Johnson</h2>
            </article>
            <article className="metric-card">
              <p>Email</p>
              <h2>mary.johnson@email.com</h2>
            </article>
          </div>

          <div className="applications-panel" style={{ marginTop: 16 }}>
            <h2>About</h2>
            <p style={{ margin: 0, color: "#334155", lineHeight: 1.7 }}>
              Job seeker profile placeholder. This page is now reachable from the sidebar and can be expanded with editable profile fields.
            </p>
          </div>
        </div>
      </section>
    </JobSeekerPortalScaffold>
  );
}

export default JobSeekerProfile;
