import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./Login.jsx";

const Root = () => {
  const [user, setUser] = useState(null);

  // Check localStorage on page load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData)); // Save user data
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data
    setUser(null);
  };

  return (
    <StrictMode>
      {user ? <App user={user} onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
    </StrictMode>
  );
};

createRoot(document.getElementById("root")).render(<Root />);
