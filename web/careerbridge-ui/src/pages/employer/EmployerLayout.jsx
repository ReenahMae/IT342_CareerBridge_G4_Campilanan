import EmployerSidebar from "./EmployerSidebar";
import EmployerTopbar from "./EmployerTopbar";

function EmployerLayout({ children, title }) {
  return (
    <div style={{ display: "flex", height: "100vh", background: "#f8fafc" }}>
      <EmployerSidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <EmployerTopbar title={title} />
        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default EmployerLayout;