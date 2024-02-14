import React from 'react';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Your Logo</div>
        <div className="space-x-4">
          <a href="#" className="text-white">Home</a>
          <a href="#" className="text-white">About</a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
