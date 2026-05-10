import { useEffect, useState } from "react";
import EmployerLayout from "./EmployerLayout";
import { getAllApplications } from "../../services/applicationService";


const statusStyle = {
  "Under Review": { background: "#fef9c3", color: "#854d0e" },
  "Shortlisted":  { background: "#dbeafe", color: "#1e40af" },
  "Interview":    { background: "#dcfce7", color: "#15803d" },
  "New":          { background: "#f1f5f9", color: "#64748b" },
  "Hired":        { background: "#f0fdf4", color: "#15803d" },
};

const tabs = [
  { label: "All",        count: 312 },
  { label: "New",        count: 14  },
  { label: "Shortlisted",count: 28  },
  { label: "Interview",  count: 9   },
  { label: "Hired",      count: 5   },
];

function EmployerApplicants() {
  const [tab, setTab]               = useState("All");
  const [search, setSearch]         = useState("");
  const [jobFilter, setJobFilter]   = useState("All Job Posts");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [selected, setSelected] = useState(null);
   const [detailStatus, setDetailStatus] = useState("");
   const [applicants, setApplicants] = useState([]);


  const filtered = applicants.filter(a => {
    const matchTab    = tab === "All" || a.status === tab;
    const matchSearch =
  (`Applicant ${a.userId}`).toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All Statuses" || a.status === statusFilter;
    return matchTab && matchSearch && matchStatus;
  });

  useEffect(() => {

  const loadApplicants = async () => {

    const data = await getAllApplications();

    setApplicants(
  data.map((a) => ({
    ...a,
    name: `Applicant #${a.userId}`,
    initials: "AP",
    exp: "N/A",
    location: "Philippines",
    email: "applicant@email.com",
    appliedFull: new Date(a.appliedAt).toDateString(),
    match: 80,
    matchColor: "#16a34a",
    skills: ["Resume Submitted"]
  }))
);

  };

  loadApplicants();

}, []);

  const th = {
    textAlign: "left", padding: "10px 12px", fontSize: "11px", fontWeight: 500,
    color: "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase",
    borderBottom: "1px solid #f1f5f9",
  };
  const td = {
    padding: "13px 12px", borderBottom: "1px solid #f8fafc", verticalAlign: "middle",
  };

  return (
    <EmployerLayout title="Applicants">
      {/* ── Toolbar ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
        <div style={{ position: "relative", maxWidth: "240px", flex: 1 }}>
          <i className="ti ti-search" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "14px", color: "#94a3b8" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search applicants..."
            style={{ width: "100%", padding: "7px 10px 7px 32px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
        </div>

        <select value={jobFilter} onChange={e => setJobFilter(e.target.value)}
          style={{ padding: "7px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", color: "#475569", background: "white", cursor: "pointer" }}>
          <option>All Job Posts</option>
          <option>Sr. Frontend Developer</option>
          <option>Product Manager</option>
          <option>UX Designer</option>
          <option>Backend Engineer</option>
        </select>

        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          style={{ padding: "7px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", color: "#475569", background: "white", cursor: "pointer" }}>
          <option>All Statuses</option>
          <option>New</option>
          <option>Under Review</option>
          <option>Shortlisted</option>
          <option>Interview</option>
          <option>Hired</option>
        </select>

        <span style={{ marginLeft: "auto", fontSize: "13px", color: "#64748b" }}>312 total applicants</span>
      </div>

      {/* ── Split layout ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 290px", gap: "16px", alignItems: "start" }}>

        {/* Left: table panel */}
        <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>

          {/* Tabs */}
          <div style={{ display: "flex", padding: "0 16px", borderBottom: "1px solid #f1f5f9" }}>
            {tabs.map(t => (
              <button key={t.label} onClick={() => setTab(t.label)}
                style={{ padding: "12px 4px", marginRight: "20px", fontSize: "13px", fontWeight: tab === t.label ? 500 : 400, color: tab === t.label ? "#0f172a" : "#64748b", background: "transparent", border: "none", borderBottom: tab === t.label ? "2px solid #0f172a" : "2px solid transparent", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                {t.label}
                <span style={{ fontSize: "11px", padding: "1px 6px", borderRadius: "20px", background: tab === t.label ? "#f1f5f9" : "#f1f5f9", color: tab === t.label ? "#0f172a" : "#94a3b8", fontWeight: 500 }}>{t.count}</span>
              </button>
            ))}
          </div>

          {/* Table */}
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={th}>Applicant</th>
                <th style={th}>Applied For</th>
                <th style={th}>Applied</th>
                <th style={th}>Status</th>
                <th style={th}>Match</th>
                <th style={{ ...th, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => {
                const isSelected = selected?.id === a.id;
                return (
                  <tr key={i} onClick={() => { setSelected(a); setDetailStatus(a.status); }}
                    style={{ cursor: "pointer", background: isSelected ? "#f8fafc" : "transparent" }}>

                    <td style={td}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: a.avatarBg, color: a.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 600, flexShrink: 0 }}>
                          {a.initials}
                        </div>
                        <div>
                          <div style={{ fontSize: "13px", fontWeight: 500, color: "#0f172a" }}>{a.applicantName || "Unknown Applicant"}</div>
                          <div style={{ fontSize: "11px", color: "#94a3b8" }}>{a.exp} · {a.location}</div>
                        </div>
                      </div>
                    </td>

                    <td style={{ ...td, fontSize: "13px", color: "#1e293b" }}>{a.jobTitle || "Unknown Job"}</td>

                    <td style={{ ...td, fontSize: "13px", color: "#64748b" }}>{new Date(a.appliedAt).toLocaleDateString()}</td>

                    <td style={td}>
                      <span style={{ ...statusStyle[a.status], fontSize: "11px", padding: "3px 10px", borderRadius: "20px", fontWeight: 500 }}>
                        {a.status}
                      </span>
                    </td>

                    <td style={td}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "52px", height: "4px", background: "#f1f5f9", borderRadius: "2px", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${a.match}%`, background: a.matchColor, borderRadius: "2px" }} />
                        </div>
                        <span style={{ fontSize: "12px", fontWeight: 500, color: a.matchColor }}>{a.match}%</span>
                      </div>
                    </td>

                    <td style={{ ...td, textAlign: "right" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "6px" }}>
                        <button
                          onClick={e => { e.stopPropagation(); setSelected(a); setDetailStatus(a.status); }}
                          style={{ padding: "5px 14px", background: isSelected ? "#0f172a" : "transparent", color: isSelected ? "white" : "#64748b", border: "1px solid " + (isSelected ? "#0f172a" : "#e2e8f0"), borderRadius: "6px", fontSize: "12px", cursor: "pointer", fontWeight: 500 }}>
                          View
                        </button>
                        <button style={{ width: "28px", height: "28px", border: "1px solid #e2e8f0", background: "transparent", borderRadius: "6px", cursor: "pointer", color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <i className="ti ti-message" style={{ fontSize: "14px" }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Right: detail panel */}
        {selected && (
          <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>

            {/* Dark header */}
            <div style={{ background: "#1e293b", padding: "28px 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#334155", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: 600, color: "#cbd5e1", border: "2px solid #475569" }}>
                {selected.initials}
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "15px", fontWeight: 600, color: "white" }}>{selected.name}</div>
                <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>{selected.applicantEmail}</div>
              </div>
              <div style={{ display: "flex", gap: "6px", marginTop: "2px" }}>
                <span style={{ fontSize: "11px", padding: "3px 12px", borderRadius: "20px", background: "rgba(255,255,255,0.1)", color: "#cbd5e1" }}>{selected.exp}</span>
                <span style={{ fontSize: "11px", padding: "3px 12px", borderRadius: "20px", background: "rgba(255,255,255,0.1)", color: "#cbd5e1" }}>{selected.location}</span>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: "18px" }}>

              {/* Applied for */}
              <div>
                <div style={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "5px" }}>Applied For</div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a" }}>{selected.job}</div>
                <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>Applied {selected.appliedFull}</div>
              </div>

              {/* Match score */}
              <div>
                <div style={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>Match Score</div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ flex: 1, height: "6px", background: "#f1f5f9", borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${selected.match}%`, background: selected.matchColor, borderRadius: "3px" }} />
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: selected.matchColor }}>{selected.match}%</span>
                </div>
              </div>

              {/* Skills */}
              <div>
                <div style={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>Skills</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {(selected.skills || ["Resume Submitted"]).map((s, i) => (
                    <span key={i} style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "6px", background: "#f1f5f9", color: "#475569", fontWeight: 500, border: "1px solid #e2e8f0" }}>{s}</span>
                  ))}
                </div>
              </div>

              {/* Update status */}
              <div>
                <div style={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>Update Status</div>
                <select value={detailStatus} onChange={e => setDetailStatus(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", color: "#1e293b", background: "white", cursor: "pointer", outline: "none" }}>
                  <option>New</option>
                  <option>Under Review</option>
                  <option>Shortlisted</option>
                  <option>Interview</option>
                  <option>Hired</option>
                  <option>Rejected</option>
                </select>
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "10px", background: "#0f172a", color: "white", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>
                  <i className="ti ti-calendar" style={{ fontSize: "15px" }} />
                  Schedule
                </button>
                <button style={{ width: "36px", height: "36px", border: "1px solid #e2e8f0", background: "white", borderRadius: "8px", cursor: "pointer", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <i className="ti ti-download" style={{ fontSize: "15px" }} />
                </button>
                <button style={{ width: "36px", height: "36px", border: "1px solid #e2e8f0", background: "white", borderRadius: "8px", cursor: "pointer", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <i className="ti ti-message" style={{ fontSize: "15px" }} />
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </EmployerLayout>
  );
}

export default EmployerApplicants;