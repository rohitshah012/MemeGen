import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-purple-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-xl font-bold">MemeGen 😂</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 font-medium">
          <li className="hover:text-gray-200 cursor-pointer">Home</li>
          <li className="hover:text-gray-200 cursor-pointer">Explore</li>
          <li className="hover:text-gray-200 cursor-pointer">Create</li>
          <li className="hover:text-gray-200 cursor-pointer">Account</li>
        </ul>

        {/* Login Button */}
        <div className="login-signup flex gap-1.5">
             <button className="hidden md:block bg-white text-purple-600 px-4 py-1 rounded-md font-semibold hover:bg-gray-200">
          Login
        </button>
        <button className="hidden md:block bg-white text-purple-600 px-4 py-1 rounded-md font-semibold hover:bg-gray-200">
          Sign Up
        </button>
        </div>
       

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-3">
            <li className="hover:text-gray-200">Home</li>
            <li className="hover:text-gray-200">Explore</li>
            <li className="hover:text-gray-200">Create</li>
            <li className="hover:text-gray-200">Account</li>
          </ul>

          <button className="mt-3 w-full bg-white text-purple-600 py-2 rounded-md font-semibold">
            Login
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;