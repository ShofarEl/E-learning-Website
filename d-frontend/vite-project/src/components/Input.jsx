import React from 'react';

const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className='relative mb-6'>
      {/* Icon Container - properly aligned */}
      <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
        <Icon className='h-5 w-5 text-green-500' />  {/* Fixed size and color */}
      </div>
      
      {/* Input Field - with proper left padding */}
      <input
        {...props}
        className='w-full py-2 pl-10 pr-4  /* Added left padding */
                bg-gray-800 bg-opacity-50 
                rounded-lg border border-gray-700
                focus:border-green-500 focus:ring-2 focus:ring-green-500 
                text-white placeholder-gray-400 
                transition duration-200 ease-in-out'
      />
    </div>
  );
};


export default Input