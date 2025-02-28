import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hook/useAuthContext";

function NavbarOther() {
  const { user } = useAuthContext();

  useEffect(() => {
    if (user && user.user) {
      console.log("User from AuthContext in navbar", user);
      console.log("User id:", user.user.id);
      console.log("User email:", user.user.email);
      console.log("User role:", user.user.role);
    } else {
      console.log("User is null or undefined");
    }
  }, [user]);

  return (
    <div>
      <div className="relative flex items-center justify-between px-8 py-4 backdrop-blur-md bg-green-900">
        {/* Logo Section */}
        <div className="flex-[20%] flex items-center">
          <span className="text-3xl font-bold text-green-500">R</span>
          <span className="text-3xl font-bold text-white">ivo</span>
          <div className="w-3 h-3 bg-green-500 rounded-full ml-1"></div>
        </div>

        {/* Menu Section */}
        <div className="flex-[60%] flex gap-8 justify-center items-center">
          <Link
            to="/"
            className="hover:text-green-600 cursor-pointer text-white transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="hover:text-green-600 cursor-pointer text-white transition duration-300"
          >
            Shop
          </Link>
          <Link
            to="/feature"
            className="hover:text-green-600 cursor-pointer text-white transition duration-300"
          >
            Feature
          </Link>
          <Link
            to="/contact"
            className="hover:text-green-600 cursor-pointer text-white transition duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Login/Profile Section */}
        <div className="flex-[20%] flex justify-end items-center gap-4">
          {user && user.user ? (
            user.user.role === "admin" ? (
              <Link
                to="/admin-dashboard"
                className="bg-green-600 text-white py-2 px-6 rounded-lg shadow hover:bg-green-700 hover:shadow-lg transition duration-300"
              >
                 Dashboard
              </Link>
            ) : (
              <Link
                to={`/userProfile/${user.user.id}`}
                className="bg-green-600 text-white py-2 px-6 rounded-lg shadow hover:bg-green-700 hover:shadow-lg transition duration-300"
              >
                Profile
              </Link>
            )
          ) : (
            <Link
              to="/login"
              className="bg-green-600 text-white py-2 px-6 rounded-lg shadow hover:bg-green-700 hover:shadow-lg transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavbarOther;
