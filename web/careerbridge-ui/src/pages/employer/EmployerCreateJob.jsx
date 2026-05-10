import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployerLayout from "./EmployerLayout";
import { createJob } from "../../services/jobService";

const DEPARTMENTS = ["Engineering", "Product", "Design", "Marketing", "Sales", "Operations", "HR", "Finance"];
const EXPERIENCE_LEVELS = ["Entry Level", "Mid Level", "Senior Level", "Lead", "Manager", "Director"];
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];
const WORK_SETUPS = ["On-site", "Remote", "Hybrid"];
const CITIES = ["Cebu City, PH", "Manila, PH", "Davao, PH", "Quezon City, PH", "Remote"];

function EmployerCreateJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    department: "Engineering",
    experienceLevel: "Entry Level",
    jobType: "Full-time",
    city: "Cebu City, PH",
    workSetup: "On-site",
    minSalary: "",
    maxSalary: "",
    description: "",
    requirements: "",
    status: "Open",
    deadline: "",
  });

  const [skills, setSkills] = useState(["React", "TypeScript", "Node.js"]);
  const [skillInput, setSkillInput] = useState("");

  const set = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const addSkill = (e) => {
    if ((e.key === "Enter" || e.key === ",") && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills(s => [...s, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => setSkills(s => s.filter(x => x !== skill));

  const sectionHeader = (icon, label) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
      <i className={`ti ${icon}`} style={{ fontSize: "16px", color: "#2563eb" }} />
      <span style={{ fontSize: "15px", fontWeight: 500 }}>{label}</span>
    </div>
  );

  const label = (text, required) => (
    <label style={{ fontSize: "12px", fontWeight: 500, color: "#475569", display: "block", marginBottom: "6px" }}>
      {text}{required && <span style={{ color: "#ef4444", marginLeft: "2px" }}>*</span>}
    </label>
  );

  const inputStyle = {
    width: "100%", padding: "9px 12px", border: "1px solid #e2e8f0", borderRadius: "8px",
    fontSize: "13px", outline: "none", color: "#1e293b", background: "white",
    boxSizing: "border-box"
  };

  const selectStyle = { ...inputStyle, cursor: "pointer", appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", paddingRight: "28px"
  };

  const sectionStyle = {
    background: "white", border: "1px solid #e2e8f0", borderRadius: "12px",
    padding: "24px", marginBottom: "16px"
  };
  const handleSubmit = async (statusValue) => {
    // Validation: Check required fields
    if (!form.title?.trim()) {
      alert("Job Title is required");
      return;
    }
    if (!form.description?.trim()) {
      alert("Job Description is required");
      return;
    }
    if (!form.requirements?.trim()) {
      alert("Requirements & Qualifications are required");
      return;
    }
    if (!form.minSalary?.toString().trim()) {
      alert("Minimum Salary is required");
      return;
    }
    if (!form.maxSalary?.toString().trim()) {
      alert("Maximum Salary is required");
      return;
    }

  try {

    const jobData = {
      title: form.title,
      company: "Acme Corp. Inc.",
      location: form.city,
      salary: `PHP ${form.minSalary}k - ${form.maxSalary}k`,
      description: form.description,
      status: statusValue,
      type: form.jobType,
      postedDate: new Date().toLocaleDateString(),
      applicants: 0
    };

    await createJob(jobData);

    alert("Job created successfully!");

    navigate("/employer/jobs");

  } catch (error) {

    console.error(error);
    alert("Failed to create job");

  }

};

  return (
    <EmployerLayout title="Job Posts">
      {/* Back nav */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        <button onClick={() => navigate("/employer/jobs")}
          style={{ display: "flex", alignItems: "center", gap: "6px", background: "transparent", border: "none", color: "#64748b", cursor: "pointer", fontSize: "13px", padding: 0 }}>
          <i className="ti ti-arrow-left" style={{ fontSize: "15px" }} />
          Job Posts
        </button>
        <span style={{ color: "#cbd5e1", fontSize: "13px" }}>/</span>
        <span style={{ fontSize: "13px", fontWeight: 500 }}>Create Job Post</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "16px", alignItems: "start" }}>

        {/* ── LEFT: Form ── */}
        <div>

          {/* Basic Information */}
          <div style={sectionStyle}>
            {sectionHeader("ti-info-circle", "Basic Information")}

            <div style={{ marginBottom: "16px" }}>
              {label("Job Title", true)}
              <input value={form.title} onChange={e => set("title", e.target.value)}
                placeholder="e.g. Senior Frontend Developer" style={inputStyle} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
              <div>
                {label("Department")}
                <select value={form.department} onChange={e => set("department", e.target.value)} style={selectStyle}>
                  {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                {label("Experience Level")}
                <select value={form.experienceLevel} onChange={e => set("experienceLevel", e.target.value)} style={selectStyle}>
                  {EXPERIENCE_LEVELS.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <div>
              {label("Job Type")}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {JOB_TYPES.map(t => (
                  <button key={t} onClick={() => set("jobType", t)}
                    style={{ padding: "7px 16px", borderRadius: "20px", border: "1px solid " + (form.jobType === t ? "#2563eb" : "#e2e8f0"), background: form.jobType === t ? "#2563eb" : "white", color: form.jobType === t ? "white" : "#64748b", fontSize: "13px", cursor: "pointer", fontWeight: form.jobType === t ? 500 : 400 }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Location & Compensation */}
          <div style={sectionStyle}>
            {sectionHeader("ti-map-pin", "Location & Compensation")}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
              <div>
                {label("City / Region")}
                <select value={form.city} onChange={e => set("city", e.target.value)} style={selectStyle}>
                  {CITIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                {label("Work Setup")}
                <select value={form.workSetup} onChange={e => set("workSetup", e.target.value)} style={selectStyle}>
                  {WORK_SETUPS.map(w => <option key={w}>{w}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                {label("Min Salary (PHP/month)")}
                <input value={form.minSalary} onChange={e => set("minSalary", e.target.value)}
                  placeholder="e.g. 50,000" style={inputStyle} />
              </div>
              <div>
                {label("Max Salary (PHP/month)")}
                <input value={form.maxSalary} onChange={e => set("maxSalary", e.target.value)}
                  placeholder="e.g. 80,000" style={inputStyle} />
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div style={sectionStyle}>
            {sectionHeader("ti-file-text", "Job Description")}

            {/* Mini toolbar */}
            <div style={{ display: "flex", gap: "2px", padding: "6px 8px", border: "1px solid #e2e8f0", borderBottom: "none", borderRadius: "8px 8px 0 0", background: "#f8fafc" }}>
              {[["B", "bold"], ["I", "italic"], ["U", "underline"]].map(([ch, cmd]) => (
                <button key={cmd} onMouseDown={e => { e.preventDefault(); document.execCommand(cmd); }}
                  style={{ width: "28px", height: "28px", border: "none", background: "transparent", cursor: "pointer", borderRadius: "4px", fontWeight: cmd === "bold" ? 700 : cmd === "italic" ? "normal" : 400, fontStyle: cmd === "italic" ? "italic" : "normal", textDecoration: cmd === "underline" ? "underline" : "none", fontSize: "13px", color: "#475569" }}>
                  {ch}
                </button>
              ))}
              <div style={{ width: "1px", background: "#e2e8f0", margin: "4px 4px" }} />
              {[["ti-list", "insertUnorderedList"], ["ti-list-numbers", "insertOrderedList"]].map(([icon, cmd]) => (
                <button key={cmd} onMouseDown={e => { e.preventDefault(); document.execCommand(cmd); }}
                  style={{ width: "28px", height: "28px", border: "none", background: "transparent", cursor: "pointer", borderRadius: "4px", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <i className={`ti ${icon}`} style={{ fontSize: "15px" }} />
                </button>
              ))}
              <button style={{ width: "28px", height: "28px", border: "none", background: "transparent", cursor: "pointer", borderRadius: "4px", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <i className="ti ti-link" style={{ fontSize: "15px" }} />
              </button>
            </div>
            <textarea value={form.description} onChange={e => set("description", e.target.value)}
              placeholder="Describe the role, key responsibilities, team culture, and what makes this an exciting opportunity..."
              style={{ ...inputStyle, borderRadius: "0 0 8px 8px", minHeight: "120px", resize: "vertical", lineHeight: 1.6 }} />
          </div>

          {/* Requirements & Qualifications */}
          <div style={sectionStyle}>
            {sectionHeader("ti-file-check", "Requirements & Qualifications")}

            <textarea value={form.requirements} onChange={e => set("requirements", e.target.value)}
              placeholder="List required skills, years of experience, education, certifications..."
              style={{ ...inputStyle, minHeight: "100px", resize: "vertical", lineHeight: 1.6, marginBottom: "16px" }} />

            {label("Skills Tags")}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", padding: "8px 10px", border: "1px solid #e2e8f0", borderRadius: "8px", minHeight: "42px", alignItems: "center" }}>
              {skills.map(s => (
                <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "3px 10px", background: "#eff6ff", color: "#2563eb", borderRadius: "20px", fontSize: "12px", fontWeight: 500 }}>
                  {s}
                  <button onClick={() => removeSkill(s)}
                    style={{ border: "none", background: "transparent", cursor: "pointer", color: "#2563eb", padding: 0, fontSize: "14px", lineHeight: 1, display: "flex", alignItems: "center" }}>×</button>
                </span>
              ))}
              <input value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={addSkill}
                placeholder="+ Add skill..." style={{ border: "none", outline: "none", fontSize: "12px", color: "#64748b", minWidth: "100px", flex: 1 }} />
            </div>
            <p style={{ fontSize: "11px", color: "#94a3b8", marginTop: "6px" }}>Press Enter or comma to add a skill</p>
          </div>

        </div>

        {/* ── RIGHT: Sidebar ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Publish Settings */}
          <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px" }}>
            <div style={{ fontSize: "15px", fontWeight: 500, marginBottom: "16px" }}>Publish Settings</div>

            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "12px", fontWeight: 500, color: "#475569", marginBottom: "8px" }}>Status</div>
              <div style={{ display: "flex", border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
                {["Open", "Draft", "Closed"].map(s => (
                  <button key={s} onClick={() => set("status", s)}
                    style={{ flex: 1, padding: "8px 0", fontSize: "13px", border: "none", cursor: "pointer", fontWeight: form.status === s ? 500 : 400, background: form.status === s ? "white" : "#f8fafc", color: form.status === s ? "#1e293b" : "#64748b", borderRight: s !== "Closed" ? "1px solid #e2e8f0" : "none", boxShadow: form.status === s ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "12px", fontWeight: 500, color: "#475569", marginBottom: "6px" }}>Application Deadline</div>
              <input type="date" value={form.deadline} onChange={e => set("deadline", e.target.value)}
                style={{ ...inputStyle, color: form.deadline ? "#1e293b" : "#94a3b8" }} />
            </div>

            <button
  onClick={() => handleSubmit("Open")}
  style={{
    width: "100%",
    padding: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    marginBottom: "8px"
  }}
>
              Save & Publish
            </button>
            <button
  onClick={() => handleSubmit("Draft")}
  style={{
    width: "100%",
    padding: "10px",
    background: "white",
    color: "#475569",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "13px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    marginBottom: "8px"
  }}
>
              Save as Draft
            </button>
            <button onClick={() => navigate("/employer/jobs")}
              style={{ width: "100%", padding: "8px", background: "transparent", color: "#94a3b8", border: "none", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>
              Cancel
            </button>
          </div>

          {/* Live Job Card Preview */}
          <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px" }}>
            <div style={{ fontSize: "15px", fontWeight: 500, marginBottom: "14px" }}>Job Card Preview</div>
            <div style={{ border: "1px solid #e2e8f0", borderRadius: "10px", padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 600, color: "white" }}>AC</div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>{form.title || "Job Title Here"}</div>
                  <div style={{ fontSize: "11px", color: "#94a3b8" }}>Acme Corp. Inc.</div>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px" }}>
                {form.city && (
                  <span style={{ fontSize: "11px", color: "#64748b", display: "flex", alignItems: "center", gap: "3px" }}>
                    <i className="ti ti-map-pin" style={{ fontSize: "12px" }} />{form.city.split(",")[0]}
                  </span>
                )}
                {form.jobType && <span style={{ fontSize: "11px", padding: "2px 8px", background: "#f1f5f9", color: "#475569", borderRadius: "4px" }}>{form.jobType}</span>}
                {form.workSetup && <span style={{ fontSize: "11px", padding: "2px 8px", background: "#f1f5f9", color: "#475569", borderRadius: "4px" }}>{form.workSetup}</span>}
              </div>
              {(form.minSalary || form.maxSalary) && (
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>
                  ₱{form.minSalary || "–"}k – ₱{form.maxSalary || "–"}k
                  <span style={{ fontWeight: 400, color: "#94a3b8", fontSize: "11px" }}> /mo</span>
                </div>
              )}
            </div>
          </div>

          {/* AI Writing Assist */}
          <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "12px", padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
              <i className="ti ti-sparkles" style={{ fontSize: "16px", color: "#2563eb" }} />
              <span style={{ fontSize: "13px", fontWeight: 500, color: "#1e40af" }}>AI Writing Assist</span>
            </div>
            <p style={{ fontSize: "12px", color: "#3b82f6", marginBottom: "12px", lineHeight: 1.5 }}>
              Generate a compelling job description based on the title and role type.
            </p>
            <button style={{ width: "100%", padding: "8px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
              <i className="ti ti-sparkles" style={{ fontSize: "14px" }} />
              Generate Description
            </button>
          </div>

        </div>
      </div>
    </EmployerLayout>
  );
}

export default EmployerCreateJob;