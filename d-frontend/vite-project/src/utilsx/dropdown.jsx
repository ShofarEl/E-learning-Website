import React from 'react';
import { ChevronDown } from 'lucide-react';

const HoverDropdown = () => {
  return (
    <div className="group relative inline-block">
      {/* Dropdown Button */}
      <button
        className="flex items-center text-gray-100 hover:text-white font-medium transition-colors duration-200 focus:outline-none"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Products
        <ChevronDown 
          className="ml-1 transition-transform duration-200 group-hover:rotate-180" 
          size={16} 
        />
      </button>

      {/* Dropdown Menu */}
      <div 
        className="absolute left-0 mt-2 w-48 origin-top scale-y-0 group-hover:scale-y-100 bg-white rounded-md shadow-lg overflow-hidden transition-all duration-200 ease-out transform"
        role="menu"
      >
        <a 
          href="/Courseware"
          className="block px-4 py-2.5 text-gray-700 hover:bg-green-50 transition-colors duration-150"
          role="menuitem"
        >
          All Courses
        </a>
        <a 
          href="#"
          className="block px-4 py-2.5 text-gray-700 hover:bg-green-50 transition-colors duration-150"
          role="menuitem"
        >
          Features
        </a>
        <a 
          href="/Courseware"
          className="block px-4 py-2.5 text-gray-700 hover:bg-green-50 transition-colors duration-150"
          role="menuitem"
        >
          Prices
        </a>
      </div>
    </div>
  );
};

export default HoverDropdown;