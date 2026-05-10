function ApplicationActivity() {
  const days = [
    { label: "Mon", value: 28 },
    { label: "Tue", value: 38 },
    { label: "Wed", value: 60 },
    { label: "Thu", value: 32 },
    { label: "Fri", value: 22 },
    { label: "Sat", value: 14 },
    { label: "Sun", value: 10 },
  ];
  const max = Math.max(...days.map(d => d.value));

  return (
    <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <span style={{ fontSize: "14px", fontWeight: 500 }}>Application Activity</span>
        <div style={{ display: "flex", border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
          <button style={{ padding: "5px 14px", fontSize: "12px", border: "none", background: "#f1f5f9", fontWeight: 500, cursor: "pointer" }}>Week</button>
          <button style={{ padding: "5px 14px", fontSize: "12px", border: "none", background: "transparent", color: "#64748b", cursor: "pointer" }}>Month</button>
        </div>
      </div>

      {/* Y-axis labels + bars */}
      <div style={{ display: "flex", gap: "8px" }}>
        {/* Y labels */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end", paddingBottom: "24px", fontSize: "11px", color: "#94a3b8", width: "24px" }}>
          <span>60</span>
          <span>40</span>
          <span>20</span>
          <span>0</span>
        </div>
        {/* Bars */}
        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: "6px", borderBottom: "1px solid #f1f5f9" }}>
          {days.map((d, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "100%", height: "130px", display: "flex", alignItems: "flex-end" }}>
                <div style={{ width: "100%", height: `${(d.value / max) * 100}%`, background: d.label === "Wed" ? "#2563eb" : "#e2e8f0", borderRadius: "4px 4px 0 0" }} />
              </div>
              <span style={{ fontSize: "11px", color: "#94a3b8" }}>{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ApplicationActivity;