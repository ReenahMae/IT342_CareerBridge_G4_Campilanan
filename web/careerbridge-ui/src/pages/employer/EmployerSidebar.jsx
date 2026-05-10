import { Link, useLocation } from "react-router-dom";


function EmployerSidebar() {
  const { pathname } = useLocation();

  return (
    <div style={{ width: "220px", height: "100vh", backgroundColor: "#0f172a", color: "white", display: "flex", flexDirection: "column" }}>
      
      {/* Logo */}
      <div style={{ padding: "20px 16px 16px", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 500, color: "#fff" }}>CB</div>
        <div>
          <div style={{ fontSize: "15px", fontWeight: 500 }}>CareerBridge</div>
          <div style={{ fontSize: "11px", color: "#64748b" }}>Employer Portal</div>
        </div>
      </div>

      {/* Main nav */}
      <div style={{ padding: "16px 16px 6px", fontSize: "10px", fontWeight: 500, letterSpacing: "0.08em", color: "#475569", textTransform: "uppercase" }}>Main</div>
      <ul style={{ listStyle: "none", padding: "0 8px", margin: 0 }}>
        {[
          { to: "/employer/dashboard", label: "Dashboard", icon: "ti-layout-dashboard" },
          { to: "/employer/jobs", label: "Job Posts", icon: "ti-briefcase" },
          { to: "/employer/applicants", label: "Applicants", icon: "ti-users" },
          { to: "/employer/analytics", label: "Analytics", icon: "ti-chart-bar" },
        ].map(({ to, label, icon }) => (
          <li key={to}>
            <Link to={to} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 10px", borderRadius: "6px", color: pathname === to ? "#f1f5f9" : "#94a3b8", textDecoration: "none", background: pathname === to ? "rgba(255,255,255,0.12)" : "transparent", fontSize: "13px" }}>
              <i className={`ti ${icon}`} style={{ fontSize: "16px" }} />
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Settings nav */}
      <div style={{ padding: "16px 16px 6px", fontSize: "10px", fontWeight: 500, letterSpacing: "0.08em", color: "#475569", textTransform: "uppercase" }}>Settings</div>
      <ul style={{ listStyle: "none", padding: "0 8px", margin: 0 }}>
        {[
          { to: "/employer/company-profile", label: "Company Profile", icon: "ti-building" },
          { to: "/employer/settings", label: "Settings", icon: "ti-settings" },
        ].map(({ to, label, icon }) => (
          <li key={to}>
            <Link to={to} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 10px", borderRadius: "6px", color: pathname === to ? "#f1f5f9" : "#94a3b8", textDecoration: "none", background: pathname === to ? "rgba(255,255,255,0.12)" : "transparent", fontSize: "13px" }}>
              <i className={`ti ${icon}`} style={{ fontSize: "16px" }} />
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Company footer */}
      <div style={{ marginTop: "auto", padding: "14px", borderTop: "0.5px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 500, color: "#fff", flexShrink: 0 }}>AC</div>
        <div>
          <div style={{ color: "#e2e8f0", fontSize: "13px", fontWeight: 500 }}>Acme Corp.</div>
          <div style={{ color: "#64748b", fontSize: "11px" }}>Pro Plan</div>
        </div>
      </div>
    </div>
  );
}

export default EmployerSidebar;