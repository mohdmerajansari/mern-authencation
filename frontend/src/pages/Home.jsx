import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../utils";
import Navbar from "../components/Navbar";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();

  const handleLogout = (e) => {
    localStorage.removeItem("LoggedInUser");
    localStorage.removeItem("Token");
    handleSuccess("User logout successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("LoggedInUser"));
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4">
            Welcome, {loggedInUser}
          </h1>
          <button
            onClick={(e) => handleLogout(e)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Home;
