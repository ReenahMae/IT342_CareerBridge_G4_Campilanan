function RecentApplications() {
  const applications = [
    { initials: "JD", name: "John Doe", email: "john.doe@email.com", job: "Sr. Frontend Developer", date: "Feb 28, 2026", status: "Under Review", color: "#dbeafe", textColor: "#1d4ed8" },
    { initials: "SA", name: "Sarah A.", email: "sarah.a@email.com", job: "Product Manager", date: "Feb 27, 2026", status: "Shortlisted", color: "#fce7f3", textColor: "#be185d" },
    { initials: "ML", name: "Mike L.", email: "mike.l@email.com", job: "UX Designer", date: "Feb 26, 2026", status: "Interview", color: "#dcfce7", textColor: "#15803d" },
    { initials: "CT", name: "Clara T.", email: "clara.t@email.com", job: "Backend Engineer", date: "Feb 25, 2026", status: "New", color: "#fef3c7", textColor: "#b45309" },
  ];

  const statusStyle = { "Under Review": { background: "#fef9c3", color: "#854d0e" }, "Shortlisted": { background: "#dbeafe", color: "#1e40af" }, "Interview": { background: "#dcfce7", color: "#15803d" }, "New": { background: "#f1f5f9", color: "#64748b" } };

  return (
    <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px", marginTop: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <span style={{ fontSize: "13px", fontWeight: 500 }}>Recent Applications</span>
        <a href="#" style={{ fontSize: "12px", color: "#2563eb", textDecoration: "none" }}>View all →</a>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
        <thead>
          <tr>
            {["Applicant", "Applied For", "Date", "Status", "Actions"].map(h => (
              <th key={h} style={{ textAlign: "left", padding: "6px 8px", color: "#64748b", fontWeight: 500, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.04em", borderBottom: "1px solid #e2e8f0" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {applications.map((app, i) => (
            <tr key={i}>
              <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: app.color, color: app.textColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 500, flexShrink: 0 }}>{app.initials}</div>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 500 }}>{app.name}</div>
                    <div style={{ fontSize: "10px", color: "#94a3b8" }}>{app.email}</div>
                  </div>
                </div>
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9" }}>{app.job}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9", color: "#64748b" }}>{app.date}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9" }}>
                <span style={{ ...statusStyle[app.status], fontSize: "10px", padding: "2px 7px", borderRadius: "4px", fontWeight: 500 }}>{app.status}</span>
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9" }}>
                <button style={{ fontSize: "10px", padding: "3px 8px", borderRadius: "4px", border: "1px solid #e2e8f0", background: "transparent", cursor: "pointer" }}>View Profile</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentApplications;