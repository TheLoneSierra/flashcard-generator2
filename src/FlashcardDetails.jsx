import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { FiDownload, FiPrinter } from 'react-icons/fi'; // Importing icons
import { FaCopy, FaFacebookF, FaLinkedinIn, FaTwitter, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { IoMdClose, IoIosShareAlt } from "react-icons/io";
import { MdOutlineShare } from "react-icons/md";

//in case user didnt upload image so used a default image to show
const DEFAULT_TERM_IMAGE = '/src/assets/image.png';

const FlashcardDetails = () => {
  const { id } = useParams();
  const flashcardDataArray = JSON.parse(localStorage.getItem('flashcardsData')) || [];
  const flashcardData = flashcardDataArray[parseInt(id)];

  const defaultTerm = flashcardData.terms.length > 0 ? flashcardData.terms[0] : null;
  const [selectedTerm, setSelectedTerm] = useState(defaultTerm);
  const [showModal, setShowModal] = useState(false);
  const flashcardLink = `${window.location.origin}/flashcarddetails/${id}`;

  const handleShare = () => {
    setShowModal(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(flashcardLink);
    alert('Link copied to clipboard');
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-bold mb-4">{flashcardData.title}</h1>
        <p className="text-gray-600 mb-4">{flashcardData.description}</p>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Terms List */}
          <div className="flex flex-col w-full md:w-1/4 bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl border border-double border-t-transparent border-l-transparent border-r-transparent border-b-gray-400 font-bold text-gray-400 mb-4">Flashcards</h2>
            {flashcardData.terms.map((term, index) => (
              <button
                key={index}
                onClick={() => setSelectedTerm(term)}
                className={`mb-2 p-2 text-md font-semibold text-left ${selectedTerm === term ? 'bg-blue-100' : 'bg-white'} hover:text-red-600 rounded-md`}
              >
                {term.term}
              </button>
            ))}
          </div>

          {/* Term Details and Buttons */}
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-3/4">
            <div className="flex flex-col w-full md:w-2/3 bg-white shadow-md rounded-lg p-4">
              {selectedTerm && (
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Image */}
                  <div className="w-full md:w-1/2 h-64">
                    <img
                      src={selectedTerm.termImage || DEFAULT_TERM_IMAGE}
                      alt={selectedTerm.term}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  {/* Description */}
                  <div className="w-full md:w-1/2">
                    <h3 className="text-xl font-bold mb-2">{selectedTerm.term}</h3>
                    <p className="text-gray-600">{selectedTerm.termDescription}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col w-full md:w-1/3 bg-white shadow-md rounded-lg p-4 space-y-4">
              <button onClick={handleShare} className="hover:text-blue-500 flex items-center justify-center bg-gray-200 text-black py-2 px-4 rounded-md">
                <IoIosShareAlt className="mr-2" /> Share
              </button>
              <button className="flex items-center justify-center bg-gray-200 text-black py-2 px-4 rounded-md hover:text-blue-500">
                <FiDownload className="mr-2" /> Download
              </button>
              <button className="flex items-center justify-center bg-gray-200 text-black py-2 px-4 rounded-md hover:text-blue-500">
                <FiPrinter className="mr-2" /> Print
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <IoMdClose size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Share</h2>
            <p className="mb-2 font-semibold text-base">Copy the link below to share the flashcard</p>
            <div className="flex items-center mb-4">
              <input
                type="text"
                value={flashcardLink}
                readOnly
                className="flex-grow px-2 py-1 text-sm border border-dashed border-gray-700 rounded-md"
              />
              <button
                onClick={copyToClipboard}
                className="ml-2 bg-white text-black py-1 px-3 rounded-md"
              >
                <FaCopy />
              </button>
              <button > <MdOutlineShare /> </button>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-around items-center space-x-2">
              <Link to={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(flashcardLink)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                <FaFacebookF size={18} />
              </Link>
              <Link to={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(flashcardLink)}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
                <FaLinkedinIn size={18} />
              </Link>
              <Link to={`https://twitter.com/intent/tweet?url=${encodeURIComponent(flashcardLink)}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                <FaTwitter size={18} />
              </Link>
              <Link to={`https://api.whatsapp.com/send?text=${encodeURIComponent(flashcardLink)}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
                <FaWhatsapp size={18} />
              </Link>
              <Link to={`mailto:?subject=Check%20out%20this%20flashcard&body=${encodeURIComponent(flashcardLink)}`} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800">
                <FaEnvelope size={18} />
              </Link>

            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default FlashcardDetails;