import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JobSeekerPortalScaffold from "./JobSeekerPortalScaffold";
import { getJobById, applyJob } from "../services/jobService";

function JobSeekerJobDetails() {
  const navigate = useNavigate();
  const { jobId } = useParams();

  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [saved, setSaved] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const normalizeJob = (rawJob) => {
    if (!rawJob) return null;
    return {
  id: rawJob.id,

  role: rawJob.role ?? rawJob.title ?? "Untitled Role",

  company: rawJob.company ?? "Unknown Company",

  location: rawJob.location ?? "Location not specified",

  salary: rawJob.salary ?? "",

  summary:
    rawJob.summary ??
    rawJob.description ??
    "No job description available.",

  requirements: Array.isArray(rawJob.requirements)
    ? rawJob.requirements
    : [],

  type: rawJob.type ?? "Not specified",

  status: rawJob.status ?? "Open",

  applicants: rawJob.applicants ?? 0,

  postedDate:
    rawJob.postedDate ??
    rawJob.posted_date ??
    "Recently posted",

  deadline:
    rawJob.deadline ??
    "No deadline",

  experienceLevel:
    rawJob.experienceLevel ??
    "Not specified",
};
  };

  useEffect(() => {
    let isMounted = true;
    const loadJob = async () => {
      setIsLoading(true);
      setLoadError("");
      try {
        const data = await getJobById(jobId);
        if (!isMounted) return;
        const normalized = normalizeJob(data);
        if (normalized) setJob(normalized);
        else setLoadError("Job details were not found.");
      } catch {
        if (!isMounted) return;
        setLoadError("Could not load job details. Please try again.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    loadJob();
    return () => { isMounted = false; };
  }, [jobId]);

  const handleApply = async () => {
    if (!resumeFile) { alert("Please upload your resume first."); return; }
    setApplying(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await applyJob(
        job.id,
        resumeFile,
        coverLetter,
        user.id
      );
      setApplied(true);
    } catch {
      alert("Error submitting application. Please try again.");
    } finally {
      setApplying(false);
    }
  };

  const formatSalary = (raw) => {
    if (!raw) return null;
    return String(raw).replace(/^[₱P]+/i, "").trim();
  };

  const pill = (text, bg, color) => (
    <span style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "20px", background: bg, color, fontWeight: 500 }}>
      {text}
    </span>
  );

  const sectionTitle = (text) => (
    <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: "#94a3b8", textTransform: "uppercase", marginBottom: "12px" }}>
      {text}
    </div>
  );

  // ── Loading ──
  if (isLoading) {
    return (
      <JobSeekerPortalScaffold activePage="jobs">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "300px", color: "#94a3b8", fontSize: "14px", gap: "10px" }}>
          <i className="ti ti-loader-2" style={{ fontSize: "20px" }} />
          Loading job details...
        </div>
      </JobSeekerPortalScaffold>
    );
  }

  // ── Error ──
  if (!job) {
    return (
      <JobSeekerPortalScaffold activePage="jobs">
        <div style={{ maxWidth: "500px", margin: "60px auto", textAlign: "center" }}>
          <i className="ti ti-file-x" style={{ fontSize: "40px", color: "#cbd5e1", marginBottom: "12px", display: "block" }} />
          <div style={{ fontSize: "16px", fontWeight: 500, color: "#475569", marginBottom: "8px" }}>Job not found</div>
          <div style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "20px" }}>{loadError}</div>
          <button onClick={() => navigate("/dashboard")}
            style={{ padding: "8px 20px", background: "#0f172a", color: "white", border: "none", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>
            Back to Job Search
          </button>
        </div>
      </JobSeekerPortalScaffold>
    );
  }

  const salaryDisplay = formatSalary(job.salary);

  return (
    <JobSeekerPortalScaffold activePage="jobs">
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 0 48px" }}>

        {/* Back link */}
        <button onClick={() => navigate("/dashboard")}
          style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "transparent", border: "none", color: "#64748b", cursor: "pointer", fontSize: "13px", padding: "0 0 20px", fontWeight: 400 }}>
          <i className="ti ti-arrow-left" style={{ fontSize: "15px" }} />
          Back to Job Search
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "20px", alignItems: "start" }}>

          {/* ── LEFT ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

            {/* Header */}
            <div style={{ background: "white", border: "1px solid #e8edf2", borderRadius: "14px", padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                <div style={{ width: "54px", height: "54px", borderRadius: "12px", background: "#f1f5f9", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: 700, color: "#334155", flexShrink: 0 }}>
                  {(job.company || "").charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                    {job.company}
                    <span style={{ color: "#cbd5e1", margin: "0 4px" }}>·</span>
                    <i className="ti ti-map-pin" style={{ fontSize: "12px" }} />
                    {job.location}
                  </div>
                  <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a", margin: "0 0 12px", lineHeight: 1.3 }}>
                    {job.role}
                  </h1>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {pill(job.status, "#f0fdf4", "#15803d")}
                    {pill(job.type, "#f1f5f9", "#334155")}
                    {pill(job.experienceLevel, "#fef3c7", "#b45309")}
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #f1f5f9" }}>
                {[
                  [
                    {
                      icon: "ti-clock",
                      label: "Posted",
                      value: job.postedDate
                    },

                    {
                      icon: "ti-users",
                      label: "Applicants",
                      value: `${job.applicants} people`
                    },

                    {
                      icon: "ti-calendar",
                      label: "Deadline",
                      value: job.deadline
                    },
                  ],
                ].map(({ icon, label, value }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <i className={`ti ${icon}`} style={{ fontSize: "16px", color: "#64748b" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: "11px", color: "#94a3b8" }}>{label}</div>
                      <div style={{ fontSize: "13px", fontWeight: 500, color: "#1e293b" }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div style={{ background: "white", border: "1px solid #e8edf2", borderRadius: "14px", padding: "24px" }}>
              {sectionTitle("About the Role")}
              <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.8, margin: 0 }}>{job.summary}</p>
            </div>

            {/* Requirements */}
            <div style={{ background: "white", border: "1px solid #e8edf2", borderRadius: "14px", padding: "24px" }}>
              {sectionTitle("Requirements")}
              {job.requirements.length > 0 ? (
                <ul style={{ margin: 0, paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {job.requirements.map((req, idx) => (
                    <li key={idx} style={{ fontSize: "14px", color: "#475569", lineHeight: 1.7 }}>{req}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontSize: "14px", color: "#94a3b8", margin: 0 }}>No specific requirements listed.</p>
              )}
            </div>

            {/* Skills */}
            <div style={{ background: "white", border: "1px solid #e8edf2", borderRadius: "14px", padding: "24px" }}>
              {sectionTitle("Skills & Technologies")}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {["React", "TypeScript", "CSS / Tailwind", "GraphQL", "Jest"].map(skill => (
                  <span key={skill} style={{ padding: "6px 14px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", color: "#475569", fontWeight: 500 }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

            {/* Apply card */}
            <div style={{ background: "white", border: "1px solid #e8edf2", borderRadius: "14px", padding: "20px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", marginBottom: "16px" }}>
                Apply for this role
              </div>

              {/* Resume upload */}
              <div style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "12px", fontWeight: 500, color: "#475569", display: "block", marginBottom: "6px" }}>
                  Resume <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px", border: "1.5px dashed " + (resumeFile ? "#334155" : "#e2e8f0"), borderRadius: "10px", cursor: "pointer", background: resumeFile ? "#f8fafc" : "#fafafa" }}>
                  <i className={`ti ${resumeFile ? "ti-file-check" : "ti-upload"}`} style={{ fontSize: "18px", color: resumeFile ? "#334155" : "#94a3b8" }} />
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 500, color: resumeFile ? "#0f172a" : "#475569" }}>
                      {resumeFile ? resumeFile.name : "Upload your resume"}
                    </div>
                    <div style={{ fontSize: "11px", color: "#94a3b8" }}>PDF, DOC, DOCX · max 10MB</div>
                  </div>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={e => setResumeFile(e.target.files[0])} style={{ display: "none" }} />
                </label>
              </div>

              {/* Cover letter */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "12px", fontWeight: 500, color: "#475569", display: "block", marginBottom: "6px" }}>
                  Cover Letter <span style={{ color: "#94a3b8", fontWeight: 400 }}>(Optional)</span>
                </label>
                <textarea value={coverLetter} onChange={e => setCoverLetter(e.target.value)}
                  placeholder="Briefly introduce yourself and why you're a great fit..."
                  style={{ width: "100%", minHeight: "96px", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "13px", color: "#1e293b", resize: "vertical", outline: "none", lineHeight: 1.6, boxSizing: "border-box", fontFamily: "inherit" }} />
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => setSaved(s => !s)}
                  style={{ width: "40px", height: "40px", border: "1px solid " + (saved ? "#334155" : "#e2e8f0"), borderRadius: "10px", background: saved ? "#f1f5f9" : "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: saved ? "#0f172a" : "#94a3b8" }}>
                  <i className={`ti ${saved ? "ti-bookmark-filled" : "ti-bookmark"}`} style={{ fontSize: "18px" }} />
                </button>
                <button onClick={handleApply} disabled={applying || applied}
                  style={{ flex: 1, padding: "10px", background: applied ? "#f0fdf4" : "#0f172a", color: applied ? "#16a34a" : "white", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 600, cursor: applying || applied ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                  <i className={`ti ${applied ? "ti-circle-check" : "ti-send"}`} style={{ fontSize: "15px" }} />
                  {applied ? "Application Sent!" : applying ? "Submitting..." : "Apply Now"}
                </button>
              </div>
            </div>

            {/* Salary card */}
            {salaryDisplay && (
              <div style={{ background: "#0f172a", borderRadius: "14px", padding: "20px", color: "white" }}>
                <div style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)", marginBottom: "8px" }}>
                  MONTHLY SALARY
                </div>
                <div style={{ fontSize: "24px", fontWeight: 700, marginBottom: "4px" }}>₱{salaryDisplay}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Competitive + full benefits</div>
              </div>
            )}

            {/* Job details */}
            <div style={{ background: "white", border: "1px solid #e8edf2", borderRadius: "14px", padding: "20px" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a", marginBottom: "14px" }}>Job Details</div>
              {[
                { icon: "ti-building", label: "Company",         value: job.company },
                { icon: "ti-map-pin",  label: "Location",        value: job.location },
                { icon: "ti-briefcase",label: "Employment type", value: job.type },
                { icon: "ti-users",    label: "Team size",       value: "10 – 50 people" },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <i className={`ti ${icon}`} style={{ fontSize: "15px", color: "#64748b" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", color: "#94a3b8" }}>{label}</div>
                    <div style={{ fontSize: "13px", fontWeight: 500, color: "#1e293b" }}>{value}</div>
                  </div>
                </div>
              ))}
              <div style={{ fontSize: "12px", color: "#94a3b8", paddingTop: "10px", borderTop: "1px solid #f1f5f9" }}>
                Posted {job.postedDate} · {job.applicants} applicants
              </div>
            </div>

          </div>
        </div>
      </div>
    </JobSeekerPortalScaffold>
  );
}

export default JobSeekerJobDetails;