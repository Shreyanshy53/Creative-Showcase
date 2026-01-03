
const API = import.meta.env.VITE_API_URL;

/* Landing Page Feed */
export const fetchFeed = async () => {
  const res = await fetch(`${API}/feed`);
  return res.json();
};

/* Signup */
export const signup = async (data) => {
  const res = await fetch(`${API}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

/* Login */
export const login = async (data) => {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

/* Upload Image */
export const uploadImage = async (file, token) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API}/images/upload`, {
    method: "POST",
    headers: {
      Authorization: token
    },
    body: formData
  });

  return res.json();
};

/* Public Profile */
export const getProfile = async (username) => {
  const res = await fetch(`${API}/profile/${username}`);
  return res.json();
};

/* Logged-in User Images (Dashboard) */
export const getMyImages = async (token) => {
  const res = await fetch(`${API}/images/my`, {
    headers: {
      Authorization: token
    }
  });
  return res.json();
};
