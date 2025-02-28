import React from "react";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaSquareXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <div className="bg-green-800 text-white py-10 flex">
      <div className="container mx-auto flex justify-between px-10">
        {/* Logo and Social Media */}
        <div className="w-full md:w-1/3 mb-6">
        <div className="flex-[20%] flex items-center">
          <span className="text-3xl font-bold text-green-500">R</span>
          <span className="text-3xl font-bold text-white">ivo</span>
          <div className="w-3 h-3 bg-green-500 rounded-full ml-1"></div>
        </div>
          <p className="mt-4 text-sm">Stay connected with us through social media.</p>
          <div className="flex mt-4 space-x-4">
            <FaFacebook className="text-3xl hover:text-blue-500 cursor-pointer" />
            <RiInstagramFill className="text-3xl hover:text-pink-500 cursor-pointer" />
            <FaSquareXTwitter className="text-3xl hover:text-blue-400 cursor-pointer" />
          </div>
        </div>

        {/* Shop Section */}
        <div className="w-full md:w-1/5 mb-6">
          <h2 className="text-xl font-semibold mb-4">Shop</h2>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">Product</li>
            <li className="hover:underline cursor-pointer">Overview</li>
            <li className="hover:underline cursor-pointer">Pricing</li>
            <li className="hover:underline cursor-pointer">Release</li>
          </ul>
        </div>

        {/* Company Section */}
        <div className="w-full md:w-1/5 mb-6">
          <h2 className="text-xl font-semibold mb-4">Company</h2>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">About Us</li>
            <li className="hover:underline cursor-pointer">Contact</li>
            <li className="hover:underline cursor-pointer">News</li>
            <li className="hover:underline cursor-pointer">Support</li>
          </ul>
        </div>

        {/* Subscription Section */}
        <div className="w-full md:w-1/3">
          <h2 className="text-xl font-semibold mb-4">Stay Up to Date</h2>
          <p className="text-sm mb-4">Subscribe to get the latest updates and offers.</p>
          <form className="flex items-center space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-white font-semibold"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Footer;
