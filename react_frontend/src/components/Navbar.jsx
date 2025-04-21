import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          {/* App Logo/Name Placeholder */}
          My App
        </div>
        <div>
          {/* Navigation Links Placeholder */}
          <ul className="flex space-x-4">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div>
          {/* User Profile Placeholder */}
          <a href="#">
            {/* User Avatar/Icon Placeholder */}
            Profile
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;