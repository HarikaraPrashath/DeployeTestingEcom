import React from 'react';

function Feature() {
  return (
    <div className="w-full bg-gray-50 py-12 px-8">
      {/* About Us Section */}
      <div className="bg-white shadow-xl rounded-lg p-8 mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">About Our Brand</h2>
        <div className="flex flex-col lg:flex-row items-center">
          <img
            src="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="About Us"
            className="w-full lg:w-1/2 h-72 object-cover rounded-lg mb-6 lg:mb-0"
          />
          <div className="lg:w-1/2">
            <p className="text-lg text-gray-700 leading-relaxed">
              We are a global leader in premium products, offering innovative solutions for a wide range of industries. Our commitment to excellence and quality ensures that each product we deliver meets the highest standards.
            </p>
            <p className="text-lg text-gray-700 mt-6">
              Established in 2000, our brand has grown to become a trusted name in the industry, serving millions of satisfied customers worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white shadow-xl rounded-lg p-8 mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Our Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="flex flex-col items-center bg-gray-50 p-8 rounded-lg shadow-xl transition-transform transform hover:scale-105">
            <img
              src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Premium Quality"
              className="w-24 h-24 object-cover mb-4 rounded-full"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Premium Quality</h3>
            <p className="text-gray-600 text-center">
              Our products undergo rigorous quality checks, ensuring superior performance and durability for our customers.
            </p>
          </div>
          <div className="flex flex-col items-center bg-gray-50 p-8 rounded-lg shadow-xl transition-transform transform hover:scale-105">
            <img
              src="https://images.pexels.com/photos/5648268/pexels-photo-5648268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Sustainable Innovation"
              className="w-24 h-24 object-cover mb-4 rounded-full"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Sustainable Innovation</h3>
            <p className="text-gray-600 text-center">
              We are committed to sustainable practices, using eco-friendly materials and innovative solutions to reduce our carbon footprint.
            </p>
          </div>
          <div className="flex flex-col items-center bg-gray-50 p-8 rounded-lg shadow-xl transition-transform transform hover:scale-105">
            <img
              src="https://images.pexels.com/photos/7538122/pexels-photo-7538122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Customer Satisfaction"
              className="w-24 h-24 object-cover mb-4 rounded-full"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Customer Satisfaction</h3>
            <p className="text-gray-600 text-center">
              Our priority is customer satisfaction. We offer a robust customer support system to assist with any inquiries or concerns.
            </p>
          </div>
        </div>
      </div>

      {/* Global Presence Section */}
      <div className="bg-white shadow-xl rounded-lg p-8 mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Our Global Presence</h2>
        <p className="text-lg text-gray-700 mb-6">
          We have offices and factories located in over 50 countries around the world. Our global network allows us to deliver products with speed and efficiency, while maintaining the highest standards of quality and service.
        </p>
        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Key Locations:</h3>
          <ul className="list-disc pl-8 space-y-2 text-lg text-gray-700">
            <li>United States - New York, Los Angeles</li>
            <li>Germany - Berlin, Munich</li>
            <li>India - Mumbai, Delhi</li>
            <li>China - Beijing, Shanghai</li>
            <li>Australia - Sydney, Melbourne</li>
            <li>Brazil - São Paulo, Rio de Janeiro</li>
          </ul>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="bg-white shadow-xl rounded-lg p-8 mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Why Choose Us?</h2>
        <p className="text-lg text-gray-700 mb-6">
          With over 20 years of experience, we have established ourselves as a trusted brand in the market. Our focus on customer service, high-quality products, and continuous innovation makes us the preferred choice for businesses and consumers alike.
        </p>
        <ul className="list-disc pl-8 space-y-2 text-lg text-gray-700">
          <li>Industry-leading product warranties</li>
          <li>Exceptional after-sales support</li>
          <li>Global shipping and delivery</li>
          <li>Eco-friendly and sustainable products</li>
          <li>Customized solutions for your business needs</li>
        </ul>
      </div>
    </div>
  );
}

export default Feature;
