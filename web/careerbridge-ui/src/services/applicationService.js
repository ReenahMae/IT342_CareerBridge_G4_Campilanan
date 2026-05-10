const API_URL = import.meta.env.VITE_API_URL;

export const getAllApplications = async () => {

  const token = localStorage.getItem("token");

  const res = await fetch(
    `${API_URL}/api/applications`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await res.json();
};