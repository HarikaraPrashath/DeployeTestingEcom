import React, { useState, useEffect } from "react";
import { useOrderPlacement } from "../../hook/useOrderPlacement";
import { useAuthContext } from "../../hook/useAuthContext";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

function PopupForm({ onClose, productName, productPrice,onSuccessfulPurchase,productImage}) {
  const { dispatch } = useOrderPlacement();
  const { user } = useAuthContext();

  const [cardNumber, setCardNumber] = useState("");
  const [yearMonth, setYearMonth] = useState("");
  const [cnn, setCnn] = useState("");
  const [price, setPrice] = useState("");
  const [visaMasterCard, setVisaMasterCard] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

console.log("productImage",productImage);

  useEffect(() => {
    setPrice(productPrice); // Set initial price
  }, [productPrice]);

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 16); // Remove non-digits and limit to 16
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1-"); // Format as xxxx-xxxx-xxxx-xxxx
    setCardNumber(formattedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const orderPayment = { cardNumber, yearMonth, cnn, price,productImage, visaMasterCard, productName, productPrice };

    const response = await fetch("http://localhost:5000/api/order/make", {
      method: "POST",
      body: JSON.stringify(orderPayment),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    } else {
      setCardNumber("");
      setYearMonth("");
      setCnn("");
      setPrice("");
      setVisaMasterCard("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_ORDER", payload: json });
  
    }
    setTimeout(() => {
      // Simulate successful payment
      onSuccessfulPurchase(); // Notify parent component of successful purchase
      onClose(); // Close the popup
    }, 1000); // Simulate network delay
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 md:w-1/3">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Purchase</h2>
        <img src={productImage} alt=""  className="w-10 h-10"/>
        <p className="text-lg text-gray-600 mb-4">
          Product: <strong>{productName}</strong>
        </p>
        <p className="text-lg text-gray-600 mb-4">
          Price: <strong>{productPrice}</strong>
        </p>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Card Number */}
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-gray-700 font-medium">
              Card Number:
            </label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={handleCardNumberChange}
              required
              maxLength="19" // Max length considering dashes
              className="w-full border rounded-md p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="xxxx-xxxx-xxxx-xxxx"
            />
          </div>

          {/* Expiration Date (Year & Month) */}
          <div className="mb-4">
            <label htmlFor="yearMonth" className="block text-gray-700 font-medium">
              Expiration Date:
            </label>
            <DatePicker
              id="yearMonth"
              selected={yearMonth}
              onChange={(date) => setYearMonth(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              placeholderText="Select expiration date"
              required
              className="w-full border rounded-md p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* CNN */}
          <div className="mb-4">
            <label htmlFor="cnn" className="block text-gray-700 font-medium">
              CNN (3 digits):
            </label>
            <input
              type="number"
              id="cnn"
              value={cnn}
              onChange={(e) => setCnn(e.target.value.slice(0, 3))}
              required
              maxLength="3"
              className="w-full border rounded-md p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="XXX"
            />
          </div>

          {/* Card Type */}
          <div className="mb-4">
            <label htmlFor="visaMasterCard" className="block text-gray-700 font-medium">
              Card Type:
            </label>
            <select
              id="visaMasterCard"
              value={visaMasterCard}
              onChange={(e) => setVisaMasterCard(e.target.value)}
              required
              className="w-full border rounded-md p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Card Type</option>
              <option value="Visa">Visa</option>
              <option value="MasterCard">MasterCard</option>
            </select>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-400 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupForm;
