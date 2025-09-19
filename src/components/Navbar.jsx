import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const location = useLocation();

  const searchEnabledPaths = ["/", "/home", "/categories", "/new-releases"];
  const isSearchEnabled = searchEnabledPaths.includes(location.pathname);

  
  const getPlaceholderText = () => {
    switch (location.pathname) {
      case "/categories":
        return " 🔍 Search categories...";
      case "/new-releases":
        return " 🔍 Search new releases...";
      default:
        return " 🔍 Search songs...";
    }
  };

  const submit = (e) => {
    e.preventDefault();
    onSearch && onSearch(query);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      <div className="flex items-center">
        <img
          src="https://img.freepik.com/premium-photo/spotify-logo_996353-1684.jpg?semt=ais_incoming&w=740&q=80"
          alt="Spotify Logo"
          className="h-8 sm:h-10 md:h-10 lg:h-14 xl:h-10 w-10 object-contain"
          style={{ maxWidth: '40px' }}
        />
        <span className="hidden sm:inline text-2xl font-bold text-green-600 tracking-wide">Spotify</span>
      </div>
      
      {/* Search now works on all main pages */}
      {isSearchEnabled ? (
        <form onSubmit={submit} className="flex items-center flex-1 max-w-3xl mx-8">
          <input
            className="w-full px-1 py-2 bg-white border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
            placeholder={getPlaceholderText()}
            value={query}
            onChange={handleInputChange}
          />
        </form>
      ) : (
        // Placeholder div to maintain layout spacing
        <div className="flex-1 max-w-3xl mx-8"></div>
      )}
    </nav>
  );
};

export default Navbar;