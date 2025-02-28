import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function DashboardUpdate() {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [imageFile, setImageFile] = useState(null); // For new image uploads
    const [currentImage, setCurrentImage] = useState(""); // For the existing image URL
    const inputRef = useRef(null); // Ref for file input
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch the product details when the component mounts
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/admin/product/getOne/${id}`)
            .then((response) => {
                const product = response.data.data;
                setProductName(product.productName || "");
                setPrice(product.price || "");
                setDescription(product.description || "");
                setSize(product.size || "");
                setColor(product.color || "");
                setCurrentImage(product.image || ""); // Store the current image URL
            })
            .catch((err) => console.error(err));
    }, [id]);

    // Handle form submission
    const handleUpdate = (e) => {
        e.preventDefault();

        // Create form data to send, including an image file if uploaded
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("size", size);
        formData.append("color", color);
        if (imageFile) {
            formData.append("image", imageFile);
        }

        axios
            .put(`http://localhost:5000/api/admin/product/updateOne/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                alert("Product updated successfully!");
                navigate("/admin-dashboard");
            })
            .catch((err) => console.error(err));
    };

    const handleImageFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex gap-4 mb-8">
                <h1 className="text-xl font-bold text-gray-700">Update Product</h1>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-500">
                <form className="space-y-4" onSubmit={handleUpdate}>
                    {/* Image Upload */}
                    <div className="border-4 rounded-lg border-dotted border-green-500 w-full p-4">
                        {imageFile ? (
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium truncate">{imageFile.name}</p>
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="text-green-500 hover:text-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                        ) : currentImage ? (
                            <div className="flex items-center justify-between">
                                <img
                                    src={currentImage}
                                    alt="Current Product"
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="text-green-500 hover:text-red-500"
                                >
                                    Replace Image
                                </button>
                            </div>
                        ) : (
                            <label
                                htmlFor="imageUpload"
                                className="flex flex-col items-center justify-center cursor-pointer text-center text-green-700"
                            >
                                <span className="font-semibold">Click to upload an image</span>
                                <span className="text-sm text-green-500">(Supported formats: JPG, PNG, GIF)</span>
                                <input
                                    type="file"
                                    id="imageUpload"
                                    className="hidden"
                                    ref={inputRef}
                                    onChange={handleImageFileChange}
                                />
                            </label>
                        )}
                    </div>

                    {/* Product Name */}
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">Product Name</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="Enter product name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">Price (Rs)</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Enter price"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter product description"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        ></textarea>
                    </div>

                    {/* Size */}
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">Size</label>
                        <input
                            type="text"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            placeholder="Enter size"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Color */}
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">Color</label>
                        <input
                            type="text"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            placeholder="Enter color"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg shadow-lg hover:bg-green-700"
                    >
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    );
}

export default DashboardUpdate;
