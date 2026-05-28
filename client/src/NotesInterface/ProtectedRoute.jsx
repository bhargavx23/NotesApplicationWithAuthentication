import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// why this component is required because we want to protect the notes page from unauthorized access and if user is not logged in then we will redirect them to login page and show an alert message to login first
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      alert("Please login to access this page");
      navigate("/login");
    }
  }, [token, navigate]);

  return children;
};
export default ProtectedRoute;
// so token is assigned to each every user when they login and we can use that token to check if the user is logged in or not and if not then we can redirect them to login page and show an alert message to login first