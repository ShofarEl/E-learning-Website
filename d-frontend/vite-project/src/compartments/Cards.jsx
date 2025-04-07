import React, { useState, useEffect, useRef } from 'react';
import { User2Icon, BookOpenIcon, GraduationCapIcon, SmileIcon } from "lucide-react";

const CounterItem = ({ target, suffix, label, description, Icon, duration = 10000 }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const animationRef = useRef(null);

  const easeOutQuad = (t) => t * (2 - t);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCounter();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      observer.disconnect();
    };
  }, []);

  const startCounter = () => {
    const startTime = performance.now();
    const endTime = startTime + duration;

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);
      const currentCount = Math.floor(easedProgress * target);

      setCount(currentCount);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(updateCounter);
      } else {
        setCount(target);
      }
    };

    animationRef.current = requestAnimationFrame(updateCounter);
  };

  return (
    <div ref={counterRef} className="text-center px-6 py-8 bg-white rounded-lg shadow-md">
      <div className="flex justify-center mb-4">
        <Icon className="w-12 h-12 text-gray-900" />
      </div>
      <div className="text-4xl md:text-5xl font-semibold text-gray-900 mb-2">
        {count.toLocaleString()}{suffix && <span>{suffix}</span>}
      </div>
      <div className="text-gray-600 uppercase text-sm tracking-wider font-medium mb-2">
        {label}
      </div>
      <p className="text-gray-500 text-sm">
        {description}
      </p>
    </div>
  );
};

const CounterSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <CounterItem 
            target={25000} 
            suffix="+" 
            label="Students Enrolled"
            description="Over 25,000 students have joined our platform to boost their careers."
            Icon={User2Icon}
          />
          <CounterItem 
            target={400} 
            suffix="+" 
            label="Courses Available"
            description="We offer a variety of courses across different fields to meet your needs."
            Icon={BookOpenIcon}
          />
          <CounterItem 
            target={500} 
            suffix="+" 
            label="Certified Teachers" 
            description="Learn from industry-leading certified instructors and mentors."
            Icon={GraduationCapIcon}
          />
          <CounterItem 
            target={90} 
            suffix="%" 
            label="Satisfaction Rate"
            description="Our students love our courses, with a 90% satisfaction rate."
            Icon={SmileIcon}
          />
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
