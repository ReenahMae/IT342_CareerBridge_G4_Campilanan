import JobSeekerPortalScaffold from "./JobSeekerPortalScaffold";

function JobSeekerApplications() {
  return (
    <JobSeekerPortalScaffold activePage="applications">
      <section>
        <h1 className="section-title">Applications</h1>
        <p className="section-subtitle">Track the jobs you have applied for.</p>

        <div className="job-search-hero" style={{ paddingTop: 24 }}>
          <div className="applications-panel" style={{ marginTop: 0 }}>
            <h2>Recent Applications</h2>
            <p style={{ margin: 0, color: "#334155", lineHeight: 1.7 }}>
              Applications page placeholder. Use this screen to show submitted jobs, statuses, and follow-up actions.
            </p>
          </div>
        </div>
      </section>
    </JobSeekerPortalScaffold>
  );
}

export default JobSeekerApplications;
