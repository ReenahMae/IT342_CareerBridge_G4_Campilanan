import JobSeekerPortalScaffold from "./JobSeekerPortalScaffold";

function JobSeekerCompanies() {
  return (
    <JobSeekerPortalScaffold activePage="companies">
      <section>
        <h1 className="section-title">Companies</h1>
        <p className="section-subtitle">Browse companies and explore opportunities.</p>

        <div className="job-search-hero" style={{ paddingTop: 24 }}>
          <div className="applications-panel" style={{ marginTop: 0 }}>
            <h2>Featured Companies</h2>
            <p style={{ margin: 0, color: "#334155", lineHeight: 1.7 }}>
              Companies page placeholder. You can later add a company list, logos, and detail pages here.
            </p>
          </div>
        </div>
      </section>
    </JobSeekerPortalScaffold>
  );
}

export default JobSeekerCompanies;
