import  { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true); 

  useEffect(() => {
    try {
      const token = localStorage.getItem("jwt_token");
      const savedUser = localStorage.getItem("username");
      if (token && savedUser) {
        setUser(savedUser);
      }
    } finally {
      setInitializing(false); 
    }
  }, []);

  const login = (username) => {
    setUser(username);
    localStorage.setItem("username", username);
    
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("username");
    localStorage.removeItem("hasSeenWelcome");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, initializing }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;