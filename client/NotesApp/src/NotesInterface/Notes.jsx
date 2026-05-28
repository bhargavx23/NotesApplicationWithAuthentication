import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../api";
const Notes = () => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const handleaddnotes = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        apiUrl("/notes"),
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Notes added successfully");

      settitle("");
      setdescription("");
    } catch (error) {
      console.error("Error occurred while adding notes:", error);
      alert("Failed to add note");
    }

  };
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex  relative flex-col justify-center items-center bg-gradient-to-r from-pink-500 to-purple-500 p-5  gap-5">
      <button
        onClick={() => navigate("/viewnotes")}
        className="bg-green-200 md:absolute top-10 right-10 rounded-lg py-3 px-4 text-black font-bold hover:bg-blue-300"
      >
        View Notes
      </button>
      <h1 className="text-3xl font-bold ">Make your Notes </h1>
      <div className="bg-purple/50-500 p-5 h-1/2 md:h-2/3  rounded-4xl border-1 border-white/30 backdrop-blur-3xl flex flex-col w-full md:w-1/2 w-3/4 justify-center items-center">
        <form
          onSubmit={handleaddnotes}
          className="flex flex-col gap-5 w-full h-3/4 md:w-full justify-center items-center "
        >
          <input
            className="bg-blue-300 outline-none h-30 text-black placeholder:text-black font-light w-3/4 px-2 text-4xl rounded-md"
            placeholder="Notes Title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
          <textarea
            className="bg-purple-400 placeholder:text-black font-light outline-none h-full resize-none text-white w-3/4 p-2 rounded-md text-2xl"
            placeholder="Notes Content"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />
          

          <button className="bg-blue-500 hover:bg-blue-700 text-white w-3/4 font-bold py-2 px-4 rounded">
            Add Notes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Notes;
