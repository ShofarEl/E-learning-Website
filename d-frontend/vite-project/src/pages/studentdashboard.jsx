import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [purchasedCourses, setPurchasedCourses] = useState(location.state?.purchasedCourses || []);

  useEffect(() => {
    const checkCourseOwnership = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/check-course-ownership`,
          { withCredentials: true }
        );
        
        if (response.data.hasPurchased) {
          // If you want to fetch the actual courses, you might need another API call here
          // For now, we'll just keep the ones from location.state
          setPurchasedCourses(prev => [...prev]);
        }
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to verify course ownership');
      } finally {
        setIsLoading(false);
      }
    };

    // Only check ownership if we didn't receive courses via location state
    if (!location.state?.purchasedCourses) {
      checkCourseOwnership();
    }
  }, [location.state]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p>Verifying your courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center text-red-400">
          <p>{error}</p>
          <button 
            onClick={() => navigate('/courseware')}
            className="mt-4 text-white hover:underline"
          >
            Back to Courseware
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/courseware')}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="mr-1" size={20} />
            Back to Courseware
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-8">🎉 Welcome to Your Dashboard</h1>
        <p className="text-gray-400 mb-10">Here's what you've just purchased:</p>

        {purchasedCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">You haven't purchased any courses yet.</p>
            <button
              onClick={() => navigate('/courseware')}
              className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {purchasedCourses.map((course, index) => (
              <motion.div
                key={course.id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <BookOpen className="text-emerald-400 mr-3" size={24} />
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                </div>
                <p className="text-gray-400 mb-3">{course.description || 'Start your learning journey now!'}</p>
                <span className="inline-block bg-emerald-600 text-white text-sm px-3 py-1 rounded-md">
                  ${course.price}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DashboardPage;