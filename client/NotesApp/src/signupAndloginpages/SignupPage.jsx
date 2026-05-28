import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SignupPage = ({ onAuth }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const credentials = { name, email, password };
    try {
      const response = await axios.post(
        "http://localhost:5000/signup",
        credentials
      );
      console.log(response.data);
      // store token and user in local storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      if (response.status === 201) {
        onAuth(response.data.user);
        alert("Signup successful");
        navigate("/notes");
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.error("Error occurred while signing up:", error);
    }
    setname("");
    setemail("");
    setpassword("");
  };
  return (
    <div className="bg-gradient-to-t from-blue-500/50 to-pink-500/20 h-screen w-full  flex justify-center items-center">
      <div className="bg-blue-300 md:h-3/4 md:max-h-3/4 h-1/2 w-3/4 md:w-1/2 rounded-3xl flex flex-col items-center justify-center gap-5">
        <h1 className="md:text-4xl text-2xl font-bold text-center ">SignUp</h1>
        <div className=" md:bg-white/20 h-3/4 p-4 flex flex-col justify-center gap-5 w-full md:w-3/4 mx-auto items-center rounded-lg">
          <form
            onSubmit={handlesubmit}
            className="flex flex-col gap-5 h-full w-3/4 md:w-full justify-center items-center"
          >
            <input
              className="bg-black/20 outline-none text-white p-2 rounded-md md:w-3/4 w-full"
              placeholder="Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <input
              className="bg-black/20 outline-none text-white p-2 rounded-md md:w-3/4 w-full"
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              className="bg-black/20 outline-none text-white p-2 rounded-md md:w-3/4 w-full"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 animate-pulse w-full md:w-3/4 p-2 rounded-md text-white font-bold"
            >
              {" "}
              Signup
            </button>
          </form>

          <p onClick={() => navigate("/login")}>
            {" "}
            already have account{" "}
            <span className="text-blue-500 cursor-pointer underline p-2">
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
