import { useContext, useEffect, useState } from 'react'
import { Clock, User, Star, ArrowLeft, ArrowRight, ShoppingCart } from 'lucide-react';
import Header from '../compartments/Header';
import Footer from '../compartments/footer';
import  allCourses  from './CourseBank.jsx';
import { useCart } from '../context/CartContext.jsx';
 const TechCourses = () => {

  const { addToCart, isInCart, isPurchased } = useCart();

  // State for pagination and filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("All");
  const coursesPerPage = 15;

  // Filter courses by category
const filteredCourses = allCourses.filter(course => 
    (activeCategory === "All" || course.category === activeCategory) &&
    !isPurchased(course.id)
  );


  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Category filter handler
  const handleCategoryFilter = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <><Header/><div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mt-20 text-gray-50 mb-2">Tech Courses Catalog</h1>
        <p className="text-lg text-center text-gray-50 mb-12">Browse our collection of 45+ technology courses</p>
        
        {/* Category Filters */}
        <div className="flex flex-wrap   justify-center gap-3 mb-12">
          <button 
            onClick={() => handleCategoryFilter("All")}
            className={`px-4 py-2 rounded-full text-sm ${activeCategory === "All" ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
          >
            All
          </button>
          <button 
            onClick={() => handleCategoryFilter("Web Development")}
            className={`px-4 py-2 rounded-full text-sm ${activeCategory === "Web Development" ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
          >
            Web Development
          </button>
          <button 
            onClick={() => handleCategoryFilter("Data Science")}
            className={`px-4 py-2 rounded-full text-sm ${activeCategory === "Data Science" ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
          >
            Data Science
          </button>
          <button 
            onClick={() => handleCategoryFilter("Mobile Development")}
            className={`px-4 py-2 rounded-full text-sm ${activeCategory === "Mobile Development" ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
          >
            Mobile Development
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-12">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-40 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="inline-block px-3 py-1 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full mb-2">
                  {course.category}
                </span>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h3>
                
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <User className="mr-1" size={14} />
                  <span>{course.tutor}</span>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="mr-1" size={14} />
                    <span>{course.hours} hours</span>
                  </div>
                  <div className="flex items-center text-sm text-yellow-600">
                    <Star className="mr-1" size={14} />
                    <span>{course.rating}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold mr-3 text-gray-900">{course.price}</span>
                  
                
                <button onClick={() => addToCart(course)}
            disabled={isInCart(course.id)}
            className={` cursor-pointer hover:bg-gray-50 hover:text-gray-950 rounded-sm ${
              isInCart(course.id)
                ? 'bg-gray-300 cursor-pointer hover:bg-gray-50 hover:text-gray-950'
                : 'bg-emerald-600 px-2 py-1 hover:bg-emerald-700  flex items-center justify-center gap-2 text-white'
            }`}>
                    <ShoppingCart className=" text-gray-800 mb-3" size={24} />
                    {isInCart(course.id) ? 'In Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {filteredCourses.length > 0 ? (
          <div className="flex justify-center items-center space-x-2">
            <button 
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              <ArrowLeft size={20} />
            </button>
            
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`w-10 h-10 rounded-full ${currentPage === index + 1 ? 'bg-emerald-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                {index + 1}
              </button>
            ))}
            
            <button 
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No courses found in this category.</p>
          </div>
        )}
      </div>
    </div>
    <Footer/></>
  );
};

export default TechCourses