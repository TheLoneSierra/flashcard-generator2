import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";

function MyFlashcards() {
  const [flashcardData, setFlashcardData] = useState([]);

  useEffect(() => {
    const storedFlashcards = JSON.parse(localStorage.getItem('flashcardsData')) || [];
    setFlashcardData(storedFlashcards);
  }, []);

  const deleteFlashcard = (index) => {
    const updatedFlashcards = [...flashcardData];
    updatedFlashcards.splice(index, 1);
    setFlashcardData(updatedFlashcards);
    localStorage.setItem('flashcardsData', JSON.stringify(updatedFlashcards));
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-2 py-4 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {flashcardData.map((flashcard, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center relative border-2 border-gray-300">
              {/* Group Image */}
              <div className="w-24 h-24 mt-4 absolute -top-7 left-1/2 transform -translate-x-1/2">
                <img 
                  src={flashcard.groupImage} 
                  alt="Group" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              {/* Card Content */}
              <div className="mt-16 w-full text-center">
                <h2 className="text-xl font-bold mb-2">{flashcard.title}</h2>
                <p className="text-gray-600 text-sm mb-4">{flashcard.description}</p>
                <p className="text-gray-800 font-medium mb-2">{flashcard.terms.length} Cards</p>
                <div className="flex justify-center items-center space-x-4">
                  <Link 
                    to={`/flashcarddetails/${index}`} 
                    className="bg-white border border-red-500 text-red-500 py-1 px-2 w-56 font-medium rounded-md"
                  >
                    View Cards
                  </Link>
                  <button
                    onClick={() => deleteFlashcard(index)}
               className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <IoMdClose size={24} />
            </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyFlashcards;