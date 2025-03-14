import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from "./Login";
import Blog from "./pages/Blog";
import Register from "./Register";

const App = ({ user, onLogout }) => {
  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
