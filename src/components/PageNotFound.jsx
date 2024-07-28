import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className='flex flex-col h-screen justify-center items-center bg-gray-100'>
      <div className='text-center p-6'>
        <h1 className='text-6xl font-bold text-gray-800 mb-4'>404</h1>
        <p className='text-xl font-semibold text-gray-600 mb-2'>Page Not Found</p>
        <p className='text-gray-500 mb-6'>Sorry, the page you are looking for does not exist.</p>
        <Link
          to='/'
          className='px-4 py-2 bg-blue-500 text-white rounded-lg text-lg hover:bg-blue-600 transition-colors'
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
