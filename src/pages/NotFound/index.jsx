import React, { useState } from 'react';
import Tovino from '@/assets/gifs/tovino.webp';
import { RouteGif1, RouteGif2, RouteGif3 } from '../../assets/gifs';
import { RotateCw } from 'lucide-react';

function NotFound() {
  const gifs = [RouteGif1, RouteGif2, RouteGif3];

  // Initialize state with a random gif
  const [image, setImage] = useState(() => {
    const randomIndex = Math.floor(Math.random() * gifs.length);
    return gifs[randomIndex];
  });

  function getRandomGif() {
    const randomIndex = Math.floor(Math.random() * gifs.length);
    return gifs[randomIndex];
  }

  const handleClick = () => {
    setImage(getRandomGif());
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-slate-100/10">
      {/* bg-gradient-to-r from-customLightBlue/50 via-customGreen/50 to-customOrange/50 */}
      <div className="text-center p-6  bg-white rounded-lg shadow-lg max-w-md mx-auto ">
        <div className="mb-6 relative w-fit mx-auto max-w-[300px] max-h-[300px]" onClick={handleClick}>
          <img
            src={image}
            alt="Sad Cat"
            className=" mx-auto w-full h-full"
          />
          <div className='flex items-center justify-center absolute z-20 cursor-pointer top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] opacity-50' >
            <RotateCw strokeWidth={2.5} color='white' size={80} className='' />
          </div>

        </div>
        <h1 className="text-4xl font-bold text-gray-800">Oops! Page Not Found</h1>
        <p className="text-lg text-gray-600 mt-4">
          The page you're looking for doesn't seem to exist.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="mt-6 bg-customLightBlue text-white py-2 px-6 rounded-full hover:bg-customBlue transition duration-300"
        >
          Go Back Home
        </button>
      </div>

      <div
        className="-z-10 absolute top-[8%] -left-2 w-[300px] h-[300px] bg-[#cd205c]/70 rounded-full blur-3xl opacity-40"
      />


      <div
        className="-z-10 absolute top-[10%] -right-2 w-[300px] h-[300px] bg-[#2E769F]/70 rounded-full blur-3xl opacity-50"
      />

      <div
        className="-z-10 absolute -bottom-2 left-4 w-[300px] h-[300px] bg-[#F99D1C]/70 rounded-full blur-3xl opacity-40"
      />


      <div
        className="-z-10 absolute -bottom-4 right-6 w-[300px] h-[300px] bg-[#20BBAD]/70 rounded-full blur-3xl opacity-50"
      />
    </div>
  );
}

export default NotFound;

