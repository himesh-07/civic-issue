import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 itext-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xl">C</span>
            </div>
            <h1 className="text-2xl font-bold text-white ">CIVIC SOLVE</h1>
          </Link>
          
          <nav className="hidden md:flex  text-white space-x-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/report" className="hover:text-indian-lightGreen transition-colors">Report Issue</Link>
            <Link to="/profile" className="hover:text-indian-lightGreen transition-colors">My Reports</Link>
            <Link to="/admin" className="hover:text-indian-lightGreen transition-colors">Admin</Link>
          </nav>
          
          <div className="flex space-x-4">
            <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-indian-lightGreen transition-colors">
              Login
            </Link>
            <Link to="/register" className="bg-indian-saffron text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors">
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;