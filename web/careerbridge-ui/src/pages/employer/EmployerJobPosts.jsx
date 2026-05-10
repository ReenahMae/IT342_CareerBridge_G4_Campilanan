import { useState, useEffect } from "react";
import { getJobs } from "../../services/jobService";
import EmployerLayout from "./EmployerLayout";
import { useNavigate } from "react-router-dom";




const PAGE_SIZE = 5;

const typeStyle = {
  Remote:  { background: "#eff6ff", color: "#2563eb" },
  "On-site": { background: "#f8fafc", color: "#475569" },
  Hybrid:  { background: "#f0fdf4", color: "#15803d" },
};

const statusStyle = {
  Open:   { background: "#f0fdf4", color: "#15803d", dot: "#16a34a" },
  Closed: { background: "#f8fafc", color: "#64748b", dot: "#94a3b8" },
  Draft:  { background: "#fefce8", color: "#b45309", dot: "#ca8a04" },
};

function EmployerJobPosts() {
    const navigate = useNavigate();
  const [allJobs, setAllJobs] = useState([]);
  const [tab, setTab] = useState("All Posts");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [page, setPage] = useState(1);

        useEffect(() => {

        testBackend();

        }, []);

        const testBackend = async () => {

        try {

            const jobs = await getJobs();

            setAllJobs(jobs);

        } catch (error) {

            console.error(error);

        }

        };

  const tabs = [
  {
    label: "All Posts",
    count: allJobs.length,
  },
  {
    label: "Open",
    count: allJobs.filter(
      j => (j.status || "Open") === "Open"
    ).length,
  },
  {
    label: "Closed",
    count: allJobs.filter(
      j => (j.status || "Open") === "Closed"
    ).length,
  },
  {
    label: "Draft",
    count: allJobs.filter(
      j => (j.status || "Open") === "Draft"
    ).length,
  },
];

const filtered = allJobs.filter(j => {

  const matchTab =
  tab === "All Posts" ||
  (j.status || "Open") === tab;

  const matchSearch =
    (j.title || "")
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchStatus =
  statusFilter === "All Statuses" ||
  (j.status || "Open") === statusFilter;

  const matchLocation =
  locationFilter === "All Locations" ||
  (j.location || "").includes(locationFilter);

  return (
    matchTab &&
    matchSearch &&
    matchStatus &&
    matchLocation
  );
});

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const col = {
    th: { textAlign: "left", padding: "10px 12px", fontSize: "11px", fontWeight: 500, color: "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid #f1f5f9" },
    td: { padding: "14px 12px", borderBottom: "1px solid #f8fafc", verticalAlign: "middle", fontSize: "13px" },
  };

  return (
    <EmployerLayout title="Job Posts">
      <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "16px 20px", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ position: "relative", flex: 1, maxWidth: "280px" }}>
            <i className="ti ti-search" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "14px", color: "#94a3b8" }} />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search job posts..."
              style={{ width: "100%", padding: "7px 10px 7px 32px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", outline: "none", color: "#1e293b" }}
            />
          </div>

          <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
            style={{ padding: "7px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", color: "#475569", background: "white", cursor: "pointer" }}>
            <option>All Statuses</option>
            <option>Open</option>
            <option>Closed</option>
            <option>Draft</option>
          </select>

          <select value={locationFilter} onChange={e => { setLocationFilter(e.target.value); setPage(1); }}
            style={{ padding: "7px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", color: "#475569", background: "white", cursor: "pointer" }}>
            <option>All Locations</option>
            <option>Remote</option>
            <option>On-site</option>
            <option>Hybrid</option>
          </select>

          <button
            onClick={() => navigate("/employer/jobs/create")}
            style={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer"
            }}
            >
            <i
                className="ti ti-plus"
                style={{ fontSize: "15px" }}
            />
            Create Job Post
            </button>
                    </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0", padding: "0 20px", borderBottom: "1px solid #f1f5f9" }}>
          {tabs.map(t => (
            <button key={t.label} onClick={() => { setTab(t.label); setPage(1); }}
              style={{ padding: "12px 4px", marginRight: "24px", fontSize: "13px", fontWeight: tab === t.label ? 500 : 400, color: tab === t.label ? "#2563eb" : "#64748b", background: "transparent", border: "none", borderBottom: tab === t.label ? "2px solid #2563eb" : "2px solid transparent", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
              {t.label}
              <span style={{ fontSize: "11px", padding: "1px 7px", borderRadius: "20px", background: tab === t.label ? "#eff6ff" : "#f1f5f9", color: tab === t.label ? "#2563eb" : "#94a3b8", fontWeight: 500 }}>{t.count}</span>
            </button>
          ))}
        </div>

        {/* Table */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={col.th}>Job Title</th>
              <th style={col.th}>Location</th>
              <th style={col.th}>Type</th>
              <th style={col.th}>Status</th>
              <th style={col.th}>Applicants</th>
              <th style={col.th}>Posted Date</th>
              <th style={{ ...col.th, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((job, i) => (
              <tr key={i}>
                <td style={col.td}>
                  <div style={{ fontWeight: 500, color: "#1e293b" }}>{job.title}</div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>{job.company} · {job.salary}</div>
                </td>
                <td style={{ ...col.td, color: "#475569" }}>{job.location}</td>
                <td style={col.td}>
                  <span style={{ ...typeStyle[job.type || "Remote"], fontSize: "11px", padding: "3px 10px", borderRadius: "20px", fontWeight: 500 }}>{job.type || "Remote"}</span>
                </td>
                <td style={col.td}>
                  <span style={{ ...statusStyle[job.status || "Open"], fontSize: "11px", padding: "3px 10px", borderRadius: "20px", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: "5px" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: statusStyle[job.status || "Open"].dot, flexShrink: 0 }} />
                    {job.status || "Open"}
                  </span>
                </td>
               <td style={col.td}>
                <span style={{ fontWeight: 500 }}>
                    {job.applicants || 0}
                </span>
                </td>
                <td style={{ ...col.td, color: "#475569" }}>
                {job.postedDate}
                </td>               
                 <td style={{ ...col.td, textAlign: "right" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" }}>
                    <button style={{ width: "30px", height: "30px", border: "none", background: "transparent", cursor: "pointer", color: "#94a3b8", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <i className="ti ti-eye" style={{ fontSize: "16px" }} />
                    </button>
                    <button style={{ width: "30px", height: "30px", border: "none", background: "transparent", cursor: "pointer", color: "#94a3b8", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <i className="ti ti-edit" style={{ fontSize: "16px" }} />
                    </button>
                    <button style={{ width: "30px", height: "30px", border: "none", background: "transparent", cursor: "pointer", color: "#f43f5e", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <i className="ti ti-trash" style={{ fontSize: "16px" }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer / Pagination */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderTop: "1px solid #f1f5f9" }}>
          <span style={{ fontSize: "12px", color: "#94a3b8" }}>
            Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} posts
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              style={{ width: "30px", height: "30px", border: "1px solid #e2e8f0", borderRadius: "6px", background: "transparent", cursor: "pointer", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className="ti ti-chevron-left" style={{ fontSize: "14px" }} />
            </button>
            {Array.from({ length: Math.min(totalPages, 8) }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)}
                style={{ width: "30px", height: "30px", border: "1px solid " + (page === n ? "#2563eb" : "#e2e8f0"), borderRadius: "6px", background: page === n ? "#2563eb" : "transparent", color: page === n ? "white" : "#64748b", fontSize: "12px", cursor: "pointer", fontWeight: page === n ? 500 : 400 }}>
                {n}
              </button>
            ))}
            {totalPages > 8 && <span style={{ color: "#94a3b8", fontSize: "12px" }}>...</span>}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              style={{ width: "30px", height: "30px", border: "1px solid #e2e8f0", borderRadius: "6px", background: "transparent", cursor: "pointer", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className="ti ti-chevron-right" style={{ fontSize: "14px" }} />
            </button>
          </div>
        </div>

      </div>
    </EmployerLayout>
  );
}

export default EmployerJobPosts;