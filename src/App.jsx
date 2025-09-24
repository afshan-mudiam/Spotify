import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext} from "./context/AuthContext";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import NewReleased from "./components/NewReleased";
import ItemDetails from "./components/ItemDetails"; 
import LikedProvider from "./context/LikedContext";
import Liked from "./components/Liked";
import PlayerProvider from "./context/PlayerContext";
import Player from "./components/Player";

const AppContent = () => {
  const { user, initializing } = useContext(AuthContext);
  const [search, setSearch] = React.useState("");

  if (initializing) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white text-xl">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <PlayerProvider>
      <div className="flex bg-black min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar onSearch={setSearch} />
          <div className="p-6">
            <Routes>
              <Route path="/home" element={<Home search={search} />} />
              <Route path="/categories" element={<Categories search={search} />} />
              <Route path="/new-releases" element={<NewReleased search={search} />} />
              <Route path="/liked" element={<Liked search={search} />} />
              <Route path="/details/:id" element={<ItemDetails search={search} />} />
              {/* Default redirect */}
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </div>
        </div>
        <Player />
      </div>
    </PlayerProvider>
  );
};

const App = () => (
  <AuthProvider>
    <LikedProvider>
      <Router>
        <AppContent />
      </Router>
    </LikedProvider>
  </AuthProvider>
);

export default App;
