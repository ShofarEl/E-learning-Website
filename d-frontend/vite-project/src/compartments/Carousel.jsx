import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const CourseCarousel = () => {
  const courses = [
    // 12 courses total (4 slides of 3 courses each)
    {
      id: 1, title: "Web Dev Bootcamp", 
      description: "Master full-stack development", price: "$299",
      image: "webdev.avif"
    },
    {
      id: 2, title: "Data Science", 
      description: "Python, Pandas, ML basics", price: "$349",
      image: "dataAnalysis.avif"
    },
    {
      id: 3, title: "UX/UI Design", 
      description: "Figma and Adobe XD", price: "$249",
      image: "Userinterface.avif"
    },
    {
      id: 4, title: "Mobile Dev", 
      description: "React Native apps", price: "$399",
      image: "mobiledev.png"
    },
    {
      id: 5, title: "Digital Marketing", 
      description: "SEO & Social Media", price: "$199",
      image: "graphiscs design.avif"
    },
    {
      id: 6, title: "Cloud Computing", 
      description: "AWS infrastructure", price: "$449",
      image: "technology.jpg"
    },
    {
      id: 7, title: "Cybersecurity", 
      description: "Protect from attacks", price: "$379",
      image: "cybersecurity.jpg"
    },
    {
      id: 8, title: "Python Programming", 
      description: "Basics to advanced", price: "$279",
      image: "webdev.avif"
    },
    {
      id: 9, title: "Graphic Design", 
      description: "Photoshop, Illustrator", price: "$229",
      image: "graphiscs design.avif"
    },
    {
      id: 10, title: "AI Fundamentals", 
      description: "Machine Learning intro", price: "$499",
      image: "artificial.webp"
    },
    {
      id: 11, title: "Blockchain Basics", 
      description: "Crypto & smart contracts", price: "$429",
      image: "blockchain.webp"
    },
    {
      id: 12, title: "Game Development", 
      description: "Unity and Unreal Engine", price: "$349",
      image: "game_development.jpg"
    }
  ];

 
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardsPerSlide = 3;
  const totalSlides = Math.ceil(courses.length / cardsPerSlide);
  const [autoSlide, setAutoSlide] = useState(true);
  const autoSlideInterval = 5000; // 5 seconds

  // Group courses into slides of 3
  const groupedCourses = [];
  for (let i = 0; i < courses.length; i += cardsPerSlide) {
    groupedCourses.push(courses.slice(i, i + cardsPerSlide));
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-slide effect
  useEffect(() => {
    let intervalId;
    
    if (autoSlide) {
      intervalId = setInterval(() => {
        nextSlide();
      }, autoSlideInterval);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoSlide, currentSlide]);

  // Pause auto-slide on hover
  const handleMouseEnter = () => {
    setAutoSlide(false);
  };

  const handleMouseLeave = () => {
    setAutoSlide(true);
  };

  return (
    <div 
      className="max-w-7xl mx-auto px-4 py-12 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {groupedCourses.map((slideCourses, slideIndex) => (
            <div 
              key={slideIndex} 
              className="w-full flex-shrink-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
                {slideCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">{course.title}</h3>
                      <p className="text-gray-600 mb-4">{course.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-emerald-600">{course.price}</span>
                        <a href="/Courseware"><button className="bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                          Enroll Now
                        </button></a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-10 hover:bg-gray-50 transition-colors ml-4"
      >
        <ArrowLeft className="text-gray-800" size={20} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-10 hover:bg-gray-50 transition-colors mr-4"
      >
        <ArrowRight className="text-gray-800" size={20} />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-emerald-600 w-6' : 'bg-gray-200'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseCarousel;