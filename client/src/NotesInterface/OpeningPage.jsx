import { useNavigate } from "react-router-dom";

const OpeningPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen  w-full flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-green-500 ">
      <h1 className="md:text-8xl text-5xl text-white fadeIn md:text-black font-bold mono text-center ">
        Mern Notes App !!{" "}
      </h1>
      <span className=" transition duration-600 text-yellow-500 fadeIn  font-extrabold md:text-7xl text-center mt-3 text-3xl stroke-3 stroke-black ">
        Authentication Implemented
      </span>

      <h1 className="text-3xl font-light text-center p-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full ext-center mt-10 text-white shadow-black shadow-lg ">
        @BhargavPasupuleti
      </h1>
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/signup")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Signup
        </button>
        <button
          onClick={() => navigate("/login")}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default OpeningPage;
