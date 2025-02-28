import React from 'react'

function form({ formData, handleFormChange }) {
  return (
    <div>
          {/* Product Name */}
          <div>
            <label className="block text-gray-600 font-medium mb-1" htmlFor="productName">
              Product Name
            </label>
            <input  
              type="text"
              id="productName"
              value={formData.productName}
              onChange={(e) => handleFormChange('productName', e.target.value)}
              placeholder="Enter product name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-600 font-medium mb-1" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={(e) => handleFormChange('price', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-600 font-medium mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleFormChange('description', e.target.value)}
              placeholder="Enter product description"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>

          {/* Size */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Size</label>
            <div className="flex items-center gap-4">
              {['Small', 'Large', 'XL'].map((size) => (
                <label key={size} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 border-gray-300 focus:ring-green-500"
                    value={size.toLowerCase()}
                    checked={formData.size.includes(size.toLowerCase())}
                    onChange={(e) => {
                      const newSize = e.target.value;
                      const updatedSize = formData.size.includes(newSize)
                        ? formData.size.filter((s) => s !== newSize)
                        : [...formData.size, newSize];
                      handleFormChange('size', updatedSize);
                    }}
                 />
                  {size}
                </label>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Color</label>
            <div className="flex items-center gap-4">
              {['Blue', 'Red', 'Yellow', 'Green'].map((color) => (
                <label key={color} className="flex items-center">
                  <input
                    type="radio"
                    name="color"
                    value={color.toLowerCase()}
                    checked={formData.color === color.toLowerCase()}
                    onChange={(e) => handleFormChange('color', e.target.value)}
                    className="mr-2 border-gray-300 focus:ring-green-500"
                  />
                  {color}
                </label>
              ))}
            </div>
          </div>
    </div>
  )
}

export default form