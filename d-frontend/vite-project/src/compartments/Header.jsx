import { Menu, X, ChevronDown, ShoppingCart, VideoIcon, ArrowRight  } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import HoverDropdown from "../utilsx/dropdown.jsx"
import { useCart } from '../context/CartContext.jsx';
import { Link } from 'react-router';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart , removeFromCart, purchaseCourses } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dropdownRef = useRef(null);
 

  const handlePurchase = () => {
    purchaseCourses();
    setIsCartOpen(false);
  };


  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest('.cart-icon-container') // Ensure cart icon clicks don't close
      ) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCartOpen]);
  

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm py-3' : 'bg-gray-900 py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className={`text-2xl font-bold ${isScrolled ? 'text-gray-900' : 'text-gray-100'}`}>
              EduMall
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className={`${isScrolled ? 'text-gray-900' : 'text-gray-100'} hover:text-green-900 font-medium`}>
              Home
            </a>
            <div>
              <HoverDropdown isScrolled={isScrolled} />
            </div>
            <a href="#" className={`${isScrolled ? 'text-gray-900' : 'text-gray-100'} hover:text-green-900 font-medium`}>
              Solutions
            </a>
            <a href="#" className={`${isScrolled ? 'text-gray-900' : 'text-gray-100'} hover:text-green-900 font-medium`}>
              Resources
            </a>
          </nav>

          {/* Right Side (Cart + Auth) */}
          <div className="flex items-center space-x-6">
          <div className="relative">
      <Link to="/cart" className="cart-icon-container">
  <button 
    onClick={() => setIsCartOpen(false)} // Close dropdown if open
    className={`p-2 rounded-full relative ${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-gray-800'}`}
  >
    <ShoppingCart className={isScrolled ? 'text-gray-700' : 'text-gray-100'} />
    {cart.length > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {cart.length}
      </span>
    )}
  </button>
</Link>

    
      {/* Cart Dropdown - Fixed to properly show/hide */}
      {isCartOpen && (
        <div 
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50 border border-gray-100"
          style={{ display: isCartOpen ? 'block' : 'none' }} // Explicit show/hide
        >
          <div className="px-4 py-3 border-b flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-900">Your Cart ({cart.length})</h3>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X size={16} />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-6">
              <ShoppingCart className="text-gray-300 mb-3" size={40} />
              <p className="text-gray-500 text-sm font-medium mb-1">Your cart is empty</p>
              <p className="text-gray-400 text-xs text-center">Browse courses and add them to your cart</p>
            </div>
          ) : (
            <>
              <div className="max-h-64 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 border-b">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.price}</p>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromCart(item.id);
                      }}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t">
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-medium">Total:</span>
                  <span className="text-sm font-bold">
                    ${cart.reduce((sum, item) => sum + parseFloat(item.price.replace(/[^0-9.]/g, '')), 0).toFixed(2)}
                  </span>
                </div>
                <a href='/Checkout'><button
                  onClick={handlePurchase}
                  className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-md text-sm font-medium flex items-center justify-center"
                >
                  Checkout <ArrowRight className="ml-2" size={16} />
                </button></a>
              </div>
            </>
          )}
        </div>
      )}
    </div>
            {/* Sign Out Button */}
            <a href='/signout'><button className={`hidden md:block cursor-pointer ${isScrolled ? 'bg-green-000 hover:bg-green-900' : 'bg-green-800 hover:bg-gray-50 hover:text-black'} text-black px-5 py-2 rounded-md font-medium`}>
              Sign Out
            </button></a>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="md:hidden focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X size={24} className={isScrolled ? 'text-gray-900' : 'text-gray-100'} />
              ) : (
                <Menu size={24} className={isScrolled ? 'text-gray-900' : 'text-gray-100'} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white mt-4 pb-4 space-y-3">
            <nav className="flex flex-col space-y-3 border-t border-gray-100 pt-4">
              <a href="#" className="text-gray-600 hover:text-green-900 font-medium py-1">Home</a>
              <div>
                <button className="flex items-center justify-between w-full text-gray-600 hover:text-green-900 font-medium py-1">
                  Products <ChevronDown size={16} />
                </button>
                <div className="pl-4 mt-1 space-y-2">
                  <a href="/Courseware" className="block text-gray-500 hover:text-green-900 py-1">All courses</a>
                  <a href="#" className="block text-gray-500 hover:text-green-900 py-1">Features</a>
                  <a href="/Courseware" className="block text-gray-500 hover:text-green-900 py-1">Pricing</a>
                </div>
              </div>
              <a href="#" className="text-gray-600 hover:text-green-900 font-medium py-1">Solutions</a>
              <a href="#" className="text-gray-600 hover:text-green-900 font-medium py-1">Resources</a>
            </nav>
            
            <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
              <a href='#'><button className="w-md bg-green-950 cursor-pointer hover:text-gray-50 text-white px-5 py-2 rounded-md font-medium">
                Sign Up
              </button></a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

import { motion } from "framer-motion";

export const HeroSection = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("imagebg4.avif")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-white px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-6xl font-extralight w-2/3 mb-6"
        >
          The Best Professional e-Learning Courses For a Better World!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-xl mb-8 max-w-2xl"
        >
          1500+ Centers Across the World
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="
            bg-emerald-900 hover:bg-gray-100 hover:text-gray-900 
            cursor-pointer px-6 py-3 rounded-full 
            text-lg font-medium transition-colors duration-300
            flex items-center justify-center gap-2
          "
        >
          <VideoIcon size={20} className="flex-shrink-0" />
          <span>Watch Video</span>
        </motion.button>
      </div>
    </div>
  );
};
