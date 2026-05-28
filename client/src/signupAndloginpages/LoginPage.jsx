import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../api";

const LoginPage = ({ onAuth }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const credentials = { email, password };
    try {
      const response = await axios.post(
        apiUrl("/login"),
        credentials
      );
      console.log(response.data);

      // store token and user in local storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      if (response.status === 200) {
        onAuth(response.data.user);
        alert("Login successful");
        navigate("/notes");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Error occurred while logging in:", error);
    }
  };

  return (
    <div className="bg-gradient-to-t from-blue-500/50 to-pink-500/20 h-screen w-full  flex justify-center items-center">
      <div className="bg-blue-300 md:h-3/4 h-1/2 w-3/4 md:w-1/2 rounded-3xl flex flex-col items-center justify-center gap-5">
        <h1 className="text-4xl font-bold text-center">Login</h1>
        <div className=" md:bg-white/20 h-3/4  md:h-3/4 p-5 flex flex-col justify-center gap-5 w-3/4 mx-auto rounded-lg">
          <form
            onSubmit={handlesubmit}
            className="flex flex-col gap-5 h-full w-full justify-center items-center"
          >
            <input
              className="bg-black/20 outline-none text-white p-2 md:w-3/4 rounded-md w-full"
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              className="bg-black/20 outline-none text-white p-2 md:w-3/4 rounded-md w-full"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 animate-pulse w-full md:w-3/4 p-2 rounded-md text-white font-bold"
            >
              Submit
            </button>
          </form>

          {/* // navigate to signup page */}
          <p onClick={() => navigate("/signup")}>
            {" "}
            Register here
            <span className="text-blue-500 cursor-pointer underline p-2">
              Signup
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
