'use client';
import React, { useState, useCallback } from "react";
import { Github, Twitter, Linkedin, Instagram, Facebook } from "lucide-react";

// --- ExtendedFooter Component (NEW) ---
function HomeFooter({ theme }) {
  const currentYear = new Date().getFullYear();
  const footerBgClass = theme === "dark" ? "bg-gray-800" : "bg-gray-200";
  const textColorClass = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const headingColorClass = theme === "dark" ? "text-white" : "text-gray-900";
  const linkColorClass = theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800";
  const socialIconColorClass = theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900";
  const inputBgColorClass = theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900";
  const inputBorderClass = theme === "dark" ? "border-gray-600 focus:border-blue-500" : "border-gray-300 focus:border-blue-700";
  const buttonBgClass = theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-700 hover:bg-blue-800";
  const buttonTextColor = "text-white";

  const quickLinks = [
    { text: "Home", link: "#" },
    { text: "About Us", link: "#" },
    { text: "Services", link: "#" },
    { text: "Contact", link: "#" },
  ];

  const companyLinks = [
    { text: "Our Team", link: "#" },
    { text: "Careers", link: "#" },
    { text: "Partners", link: "#" },
    { text: "Press", link: "#" },
  ];

  const resourceLinks = [
    { text: "Blog", link: "#" },
    { text: "Support", link: "#" },
    { text: "FAQ", link: "#" },
    { text: "Developers", link: "#" },
  ];

  const legalLinks = [
    { text: "Privacy Policy", link: "#" },
    { text: "Terms of Service", link: "#" },
    { text: "Cookie Policy", link: "#" },
  ];

  const socialLinks = [
    { icon: Github, link: "https://github.com" },
    { icon: Twitter, link: "https://twitter.com" },
    { icon: Linkedin, link: "https://linkedin.com" },
    { icon: Instagram, link: "https://instagram.com" },
    { icon: Facebook, link: "https://facebook.com" },
  ];

  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribeMessage, setSubscribeMessage] = useState("");

  const handleSubscribe = useCallback(
    (e) => {
      e.preventDefault();
      if (subscribeEmail.trim() === "") {
        setSubscribeMessage("Please enter your email address.");
        return;
      }
      if (!subscribeEmail.includes("@") || !subscribeEmail.includes(".")) {
        setSubscribeMessage("Please enter a valid email address.");
        return;
      }
      // Simulate API call
      console.log("Subscribing with email:", subscribeEmail);
      setSubscribeMessage("Thank you for subscribing!");
      setSubscribeEmail("");
      setTimeout(() => setSubscribeMessage(""), 3000);
    },
    [subscribeEmail]
  );

  return (
    <footer className={`w-full py-8 px-4 ${footerBgClass} rounded-lg shadow-inner transition-colors duration-300 ease-in-out mt-8`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between md:items-start space-y-8 md:space-y-0 md:space-x-8">
        {/* Company Info */}
        <div className="flex-1 text-center md:text-left min-w-[150px]">
          <h3 className={`text-xl font-bold mb-3 ${headingColorClass}`}>My Awesome Company</h3>
          <p className={`text-sm ${textColorClass}`}>Innovation at its best, delivering powerful solutions for your business.</p>
        </div>

        {/* Categorized Navigation Links */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4 text-center md:text-left md:flex-grow-[2]">
          <div>
            <h4 className={`text-lg font-semibold mb-3 ${headingColorClass}`}>Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((item, index) => (
                <li key={index}>
                  <a href={item.link} className={`text-sm ${linkColorClass} transition-colors duration-200`}>
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={`text-lg font-semibold mb-3 ${headingColorClass}`}>Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((item, index) => (
                <li key={index}>
                  <a href={item.link} className={`text-sm ${linkColorClass} transition-colors duration-200`}>
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={`text-lg font-semibold mb-3 ${headingColorClass}`}>Resources</h4>
            <ul className="space-y-2">
              {resourceLinks.map((item, index) => (
                <li key={index}>
                  <a href={item.link} className={`text-sm ${linkColorClass} transition-colors duration-200`}>
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={`text-lg font-semibold mb-3 ${headingColorClass}`}>Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((item, index) => (
                <li key={index}>
                  <a href={item.link} className={`text-sm ${linkColorClass} transition-colors duration-200`}>
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Subscription Form & Social Icons */}
        <div className="flex-1 text-center md:text-right w-full md:w-auto min-w-[200px]">
          {/* Subscription Form */}
          <div className="mb-6">
            <h4 className={`text-lg font-semibold mb-3 ${headingColorClass}`}>Subscribe to our Newsletter</h4>
            {/* Removed sm:flex-row to always render as flex-col (stacked) */}
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full sm:max-w-sm sm:mx-auto md:mx-0">
              <input
                type="email"
                placeholder="Enter your email"
                // `min-w-0` and `w-full` ensure it takes full width within the column
                className={`flex-auto p-2 rounded-md border ${inputBorderClass} ${inputBgColorClass} focus:outline-none focus:ring-2 min-w-0 w-full`}
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                aria-label="Email for newsletter subscription"
              />
              <button
                type="submit"
                // `w-full` ensures the button takes full width within the column
                className={`px-4 py-2 rounded-md font-semibold flex-shrink-0 ${buttonBgClass} ${buttonTextColor} transition-colors duration-200 w-full`}
              >
                Subscribe
              </button>
            </form>
            {subscribeMessage && (
              <p className={`mt-2 text-sm ${subscribeMessage.includes("Thank you") ? "text-green-500" : "text-red-500"}`}>{subscribeMessage}</p>
            )}
          </div>

          {/* Social Icons */}
          <div>
            <h4 className={`text-lg font-semibold mb-3 ${headingColorClass}`}>Connect With Us</h4>
            <div className="flex justify-center md:justify-end space-x-4">
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full transition-colors duration-200 ${socialIconColorClass}
                    ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-300"}`}
                  aria-label={item.icon.name}
                >
                  {/* Render the Lucide icon component */}
                  <item.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Copyright line at the very bottom */}
      <div className={`mt-8 pt-4 border-t ${theme === "dark" ? "border-gray-700" : "border-gray-300"} text-center ${textColorClass} text-sm`}>
        &copy; {currentYear} My Awesome Company. All rights reserved.
      </div>
    </footer>
  );
}

export default HomeFooter;
