// src/components/Navbar.jsx
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full flex flex-row justify-center items-center text-xl py-2 font-semibold gap-4 h-fit mb-2 bg-transparent text-white">
      <NavLink to="/quiz">Quiz</NavLink>
      <NavLink to="/leaderboard">Leaderboard</NavLink>
      <NavLink to="/">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </nav>
  );
};

export default Navbar;
