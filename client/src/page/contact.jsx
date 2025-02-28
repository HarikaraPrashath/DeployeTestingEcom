import React, { useState } from 'react';
import Navbar from '../../src/components/navba/navbarOther';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    console.log({ name, email, message });
  };

  return (
    <div>

      <div className="flex justify-center items-center bg-green-800 text-white h-screen">
        <div className="bg-green-900 p-10 rounded-lg shadow-lg w-96">
          <h2 className="text-4xl font-bold text-center mb-6">Contact Us</h2>
          <form >
            {/* Name Input */}
            <div className="mb-4">
              <label htmlFor="name" className="block font-semibold">Your Name</label>
              <input
                type="text"
                id="name"
                className="w-full p-3 rounded-lg text-black focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold">Your Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 rounded-lg text-black focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Message Input */}
            <div className="mb-6">
              <label htmlFor="message" className="block font-semibold">Your Message</label>
              <textarea
                id="message"
                className="w-full p-3 rounded-lg text-black focus:outline-none"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
