import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Shopping() {
  const [users, setUsers] = useState([]);

  // Fetching products data
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/product/getAll")
      .then((result) => {
        setUsers(result.data.data); // Ensure correct data mapping
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="font-extrabold text-4xl text-center my-8 text-green-700">
        Our Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {users.map((product) => (
          <div
            key={product._id}
            className="flex flex-col bg-white shadow-lg border-2 border-gray-300 rounded-xl overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl duration-300"
          >
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.productName}
              className="w-full h-64 object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
            />

            {/* Product Info */}
            <div className="flex-1 flex flex-col justify-between px-6 py-4">
              <div>
                <h2 className="font-semibold text-xl text-gray-800">{product.productName}</h2>
                <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                <p className="text-center font-bold text-xl text-green-700 mt-4">
                  Rs {product.price} <span>=</span>
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex justify-center mt-4">
                <Link
                  className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 py-3 text-center text-lg font-semibold transition-colors duration-200"
                  to={`/productDescShopping/${product._id}`}
                >
                  Get Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shopping;
