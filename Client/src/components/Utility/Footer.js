import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-right p-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between align-middle">
          <div className="md:w-1/4 text-left">
            <h2 className="text-xl font-bold">
              <span className="text-yellow-500">Your</span>Shop
            </h2>
            <p>Motto or Slogan</p>
          </div>
          <div className="md:w-3/4 flex justify-between mt-4 md:mt-0">
            <div className="md:w-1/4">
              <h3 className="text-lg font-semibold">Product</h3>
              <ul className="text-gray-300">
                <li>Overview</li>
                <li>Features</li>
                <li>Pricing</li>
                <li>Releases</li>
              </ul>
            </div>
            <div className="md:w-1/4">
              <h3 className="text-lg font-semibold">Company</h3>
              <ul className="text-gray-300">
                <li>About</li>
                <li>Careers</li>
                <li>News</li>
                <li>Support</li>
              </ul>
            </div>
            <div className="md:w-1/4">
              <h3 className="text-lg font-semibold">Social</h3>
              <ul className="text-gray-300">
                <li>LinkedIn</li>
                <li>GitHub</li>
                <li>Twitter</li>
                <li>Instagram</li>
              </ul>
            </div>
            <div className="md:w-1/4">
              <h3 className="text-lg font-semibold">Legal</h3>
              <ul className="text-gray-300">
                <li>Terms</li>
                <li>Privacy</li>
                <li>Licenses</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="border-gray-800 my-8" />
        <div className="text-gray-300 text-center">
          &copy; {new Date().getFullYear()} YourShop. All rights reserved.
          Designed and developed by - Vanshaj Bhatnagar
        </div>
      </div>
    </footer>
  );
};

export default Footer;
