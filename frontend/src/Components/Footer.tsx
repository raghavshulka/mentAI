import React from 'react';
import { FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className=" relative bg-green-700 text-white">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          <div className="bg-green-500 p-8 flex items-center justify-center h-full">
            <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="10" />
              <path d="M50 5 A45 45 0 0 1 95 50" stroke="white" strokeWidth="10" strokeLinecap="round" />
              <path d="M95 50 A45 45 0 0 1 50 95" stroke="white" strokeWidth="10" strokeLinecap="round" />
              <path d="M50 95 A45 45 0 0 1 5 50" stroke="white" strokeWidth="10" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div className="w-full md:w-2/3 md:pl-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Move-Ins</a></li>
                <li><a href="#" className="hover:underline">EHR</a></li>
                <li><a href="#" className="hover:underline">eMAR</a></li>
                <li><a href="#" className="hover:underline">Insights</a></li>
                <li><a href="#" className="hover:underline">Billing & Payments</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Resources</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">&copy; August Health 2024</p>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;