import React from 'react';
import { ArrowRight, Check, Users, BookOpen, Award } from 'lucide-react';

const GetStartedSection = () => {
  return (
    <section className="bg-gray-800 text-white py-16 mt-0 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Left Column - Content */}
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Learning?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of students who've transformed their careers with our courses. 
              Begin your journey today with just a few clicks.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Check className="flex-shrink-0 mt-1 text-emerald-200" size={20} />
                <span>No credit card required to start</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="flex-shrink-0 mt-1 text-emerald-200" size={20} />
                <span>7-day free trial for all courses</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="flex-shrink-0 mt-1 text-emerald-200" size={20} />
                <span>Cancel anytime</span>
              </div>
            </div>

            <a href='/Courseware'><button className="bg-white cursor-pointer text-emerald-700 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-2 transition-all hover:scale-105">
              Get Started Now <ArrowRight size={20} />
            </button></a>
          </div>

          {/* Right Column - Stats */}
          <div className="md:w-1/2 grid grid-cols-2 gap-6">
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <Users className="text-emerald-200 mb-3" size={32} />
              <div className="text-3xl font-bold">25K+</div>
              <div className="opacity-80">Active Students</div>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <BookOpen className="text-emerald-200 mb-3" size={32} />
              <div className="text-3xl font-bold">400+</div>
              <div className="opacity-80">Courses Available</div>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <Award className="text-emerald-200 mb-3" size={32} />
              <div className="text-3xl font-bold">90%</div>
              <div className="opacity-80">Satisfaction Rate</div>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <svg className="w-8 h-8 text-emerald-200 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-3xl font-bold">24/7</div>
              <div className="opacity-80">Learning Access</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;