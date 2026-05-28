import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ViewNotes = () => {
  const [notes, setnotes] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchnotes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/notes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setnotes(response.data.data || []);
      } catch (error) {
        console.error("Error occurred while fetching notes:", error);
      }
    };
    fetchnotes();
  }, [token]);

  // delete note function to delete note by id and update the notes state
  const DeleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setnotes((currentNotes) =>
        currentNotes.filter((note) => note._id !== id),
      );
    } catch (error) {
      console.error("Error occurred while deleting note:", error);
    }
  };

  // edit note functionality to edit note by id and update the notes state
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");

  const handleEditClick = (note) => {
    setNoteToEdit(note);
    settitle(note.title);
    setdescription(note.description);
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/notes/${noteToEdit._id}`,
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setnotes((prev) =>
        prev.map((oldNote) =>
          oldNote._id === noteToEdit._id
            ? { ...oldNote, title, description }
            : oldNote,
        ),
      );
      setNoteToEdit(null);
      alert("Note updated successfully");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // search functionality to search notes by title or description
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredNotes = notes.filter((note) => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return (
      note.title.toLowerCase().includes(query) ||
      note.description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="h-screen w-full realtive  flex justify-center items-center flex-col gap-5 p-5">
      <input
        type="text"
        placeholder="Search notes..."
        className="bg-purple-300 p-2 rounded-lg border border-gray-300 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className="w-full flex justify-start p-5">
        <button
          onClick={() => navigate("/notes")}
          className="bg-blue-500 text-white py-2 px-4  text-2xl rounded-lg"
        >
          Back
        </button>
      </div>
      <div className="flex flex-col justify-center items-start h-screen w-full  grid  md:grid-cols-3 gap-5 overflow-y-auto scrollbar-none">
        {filteredNotes.map((note) => {
          return (
            <div
              key={note._id}
              className="bg-purple-500  rounded-2xl max-h-[400px] w-full flex flex-col gap-3"
            >
              <h1 className="text-black bg-purple-300 p-5 text-3xl font-md uppercase rounded-tl-2xl rounded-tr-2xl ">
                <span className="font-bold text-4xl font-light">Title : </span>{" "}
                {note.title}
              </h1>
              <span className="font-bold p-2 text-4xl font-light text-white">
                Content
              </span>
              <div className=" p-3 rounded-lg h-ful l flex self-center w-full  overflow-y-auto scrollbar-none">
                <p className="text-black text-xl">{note.description}</p>
              </div>
              <div className="flex justify-end gap-3 p-3">
                <button
                  onClick={() => {
                    DeleteNote(note._id);
                  }}
                  className="bg-red-500 text-white p-2 font-bold w-fit rounded-md"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEditClick(note)}
                  className="bg-green-500 text-white p-3 rounded-md w-fit font-bold"
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}

        {noteToEdit && (
          <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex  justify-center items-center z-50">
            <form
              onSubmit={handleUpdateNote}
              className="bg-purple-500 p-8 rounded-lg flex flex-col gap-4 w-3/4 md:w-1/3"
            >
              <h2 className="text-2xl text-white font-medium">Edit Note</h2>
              <input
                className=" p-2 rounded bg-white/30 outline-none"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
              <textarea
                className=" bg-white/30 p-2 rounded h-32 outline-none resize-none"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-500 text-white p-2 rounded flex-1"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setNoteToEdit(null)}
                  className="bg-gray-500 text-white p-2 rounded flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
export default ViewNotes;
