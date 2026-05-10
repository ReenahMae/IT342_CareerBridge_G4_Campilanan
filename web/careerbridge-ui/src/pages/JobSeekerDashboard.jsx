import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobSeekerPortalScaffold from "./JobSeekerPortalScaffold";
import "./JobSeekerDashboard.css";
import { useEffect } from "react";
import { getJobs } from "../services/jobService";


const jobBadgePalette = [
  "#000000",
  "#0ea5a4",
  "#e6469a",
  "#000000",
  "#7c3aed",
  "#f59e0b",
  "#ef4444",
  "#16a34a"
];

function statusClass(status) {
  const normalized = (status || "").toLowerCase();
  if (normalized === "interview") return "status-chip interview";
  if (normalized === "reviewed") return "status-chip reviewed";
  if (normalized === "pending") return "status-chip pending";
  return "status-chip rejected";
}

function jobPillClass(text) {
  const normalized = (text || "").toLowerCase();
  if (normalized.includes("full") || normalized.includes("part")) return "job-pill job-pill-type";
  return "job-pill job-pill-category";
}

function jobBadgeColor(jobId) {
  return jobBadgePalette[(jobId - 1) % jobBadgePalette.length];
}

function JobSeekerDashboard() {
  const navigate = useNavigate();
  const [jobSeekerActivePage, setJobSeekerActivePage] = useState("jobs");
  const [jobSeekerViewType, setJobSeekerViewType] = useState("grid");
  const [jobSeekerSearchText, setJobSeekerSearchText] = useState("");
  const [jobSeekerLocationText, setJobSeekerLocationText] = useState("");
  const [jobs, setJobs] = useState([]);
  const recentApplications = [];

  useEffect(() => {
  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  fetchJobs();
  }, []); 

  const visibleJobs = useMemo(() => {
    const roleQuery = jobSeekerSearchText.trim().toLowerCase();
    const locationQuery = jobSeekerLocationText.trim().toLowerCase();

    return jobs.filter((job) => {
  const matchesRole =
    roleQuery.length === 0 ||
    (job.role || "").toLowerCase().includes(roleQuery) ||
    (job.company || "").toLowerCase().includes(roleQuery) ||
    (job.category || "").toLowerCase().includes(roleQuery);

  const matchesLocation =
    locationQuery.length === 0 ||
    (job.location || "").toLowerCase().includes(locationQuery);

  return matchesRole && matchesLocation;
});
}, [jobs, jobSeekerSearchText, jobSeekerLocationText]);

  return (
    <JobSeekerPortalScaffold
      activePage={jobSeekerActivePage}
      onPageChange={(page) => {
        if (page === "dashboard" || page === "jobs") {
          setJobSeekerActivePage(page);
          return;
        }

        setJobSeekerActivePage("jobs");
      }}
    >
      {jobSeekerActivePage === "dashboard" && (
        <section>
          <h1 className="section-title">Dashboard</h1>
          <p className="section-subtitle">Welcome back, Alex! Here&apos;s your job search overview.</p>

          <div className="jobseeker-metrics">
            <article className="metric-card">
              <p>Applications Sent</p>
              <h2>5</h2>
            </article>
            <article className="metric-card">
              <p>Interviews Scheduled</p>
              <h2>1</h2>
            </article>
            <article className="metric-card">
              <p>Saved Jobs</p>
              <h2>3</h2>
            </article>
          </div>

          <section className="applications-panel">
            <h2>Recent Applications</h2>
            <div className="applications-table-wrap">
              <table className="applications-table">
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Date Applied</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentApplications.length === 0 && (
                    <tr>
                      <td colSpan={5}>No recent applications yet.</td>
                    </tr>
                  )}
                  {recentApplications.map((item) => (
                    <tr key={`${item.role}-${item.date}`}>
                      <td>{item.role}</td>
                      <td>{item.company}</td>
                      <td>{item.date}</td>
                      <td>
                        <span className={statusClass(item.status)}>{item.status}</span>
                      </td>
                      <td>
                        <button type="button" className="table-action">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      )}

      {jobSeekerActivePage === "jobs" && (
        <section>
          <div className="job-search-hero">
            <h1 className="section-title">Find Your Dream Job</h1>
            <p className="section-subtitle">Discover opportunities that match your passion</p>

            <div className="search-row">
              <input
                type="text"
                placeholder="Job title, company, or keywords"
                value={jobSeekerSearchText}
                onChange={(event) => setJobSeekerSearchText(event.target.value)}
              />
              <input
                type="text"
                placeholder="Location"
                value={jobSeekerLocationText}
                onChange={(event) => setJobSeekerLocationText(event.target.value)}
              />
              <button type="button">Search Jobs</button>
            </div>
          </div>

          <div className="jobs-content-row">
            <aside className="jobs-filter-panel">
              <div className="jobs-filter-card">
                <div className="filter-header-row">
                  <h2>Filter Jobs</h2>
                  <button type="button" className="clear-btn">
                    Clear All
                  </button>
                </div>

                <div className="filter-group">
                  <h3>Job Type</h3>
                  <label><input type="checkbox" /> Remote</label>
                  <label><input type="checkbox" /> Full-Time</label>
                  <label><input type="checkbox" /> Part-Time</label>
                  <label><input type="checkbox" /> Contract</label>
                  <label><input type="checkbox" /> Internship</label>
                </div>

                <div className="filter-group">
                  <h3>Salary Range</h3>
                  <div className="salary-row">
                    <input type="number" placeholder="Min" />
                    <input type="number" placeholder="Max" />
                  </div>
                </div>

                <div className="filter-group">
                  <h3>Category</h3>
                  <label><input type="checkbox" /> Engineering</label>
                  <label><input type="checkbox" /> Design</label>
                  <label><input type="checkbox" /> Marketing</label>
                  <label><input type="checkbox" /> Sales</label>
                  <label><input type="checkbox" /> Customer-service</label>
                  <label><input type="checkbox" /> Product</label>
                  <label><input type="checkbox" /> Human Resources</label>
                </div>
              </div>
            </aside>

            <section className="jobs-list-section">
              <div className="jobs-list-header">
                <p className="jobs-count-label">
                  Showing <strong>{visibleJobs.length}</strong> jobs
                </p>
                <div className="view-toggle">
                  <button
                    type="button"
                    className={jobSeekerViewType === "grid" ? "toggle-btn active" : "toggle-btn"}
                    onClick={() => setJobSeekerViewType("grid")}
                    aria-label="Grid view"
                    title="Grid view"
                  >
                    <span className="toggle-icon" aria-hidden="true">▦</span>
                  </button>
                  <button
                    type="button"
                    className={jobSeekerViewType === "list" ? "toggle-btn active" : "toggle-btn"}
                    onClick={() => setJobSeekerViewType("list")}
                    aria-label="List view"
                    title="List view"
                  >
                    <span className="toggle-icon" aria-hidden="true">☰</span>
                  </button>
                </div>
              </div>

              <div className={jobSeekerViewType === "grid" ? "jobs-grid" : "jobs-list"}>
                {visibleJobs.length === 0 && (
                  <div className="jobs-empty-state">
                    <h3>No jobs found</h3>
                    <p>Try changing your keyword or location filters.</p>
                  </div>
                )}

                {visibleJobs.map((job) => (
                  <article
                    key={job.id}
                    className={jobSeekerViewType === "grid" ? "job-card" : "job-card list-card"}
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        navigate(`/jobs/${job.id}`);
                      }
                    }}
                  >
                    {jobSeekerViewType === "grid" ? (
                      <>
                        <div className="job-card-top">
                          <div className="job-logo" style={{ backgroundColor: jobBadgeColor(job.id) }}>
                            {job.badge}
                          </div>
                          <div className="job-heading">
                            <h3>{job.role}</h3>
                            <p>{job.company}</p>
                          </div>
                          <button type="button" className="bookmark-btn" aria-label="Save job">
                            +
                          </button>
                        </div>

                        <div className="job-meta-row">
                          <span>{job.location}</span>
                          <span className={jobPillClass(job.type)}>{job.type}</span>
                          <span className={jobPillClass(job.category)}>{job.category}</span>
                        </div>

                        <p className="job-date">{job.date}</p>

                        <div className="job-footer">
                          <strong>{job.salary}</strong>
                          {job.status && <span className="job-status">{job.status}</span>}
                          {job.action && (
                            <button type="button" className="apply-btn">
                              {job.action}
                            </button>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="list-card-main">
                          <div className="job-logo" style={{ backgroundColor: jobBadgeColor(job.id) }}>
                            {job.badge}
                          </div>
                          <div className="list-card-copy">
                            <h3>{job.role}</h3>
                            <p className="list-company">{job.company}</p>
                            <div className="job-meta-row list-meta-row">
                              <span>{job.location}</span>
                              <span className={jobPillClass(job.type)}>{job.type}</span>
                              <span className={jobPillClass(job.category)}>{job.category}</span>
                            </div>
                            <p className="list-date">{job.date}</p>
                          </div>
                        </div>

                        <div className="list-card-actions">
                          <button type="button" className="bookmark-btn" aria-label="Save job">
                            +
                          </button>
                          <strong className="list-salary">{job.salary}</strong>
                          {job.status && <span className="job-status">{job.status}</span>}
                          {job.action && (
                            <button type="button" className="apply-btn">
                              {job.action}
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>
      )}
    </JobSeekerPortalScaffold>
  );
}

export default JobSeekerDashboard;
