import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Remove if not using React Router
import { Menu, X } from "lucide-react";

export default function Navbar({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!user); // Check if user exists
  }, [user]);

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">MyApp</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
          <li><Link to="/about" className="hover:text-gray-400">About</Link></li>
          <li><Link to="/blog" className="hover:text-gray-400">Blog</Link></li>
          <li><Link to="/contact" className="hover:text-gray-400">Contact</Link></li>
          
          {/* Show Login or Logout */}
          {isLoggedIn ? (
            <li>
              <button 
                onClick={onLogout} 
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </li>
          ) : (
            <li><Link to="/login" className="hover:text-gray-400">Login</Link></li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center bg-gray-800 p-4 space-y-4">
          <li><Link to="/" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/about" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/blog" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Blog</Link></li>
          <li><Link to="/contact" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Contact</Link></li>

          {/* Show Login or Logout in Mobile Menu */}
          {isLoggedIn ? (
            <li>
              <button 
                onClick={() => { setIsOpen(false); onLogout(); }} 
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </li>
          ) : (
            <li><Link to="/login" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Login</Link></li>
          )}
        </ul>
      )}
    </nav>
  );
}
