import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Reset = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove focus from all elements on page load
    document.activeElement.blur();
   },[]);



  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-sky-900 to-black animate-willow-glow">
      <img  
        onClick={() => navigate("/")}
        src={assets.icon}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-14 sm:w-16 cursor-pointer"
      />
      <form className="bg-slate-500 p-8 rounded-lg shadow-lg w-96 text-sm">
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          No need to change your password.
        </h1>
        <p className="text-center mb-6 text-white">
        Just check your inbox—I've already sent it to you. You're welcome.
        </p>
      </form>
    </div>
  );
};

export default Reset;
