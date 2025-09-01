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

const AppContent = () => {
  const { user, initializing } = useContext(AuthContext);

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
    <div className="flex bg-black min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/new-releases" element={<NewReleased />} />

            {/* ✅ Details page */}
            <Route path="/details/:id" element={<ItemDetails />} />

            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>
);

export default App;
