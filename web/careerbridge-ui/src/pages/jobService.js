const API_URL = `${import.meta.env.VITE_API_URL}/api/jobs`;
// GET ALL JOBS
export const getJobs = async () => {

  const response = await fetch(API_URL);

  return response.json();

};

// CREATE JOB
export const createJob = async (jobData) => {

  const response = await fetch(API_URL, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(jobData)

  });

  return response.json();

};