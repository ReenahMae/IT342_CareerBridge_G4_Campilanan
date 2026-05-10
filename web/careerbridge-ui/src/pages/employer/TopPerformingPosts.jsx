function TopPerformingPosts() {
  const posts = [
    { title: "Sr. Frontend Developer", meta: "47 applicants · Remote", status: "Open", progress: 85 },
    { title: "Product Manager", meta: "23 applicants · Cebu City", status: "Open", progress: 42 },
    { title: "UX / UI Designer", meta: "89 applicants · Remote", status: "Closed", progress: 100 },
  ];

  return (
    <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <span style={{ fontSize: "14px", fontWeight: 500 }}>Top Performing Posts</span>
        <a href="#" style={{ fontSize: "12px", color: "#2563eb", textDecoration: "none" }}>View all</a>
      </div>

      {posts.map((post, i) => (
        <div key={i} style={{ paddingBottom: "14px", marginBottom: "14px", borderBottom: i < posts.length - 1 ? "1px solid #f1f5f9" : "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
            <span style={{ fontSize: "13px", fontWeight: 500 }}>{post.title}</span>
            <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "20px", fontWeight: 500,
              background: post.status === "Open" ? "#f0fdf4" : "#f8fafc",
              color: post.status === "Open" ? "#16a34a" : "#64748b"
            }}>● {post.status}</span>
          </div>
          <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "8px" }}>{post.meta}</div>
          <div style={{ height: "4px", background: "#f1f5f9", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${post.progress}%`, background: post.status === "Open" ? "#2563eb" : "#cbd5e1", borderRadius: "2px" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopPerformingPosts;