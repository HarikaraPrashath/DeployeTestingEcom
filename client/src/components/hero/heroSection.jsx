import React from 'react';
import heroImage from '../../assets/image/HeroSection.jpg';

function HeroSection() {
  return (
    <div className="relative w-full h-screen bg-cover bg-center">
      {/* Background Image */}
      <img 
        src={heroImage} 
        alt="Hero Background" 
        className="absolute top-0 left-0 w-full h-full object-cover -z-10" 
      />
      
      {/* Text Content */}
      <div className="relative z-10">
        {/* Main Text */}
        <div className="text-7xl font-bold text-green-200 pl-28 pt-36">
          <p>
            Discover and <br />
            Find Your <br />
            Own <span className="text-green-400">Fashion</span>
          </p>
        </div>
        
        {/* Subtitle */}
        <div className="text-green-100 pl-32 font-bold mt-6">
          <p>
            Explore our curated collection of stylish <br />
            clothing and accessories to suit your <br />
            unique taste.
          </p>
        </div>
        
        {/* Call to Action */}
        <div className="mt-8 ml-56">
          <button className="text-green-100 rounded-3xl text-2xl bg-green-950 py-4 px-9 hover:bg-green-800 transition duration-300">
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
