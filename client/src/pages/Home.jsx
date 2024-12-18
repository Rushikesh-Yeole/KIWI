import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {

useEffect(()=>{
  getUserData();
},[])

  const { userData, backendUrl, setIsLoggedIn, getUserData } = useContext(AppContent);

  // const getAuthState = async () => {
  //   try {
  //     const token = localStorage.getItem("token");

  //     if (token) {
  //       axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  //       const { data } = await axios.get(backendUrl + '/api/auth/is-auth');
  //       if (data.success) {
  //         setIsLoggedIn(true);
  //       } else {
  //         setIsLoggedIn(false);
  //       }
  //     } else {
  //       setIsLoggedIn(false);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const [selectedService, setSelectedService] = useState("");
  const accountOptions = ["Instagram", "Snapchat", "Google", "Facebook", "Twitter", "LinkedIn"];

  const handleAction = async (actionType) => {
    try {
      const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(`${backendUrl}/api/service/${actionType}`, {
        service: selectedService,
        timestamp,
      });

      data.success ? toast.success(`Key ${actionType}d for: ${selectedService}`) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const renderServiceForm = () => (
    <div className="bg-slate-900 p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-sm text-indigo-300 text-sm">
      <h2 className="text-3xl font-semibold text-white text-center mb-3">Choose a Service</h2>
      <p className="text-center text-sm mb-6">Select the service/account you want to manage.</p>
      <form>
        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] relative">
          <select
            className="bg-transparent outline-none w-full text-white appearance-none overflow-y-auto max-h-40 sm:max-h-60"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            required
          >
            <option value="" disabled>Select a Service</option>
            {accountOptions.map((option, index) => (
              <option key={index} value={option} className="bg-slate-700 text-white">{option}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-between gap-4">
          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-green-500 to-green-900 text-white font-medium" onClick={(e) => { e.preventDefault(); handleAction("create"); }}>
            Create
          </button>
          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-900 text-white font-medium" onClick={(e) => { e.preventDefault(); handleAction("retrieve"); }}>
            Retrieve
          </button>
        </div>
      </form>
    </div>
  );

  const renderUnverifiedMessage = () => (
    <div>
      <form className="bg-slate-500 p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-sm text-sm">
        <h1 className="text-white text-center text-5xl font-bold mb-4 pt-8 whitespace-nowrap">NeoKey</h1>
        <h2 className="text-center text-white">A Deterministic Key Gen & Retrieval platform</h2>
        <p className="text-center mb-6 text-white">No storage, No breaches, Just Unbreakable Precision.</p>
      </form>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-sky-900 to-black animate-pulse-smooth">
      <Navbar />
      {userData && userData.isAccountVerified ? renderServiceForm() : renderUnverifiedMessage()}
    </div>
  );
};

export default Home;
