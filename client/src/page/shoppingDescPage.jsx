import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PopupForm from "../components/popupForm/formPopup";

function ShoppingDescPage() {
  const { id } = useParams(); // Get the product ID from URL
  const [product, setProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const [successMessage, setSuccessMessage] = useState(""); // State to manage success notification

  // Fetch product details based on the ID
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/admin/product/getOne/${id}`)
      .then((response) => {
        setProduct(response.data.data); // Ensure correct data structure
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>; // Display loading state while fetching data
  }

  // Function to handle successful purchase
  const handleSuccessfulPurchase = () => {
    setShowPopup(false); // Close the popup
    setSuccessMessage("Successfully bought the product!"); // Show success message
    setTimeout(() => {
      setSuccessMessage(""); // Hide success message after 3 seconds
    }, 3000);
  };


  console.log("products",product);
  return (
    <div className="w-full bg-gray-50 p-8">
      {/* Product Information Section */}
      <div className="flex gap-8 bg-white shadow-xl rounded-lg p-8 w-full">
        <div className="flex-[30%]">
          <img
            src={product.image}
            alt={product.productName}
            className="w-full h-auto rounded-xl shadow-md transform transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="flex-[70%] space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">{product.productName}</h2>
          <p className="text-xl text-gray-700 font-semibold">
            Rs {product.price}/=
          </p>
          <p className="text-gray-600 text-lg">{product.description}</p>

          {/* Customer Feedback Section */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-700">Customer Feedback</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <div className="flex space-x-2">
                  <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                  <p className="text-gray-600 text-sm">"Great quality! Highly recommend."</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex space-x-2">
                  <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                  <p className="text-gray-600 text-sm">"Amazing product! Worth every penny."</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex space-x-2">
                  <span className="text-yellow-500">⭐⭐⭐⭐</span>
                  <p className="text-gray-600 text-sm">"Good quality but could be improved in packaging."</p>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications Section */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-700">Specifications</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-600">Brand: {product.brand || 'Not specified'}</li>
              <li className="text-gray-600">Weight: {product.weight || 'Not available'}</li>
              <li className="text-gray-600">Dimensions: {product.dimensions || 'Not available'}</li>
              <li className="text-gray-600">Material: {product.material || 'Not specified'}</li>
            </ul>
          </div>

          {/* Action Button */}
          <button
            onClick={() => setShowPopup(true)} // Show popup on button click
            className="bg-green-600 text-white text-lg font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-green-700 transition-colors"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Show success message */}
      {successMessage && (
        <div className="mt-4 p-4 bg-green-600 text-white rounded-lg text-center">
          {successMessage}
        </div>
      )}

      {/* Render the popup modal if showPopup is true */}
      {showPopup && (
        <PopupForm
          onClose={() => setShowPopup(false)} // Close the popup
          productName={product.productName} // Pass product name as a prop
          productPrice={product.price}
          onSuccessfulPurchase={handleSuccessfulPurchase}
          productImage ={product.image} // Callback to handle successful purchase
        />
      )}
    </div>
  );
}

export default ShoppingDescPage;
