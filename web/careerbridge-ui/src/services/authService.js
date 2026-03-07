const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  return response.json();
};

export const register = async (fullName, email, password, role) => {

  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fullName,
      email,
      password,
      role
    })
  });

  const data = await response.json();

  if(!response.ok){
    throw new Error(data.message);
  }

  return data;
};