import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useLogout } from '../../hook/useLogout';

function Dashboard() {
  const [users, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [itemsPerPage] = useState(10); // 10 items per page
  const { logout } = useLogout();

  // Handle page change (next/prev)
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the index of the first and last item on the current page
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handleClick = () => {
    logout();
    navigate('/');
  };

  // Fetching data and showcase in dashboard
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/product/getAll")
      .then((result) => {
        setUser(result.data.data); // Ensure 'data' points to your array of users
      })
      .catch((err) => console.log(err)); // Handle any error
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/admin/product/delete/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // Pagination: calculate page numbers
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map(i => i + 1);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navigation Buttons */}
      <div className="flex gap-4 mb-8">
        <button className="px-6 py-3 bg-green-600 text-white font-semibold text-sm rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200">
          Dashboard
        </button>
        <Link to="/products">
          <button className="px-6 py-3 bg-green-400 text-white font-semibold text-sm rounded-lg shadow-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition duration-200">
            Products
          </button>
        </Link>
        <button
          onClick={handleClick}
          className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition-all"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-gray-700 mb-4 text-center">Showing Product Bar</h1>

        {/* Row-based product layout for product show */}
        <div className="overflow-x-auto border-2 border-green-500 rounded-3xl">
          <table className="table-auto w-full bg-white shadow-lg rounded-3xl overflow-hidden">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Product Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Price (Rs)</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Image</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((result) => (
                <tr key={result._id} className="border-t">
                  {/* ID */}
                  <td className="px-6 py-3 text-sm text-gray-700">{result._id}</td>
                  {/* Product Name */}
                  <td className="px-6 py-3 text-sm font-bold text-gray-800">{result.productName}</td>
                  {/* Description */}
                  <td className="px-6 py-3 text-sm text-gray-600">{result.description}</td>
                  {/* Price */}
                  <td className="px-6 py-3 text-sm font-bold text-green-700">{result.price}</td>
                  {/* Image */}
                  <td className="px-6 py-3">
                    <img
                      src={result.image}
                      alt={result.productName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  {/* Actions */}
                  <td className="px-6 py-3 text-center space-x-4">
                    {/* Update Button */}
                    <Link
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-lg"
                      to={`/productsUpdate/${result._id}`}
                    >
                      Update
                    </Link>
                    {/* Delete Button */}
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded-lg"
                      onClick={() => handleDelete(result._id)} // Add your delete logic
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-4 py-2 rounded-lg ${currentPage === number ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
