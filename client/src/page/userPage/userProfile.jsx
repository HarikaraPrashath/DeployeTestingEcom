import React, { useEffect, useState } from "react";
import demoPic from "../../assets/image/best-2.jpg";
import { useParams } from "react-router-dom";
import { useLogout } from "../../hook/useLogout";
import { useNavigate } from "react-router-dom";
import { useOrderPlacement } from "../../hook/useOrderPlacement";
import { useAuthContext } from "../../hook/useAuthContext";
import axios from "axios";

// need to check Profile
function UserProfile() {
  const { orderPlacement, dispatch } = useOrderPlacement();
  const [productForUser, setProductForUser] = useState([]);
  const { user } = useAuthContext();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user ? user.user.name : "John Doe",
    phone: "+1 234 567 890",
    location: "San Francisco, CA",
  }); // need to edit this
  const { logout } = useLogout();
  const navigate = useNavigate();

  // Logout Method
  const handleClick = () => {
    logout();
    navigate("/");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log("Formdata",formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/api/details/postprofile", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (!response.ok) {
      console.log("upload ok", response);
      }
    } catch (error) {
      console.log("error have while editing profile", error);
    }
    setIsEditing(false);
  };

  //handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      axios
        .delete(`http://localhost:5000/api/order/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log("Delete successful:", res);
          setOrders((prevOrders) =>
            prevOrders.filter((order) => order._id !== id)
          );
        })
        .catch((err) => console.error("Error deleting the order:", err));
    }
  };

  // const handleEditClick = () => {
  //   setFormData({
  //     name: user?.user.name || "",
  //     phone: formData.phone,  // Keep the latest phone value
  //     location: formData.location,  // Keep the latest location value
  //   });
  //   setIsEditing(true);
  // };
  

  //fetching ordr list for user
  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!user || !user.token) {
        console.error("No user or token available");
        return;
      }
      try {
        const response = await fetch(
          "http://localhost:5000/api/order/getorderlist",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(
          "Authorization Header inside the use Effect:",
          `Bearer ${user.token}`
        );
        // console.log("Response Status:", response.status);
        // console.log("Response Headers:", response.headers);
        console.log("Request Headers:", {
          Authorization: `Bearer ${user.token}`,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("data is ", data);

        setProductForUser(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchWorkouts();
  }, [user]);

  return (
    <div className="min-h-screen">
      {/* User Profile Section */}
      <div className="w-full lg:w-[1200px] mx-auto mt-10 p-6 mb-8 bg-gray-100 shadow-lg rounded-3xl flex flex-col md:flex-row m-[1px] gap-6">
        {/* Profile Picture */}
        <div className="flex-[30%] flex justify-center items-center">
          <div className="relative">
            <img
              src={demoPic}
              alt="profile"
              className="rounded-full h-60 w-60 object-cover border-4 border-green-500 shadow-lg"
            />
            <div className="absolute inset-8 bg-black/30 rounded-full opacity-0 hover:opacity-100 transition-opacity flex justify-center items-center">
              <p className="text-white font-semibold">Edit Profile</p>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="flex-[70%] text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800">{formData.name}</h2>
          <p className="text-lg text-gray-600">
            Software Engineer at XYZ Company
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {user.user.email}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Phone:</span> {formData.phone}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Location:</span>{" "}
              {formData.location}
            </p>
          </div>
          {/* Edit Profile Modal */}
          {isEditing && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <label className="block font-semibold">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block font-semibold">
                      Email (unchangeable)
                    </label>
                    <input
                      type="email"
                      value={user.user.email}
                      className="w-full px-3 py-2 border rounded-md bg-gray-200 cursor-not-allowed"
                      disabled
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block font-semibold">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-semibold">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {/* Action Buttons */}
          <div className="mt-6 flex justify-center md:justify-start gap-4">
          <button
          onClick={() => setIsEditing(true)}
          className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg shadow-md hover:bg-gray-300 transition-all"
        >
          Edit Profile
        </button>
            <button
              onClick={handleClick}
              className="px-6 py-2 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Order Section */}
      <div className="bg-gray-100 shadow-lg rounded-xl p-6 mt-8 mx-auto w-11/12 md:w-3/4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Your Orders
        </h3>

        <div className="space-y-4">
          {productForUser && productForUser.length > 0 ? (
            productForUser.map((result) => {
              if (user && user.id === result.id) {
                return (
                  <div
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-all"
                    key={result._id}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={result.productImage}
                        alt="order item"
                        className="h-20 w-20 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {result.productName}
                        </p>
                        <p className="text-gray-600">Order ID: {result._id}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-gray-700 font-semibold">
                        Status: Delivered
                      </p>
                      <p className="text-gray-600">
                        Total: {result.productPrice}/=
                      </p>
                      <button className="mt-2 text-sm text-blue-500 hover:underline">
                        View Details
                      </button>
                      <br />{" "}
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded-lg"
                        onClick={() => handleDelete(result._id)} // Add your delete logic
                      >
                        cancel
                      </button>
                    </div>
                  </div>
                );
              }
              return null;
            })
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
