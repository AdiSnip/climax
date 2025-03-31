import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Failed to send message.");
    }
  };

  return (
    <div className="min-h-[120vh] flex items-center justify-center bg-gradient-to-b from-blue-500 to-indigo-700 p-4">
      <div className="bg-white text-black relative lg:top-[5vh] p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 text-base sm:text-lg mb-6">
          Have a question? Send us a message!
        </p>

        {status && (
          <p className="text-center text-green-600 font-semibold mb-4">
            {status}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          {/* Name Input */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Your Name"
              aria-label="Enter your name"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Your Email"
              aria-label="Enter your email"
              required
            />
          </div>

          {/* Message Input */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              rows="4"
              placeholder="Your Message"
              aria-label="Enter your message"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
