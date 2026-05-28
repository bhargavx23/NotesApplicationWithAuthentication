const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://notesapplicationwithauthentication.onrender.com";

export const apiUrl = (path) => `${API_BASE_URL}${path}`;
