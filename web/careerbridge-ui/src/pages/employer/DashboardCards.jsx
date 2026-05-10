function DashboardCards() {
  const cards = [
    { title: "TOTAL JOB POSTS", value: "24", sub: "+3 this month", subColor: "#16a34a", icon: "ti-briefcase", iconBg: "#eff6ff", iconColor: "#2563eb" },
    { title: "ACTIVE JOBS", value: "18", sub: "75% of total posts", subColor: "#64748b", icon: "ti-circle-check", iconBg: "#f0fdf4", iconColor: "#16a34a" },
    { title: "TOTAL APPLICANTS", value: "312", sub: "+47 this week", subColor: "#16a34a", icon: "ti-users", iconBg: "#fefce8", iconColor: "#ca8a04" },
    { title: "PENDING REVIEWS", value: "14", sub: "Needs attention", subColor: "#ef4444", icon: "ti-clock", iconBg: "#fff1f2", iconColor: "#f43f5e" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
      {cards.map((card, i) => (
        <div key={i} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: card.iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
            <i className={`ti ${card.icon}`} style={{ fontSize: "20px", color: card.iconColor }} />
          </div>
          <div style={{ fontSize: "28px", fontWeight: 600, marginBottom: "4px" }}>{card.value}</div>
          <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 500, letterSpacing: "0.05em", marginBottom: "6px" }}>{card.title}</div>
          <div style={{ fontSize: "12px", color: card.subColor, display: "flex", alignItems: "center", gap: "4px" }}>
            {card.sub.startsWith("+") && <i className="ti ti-trending-up" style={{ fontSize: "13px" }} />}
            {card.sub}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;