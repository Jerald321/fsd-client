import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Nav = () => {
   const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        {/* Logo */}
        <div className="flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold text-yellow-400"  onClick={()=>{
            navigate ("/Search")
          }}>Restaurant Booking</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="hover:text-yellow-400 transition duration-300"
            >
              Search
            </Link>

            <Link
              to="/Login"
              className="hover:text-yellow-400 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/Allresturant"
              className="hover:text-yellow-400 transition duration-300"
            >
              Allresturant
            </Link>


            <Link
              to="/Reservation"
              className="hover:text-yellow-400 transition duration-300"
            >
              Reservation
            </Link>
            {/* <Link
              to="/RestaurantProfile"
              className="hover:text-yellow-400 transition duration-300"
            >
              Restaurant Profile
            </Link> */}
            <Link
              to="/UserReview"
              className="hover:text-yellow-400 transition duration-300"
            >
              User Review
            </Link>
            <Link
              to="/Userdetails"
              className="hover:text-yellow-400 transition duration-300"
            >
             Userdetails
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-200 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-7 6h7"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <Link
              to="/"
              className="block px-4 py-2 text-sm hover:bg-gray-700"
            >
              Search
            </Link>
            <Link
              to="/Login"
              className="block px-4 py-2 text-sm hover:bg-gray-700"
            >
              Login
            </Link>
            <Link
              to="/Allresturant"
              className="block px-4 py-2 text-sm hover:bg-gray-700"
            >
              Allresturant
            </Link>


            <Link
              to="/Reservation"
              className="block px-4 py-2 text-sm hover:bg-gray-700"
            >
              Reservation
            </Link>
            {/* <Link
              to="/RestaurantProfile"
              className="block px-4 py-2 text-sm hover:bg-gray-700"
            >
              Restaurant Profile
            </Link> */}
            <Link
              to="/UserReview"
              className="block px-4 py-2 text-sm hover:bg-gray-700"
            >
              User Review
            </Link>
            <Link
              to="/Userdetails"
              className="block px-4 py-2 text-sm hover:bg-gray-700"
            >
             Userdetails
            </Link>
            
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
