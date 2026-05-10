import EmployerLayout from "./EmployerLayout";
import DashboardCards from "./DashboardCards";
import RecentApplications from "./RecentApplications";
import ApplicationActivity from "./ApplicationActivity";
import TopPerformingPosts from "./TopPerformingPosts";

function EmployerDashboard() {
  return (
    <EmployerLayout title="Dashboard">

      {/* Greeting */}
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 600, margin: 0 }}>Good morning, Alex 👋</h2>
        <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
          Here's what's happening with your job posts today.
        </p>
      </div>

      <DashboardCards />

      {/* Chart + Top Posts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "16px", marginBottom: "24px" }}>
        <ApplicationActivity />
        <TopPerformingPosts />
      </div>

      <RecentApplications />

    </EmployerLayout>
  );
}

export default EmployerDashboard;