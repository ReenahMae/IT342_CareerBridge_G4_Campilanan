import { useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";

function JobSeekerPortalScaffold({ activePage = "jobs", onPageChange, children }) {
	const navigate = useNavigate();

	const navItems = [
		{ key: "jobs", label: "Find Jobs", destination: "/dashboard" },
		{ key: "companies", label: "Companies", destination: "/companies" },
		{ key: "profile", label: "My Profile", destination: "/profile" },
		{ key: "applications", label: "Applications", destination: "/applications" }
	];

	const handlePageChange = (page) => {
		if (onPageChange && (page === "dashboard" || page === "jobs")) {
			onPageChange(page);
			return;
		}

		const target = navItems.find((item) => item.key === page);
		if (target) {
			navigate(target.destination);
		}
	};

	return (
		<div className="jobseeker-layout jobseeker-layout-header">
			<header className="portal-topbar portal-topbar-header">
				<div className="portal-brand-wrap">
					<div className="portal-brand-mark" aria-hidden="true">
						CB
					</div>
					<div className="portal-brand-copy">
						<p className="portal-brand-name">CareerBridge</p>
					</div>
				</div>

				<nav className="portal-nav" aria-label="Job seeker navigation">
					{navItems.map((item) => {
						const isJobsTabActive = item.key === "jobs" && (activePage === "jobs" || activePage === "dashboard");
						const activeClass = activePage === item.key || isJobsTabActive ? "portal-nav-link active" : "portal-nav-link";

						return (
							<button
								key={item.key}
								type="button"
								className={activeClass}
								onClick={() => handlePageChange(item.key)}
							>
								<span className="portal-nav-link-text">{item.label}</span>
							</button>
						);
					})}
				</nav>

				<div className="portal-header-actions">
					<button type="button" className="header-icon-btn" aria-label="Notifications" title="Notifications">
						<FiBell aria-hidden="true" />
					</button>
					<button
						type="button"
						className="portal-user portal-user-button"
						onClick={() => navigate("/profile")}
						aria-label="Open profile"
					>
						<div className="portal-user-avatar">MJ</div>
						<div className="portal-user-copy">
							<p className="portal-user-name">Mary Johnson</p>
							<p className="portal-user-role">Job Seeker</p>
						</div>
					</button>
				</div>
			</header>

			<main className="jobseeker-main jobseeker-main-header">{children}</main>
		</div>
	);
}

export default JobSeekerPortalScaffold;
