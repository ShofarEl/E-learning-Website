import React from 'react';

const ImageWithText = () => {
  return (
    <div className="max-w-6xl mx-auto px-0 py-7">
      <div className="flex flex-col md:flex-row gap-30 items-center">
        <div className="w-full md:w-1/2">
          <img 
            src="game_development.jpg" 
            alt="Development"
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>
        
    
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-light text-gray-800 mt-15 mb-4">Learn anything online</h2>
          <p className="text-md text-gray-600 mb-6">
          Expand your horizons with our vast online learning platform. Access thousands of courses across tech, business, 
          arts, and more - all from the comfort of your home.
           Learn at your own pace with expert instructors and hands-on projects that build real-world skills.
          </p>
          <h2 className="text-2xl font-light text-gray-800 mb-4">Communicate with People</h2>
          <p className="text-md text-gray-600 mb-6">
          Connect with a global community of learners and mentors. Join live discussions, ask questions in forums,
           and collaborate on projects.
           Build meaningful connections with peers who share your interests and ambitions across the world."
          </p>
          <h2 className="text-2xl font-light text-gray-800 mb-4">Share you knowledge</h2>
          <p className="text-md text-gray-600 mb-6">
          Turn your expertise into impact by teaching others. Create and publish your own courses to reach eager students worldwide. 
          Our platform gives you all the tools to design engaging lessons, interact with learners, and grow as an educator
          </p>
          <button className="bg-emerald-900 cursor-pointer hover:bg-gray-100 hover:text-gray-950
           text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Explore Scholarships
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageWithText;