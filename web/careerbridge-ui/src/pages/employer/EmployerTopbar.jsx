function EmployerTopbar({ title = "Dashboard" }) {
  const today = new Date().toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" });

  return (
    <div style={{ height: "56px", backgroundColor: "white", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 24px", borderBottom: "1px solid #e2e8f0" }}>
      <span style={{ fontSize: "16px", fontWeight: 600 }}>{title}</span>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "12px", color: "#94a3b8" }}>{today}</span>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>
          <i className="ti ti-bell" style={{ fontSize: "16px" }} />
        </div>
        <span style={{ fontSize: "13px", color: "#64748b" }}>Acme Corp. Inc.</span>
        <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 600, color: "#fff" }}>AC</div>
      </div>
    </div>
  );
}

export default EmployerTopbar;