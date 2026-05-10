const API_URL = import.meta.env.VITE_API_URL;

// ✅ GET ALL JOBS
export const getJobs = async () => {

  const res = await fetch(`${API_URL}/api/jobs`);

  const data = await res.json();

  return data.map(job => ({
    id: job.id,

    title: job.title,
    role: job.title,

    company: job.company,
    location: job.location,

    type: job.type,
    status: job.status,
    postedDate: job.postedDate,
    applicants: job.applicants,

    salary: job.salary,
    compensation: job.salary,

    category: "General",
    action: "Apply Now",

    badge: job.company?.charAt(0) || "J",

    summary: job.description,

    requirements: ["No requirements listed"]
  }));
};

// ✅ GET JOB BY ID
export const getJobById = async (id) => {

  const res = await fetch(`${API_URL}/api/jobs/${id}`);

  const job = await res.json();

  return {
    id: job.id,

    title: job.title,
    role: job.title,

    company: job.company,
    location: job.location,

    type: job.type,
    status: job.status,
    postedDate: job.postedDate,
    applicants: job.applicants,

    salary: job.salary,
    compensation: job.salary,

    category: "General",
    action: "Apply Now",

    badge: job.company?.charAt(0) || "J",

    summary: job.description,

    requirements: ["No requirements listed"]
  };
};

// ✅ APPLY
export const applyJob = async (
  jobId,
  resumeFile,
  coverLetter,
  userId
) => {

  const formData = new FormData();

  formData.append("resume", resumeFile);
  formData.append("coverLetter", coverLetter);
  formData.append("jobId", jobId);
  formData.append("userId", userId);

  const res = await fetch(
    `${API_URL}/api/applications/upload`,
    {
      method: "POST",
      body: formData
    }
  );

  return res.text();
};

// ✅ CREATE JOB
export const createJob = async (jobData) => {

  const res = await fetch(`${API_URL}/api/jobs`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(jobData),
  });

  return res.json();
};