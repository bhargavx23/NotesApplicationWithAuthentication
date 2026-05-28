import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignupPage from "./signupAndloginpages/SignupPage.jsx";
import LoginPage from "./signupAndloginpages/LoginPage.jsx";
import Notes from "./NotesInterface/Notes.jsx";
import ProtectedRoute from "./NotesInterface/ProtectedRoute.jsx";
import ViewNotes from "./NotesInterface/ViewNotes.jsx";
import OpeningPage from "./NotesInterface/OpeningPage.jsx";

const getStoredUserName = () => {
  const userString = localStorage.getItem("user");

  if (!userString) {
    return "";
  }

  try {
    const user = JSON.parse(userString);
    return user?.name || "";
  } catch (e) {
    console.error("Error parsing user from localStorage", e);
    return "";
  }
};

const App = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [username, setUsername] = useState(getStoredUserName);

  const handleAuth = (user) => {
    setToken(localStorage.getItem("token"));
    setUsername(user?.name || getStoredUserName());
  };

  // logout function to remove token and user from localStorage and redirect to login page
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUsername("");
    alert("Logout successful");
    navigate("/login");
  };

  return (
    <div>
      <div
        className={`h-16 w-full  flex ${!token ? "hidden" : "flex"} justify-between  items-center p-4`}
      >
        <div className='flex items-center gap-4 p-2 bg-purple-500 rounded-lg'>
          <h1 className=" text-xl md:text-3xl font-light ">
            Welcome {username}
          </h1>
        </div>
        <div className="flex items-center gap-4 bg-purple-500 p-2 rounded-lg">
          <span className="text-black rounded-full flex h-10 w-10   justify-center items-center font-bold bg-white">
            {" "}
            {username.charAt(0).toUpperCase()}
          </span>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Logout
          </button>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<OpeningPage />} />
        <Route path="/signup" element={<SignupPage onAuth={handleAuth} />} />
        <Route path="/login" element={<LoginPage onAuth={handleAuth} />} />
        <Route
          path="/viewnotes"
          element={
            <ProtectedRoute>
              <ViewNotes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
