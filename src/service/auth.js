import axios from "./baseURL";

export const login = async (credentials) => {
  try {
    const reponse = await axios.post("auth/login", credentials);
    const token = reponse.data.accessToken;
    localStorage.setItem("token", token);
    return reponse.data;
  } catch (error) {
    console.log("Login Failed", error);
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  alert("Logout Successful");
};
