import React from "react";
import Navbar from "../../src/components/navba/navbarOther";
import Footer from "../../src/components/footer/footer";
import HeroSection from "../../src/components/hero/heroSection";
import img1 from "../assets/image/best-1.jpg";
import img2 from "../assets/image/best-2.jpg";
import img3 from "../assets/image/best-3.jpg";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <div className="flex flex-col min-h-screen bg-gray-50 px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-5xl font-bold text-gray-900 mb-4">Best Selling</p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get in on the trend with our curated selection of best-selling
            styles.
          </p>
        </div>

        {/* Product Grid */}
        <div className="flex justify-center items-center gap-8 flex-wrap">
          {[
            { img: img1, title: "Regular Fit Long Sleeve Top" },
            { img: img2, title: "Black Crop Tailored Jacket" },
            { img: img3, title: "Textured Sunset Shirt" },
          ].map((product, index) => (
            <div
              key={index}
              className="w-72 h-96 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 overflow-hidden"
            >
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-60 object-cover rounded-t-lg"
              />
              <div className="p-4 text-center">
                <p className="text-lg font-bold text-gray-900">
                  {product.title}
                </p>
                <p className="font-semibold text-gray-700 mt-2">
                  $58.34 | <span className="text-yellow-500">★★★★★</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Feedback Section */}
        <div className="bg-gray-100 py-12 mt-16 rounded-lg shadow-lg">
          <p className="text-4xl font-bold text-center text-gray-900 mb-8">
            What Our Customers Say
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
            {[
              {
                review:
                  "The t-shirt is super soft and fits perfectly! Great quality.",
                name: "Raja",
              },
              {
                review:
                  "Love how stylish and versatile this is. Worth the price!",
                name: "Ramesh",
              },
              {
                review:
                  "The color doesn't fade even after washes. Highly recommended!",
                name: "Sunil",
              },
            ].map((feedback, index) => (
              <div
                key={index}
                className="bg-gray-200 shadow-md rounded-lg p-6 text-center"
              >
                <p className="text-green-500 text-5xl mb-4">“”</p>
                <p className="text-gray-700 mb-4">{feedback.review}</p>
                <p className="text-gray-900 font-semibold">– {feedback.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Logos */}
        <div className="mt-16 text-center">
          <p className="text-3xl font-bold text-gray-900 mb-6">
            Trusted by Top Brands
          </p>
          <div className="flex justify-center items-center gap-12 flex-wrap">
            {[
              {
                src: "https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png",
                alt: "Nike Logo",
              },
              {
                src: "https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo.png",
                alt: "Adidas Logo",
              },
              {
                src: "https://logos-world.net/wp-content/uploads/2020/04/Gucci-Logo.png",
                alt: "Gucci Logo",
              },
              {
                src: "https://logos-world.net/wp-content/uploads/2020/04/Louis-Vuitton-Logo.png",
                alt: "Louis Vuitton Logo",
              },
              {
                src: "https://logos-world.net/wp-content/uploads/2020/04/Chanel-Logo.png",
                alt: "Chanel Logo",
              },
            ].map((brand, index) => (
              <img
                key={index}
                src={brand.src}
                alt={brand.alt}
                className="h-16 grayscale hover:grayscale-0 transition duration-300"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
