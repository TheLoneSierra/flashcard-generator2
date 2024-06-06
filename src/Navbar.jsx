import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <h1 className=' text-black font-bold container mx-auto mt-4 ml-26 text-3xl'>Create Flashcard</h1>

      {/* Navbar */}
      <nav className="navbg text-black border border-t-0 border-x-0 border-b-gray-200 py-2 mt-2">
        <div className="container mx-auto px-2">
          <ul className="flex items-end justify-start">
            <li className="mr-6 hover:text-blue-700 font-medium cursor-pointer text-lg">
              <Link to="/">Create New</Link>
            </li>
            <li className="mr-6 hover:text-blue-700 font-medium cursor-pointer text-lg">
              <Link to="/myflashcards">My Flashcards</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar