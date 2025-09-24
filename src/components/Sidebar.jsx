import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-[#0f1720] text-white min-h-screen p-4 fixed top-0 left-0 h-screen z-40">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Spotify Remix</h2>
        </div>
        <nav className="flex-1">
          <ul className="space-y-3">
            <li>
              <button onClick={() => navigate("/home")} className="w-full py-2 px-3 rounded bg-green-500 text-white hover:bg-green-600 mt-3">Home</button>
            </li>
            <li>
              <button onClick={() => navigate("/categories")} className="w-full py-2 px-3 rounded bg-blue-500 text-white hover:bg-blue-600 mb-2">Categories</button>
              <button onClick={() => navigate("/new-releases")} className="w-full py-2 px-3 rounded bg-purple-500 text-white hover:bg-purple-600">New Release</button>
            </li>
            <li>
              <button onClick={() => navigate("/liked")} className="w-full py-2 px-3 rounded bg-pink-500 text-white hover:bg-pink-600">Liked</button>
            </li>
          </ul>
        </nav>
        <div className="mt-6">
          <button onClick={logout} className="w-full py-2 bg-red-500 rounded text-white hover:bg-red-600">Logout</button>
        </div>
      </aside>

      {/* Mobile Horizontal Sidebar */}
      <nav className="flex md:hidden fixed top-16 left-0 w-full bg-[#0f1720] z-40 border-b border-gray-300">
        <ul className="flex justify-around items-center py-2">
          <li>
            <button onClick={() => navigate("/home")} className="px-3 py-2 rounded bg-green-500 text-white text-xs m-2">Home</button>
          </li>
          <li>
            <button onClick={() => navigate("/categories")} className="px-3 py-2 rounded bg-blue-500 text-white text-xs m-2">Categories</button>
          </li>
          <li>
            <button onClick={() => navigate("/new-releases")} className="px-3 py-2 rounded bg-purple-500 text-white text-xs m-2">New Release</button>
          </li>
          <li>
            <button onClick={() => navigate("/liked")} className="px-3 py-2 rounded bg-pink-500 text-white text-xs m-2">Liked</button>
          </li>
          <li>
            <button onClick={logout} className="px-3 py-2 rounded bg-red-500 text-white text-xs m-2">Logout</button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
