import React, { useState } from 'react';
import Navbar from './Navbar';
import { MdDelete, MdFileUpload } from "react-icons/md";

function FlashcardForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    groupImage: '',
    terms: [{ term: '', termDescription: '', termImage: '' }]
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedTerms = [...formData.terms];
    updatedTerms[index][name] = value;
    setFormData({ ...formData, terms: updatedTerms });
  };

  const handleGroupImageUpload = (e) => {
    const imageFile = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, groupImage: reader.result });
    };
    reader.readAsDataURL(imageFile);
  };

  const handleTermImageUpload = (e, index) => {
    const imageFile = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedTerms = [...formData.terms];
      updatedTerms[index]['termImage'] = reader.result;
      setFormData({ ...formData, terms: updatedTerms });
    };
    reader.readAsDataURL(imageFile);
  };

  const addTerm = () => {
    setFormData({
      ...formData,
      terms: [...formData.terms, { term: '', termDescription: '', termImage: '' }]
    });
  };

  const deleteTerm = (index) => {
    const updatedTerms = formData.terms.filter((term, i) => i !== index);
    setFormData({ ...formData, terms: updatedTerms });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingFlashcards = JSON.parse(localStorage.getItem('flashcardsData')) || [];
    const updatedFlashcards = [...existingFlashcards, formData];
    localStorage.setItem('flashcardsData', JSON.stringify(updatedFlashcards));
    setFormData({
      title: '',
      description: '',
      groupImage: '',
      terms: [{ term: '', termDescription: '', termImage: '' }]
    });
  };

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto mt-4 p-6 bg-white shadow-2xl rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="title" className="block text-gray-700 font-semibold">Create Group*</label>
            <div className="flex items-center">
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              <label htmlFor="groupImage" className="ml-4 flex items-center bg-white text-blue-500 font-base border border-gray-300 py-1 px-1 rounded-md cursor-pointer">
                <MdFileUpload className="mr-2" />
                Upload Image
                <input
                  type="file"
                  id="groupImage"
                  name="groupImage"
                  onChange={handleGroupImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <label htmlFor="description" className="block text-gray-700 mb-2 font-semibold">Add Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Describe the role, responsibility, etc."
            rows="3"
          />

          {/* terms and description */}
          <div className="mt-2">
            {formData.terms.map((term, index) => (
              <div key={index} className="mb-4 bg-gray-50 p-4 rounded-lg border flex items-center space-x-4">
                <input
                  type="text"
                  id={`term${index}`}
                  name="term"
                  value={term.term}
                  onChange={(e) => handleChange(e, index)}
                  className="w-1/2 border border-gray-300 p-2 rounded-md"
                  placeholder="Enter term"
                />
                <input
                  type="text"
                  id={`termDescription${index}`}
                  name="termDescription"
                  value={term.termDescription}
                  onChange={(e) => handleChange(e, index)}
                  className="w-1/2 border border-gray-300 p-2 rounded-md"
                  placeholder="Enter Description"
                />
                <label htmlFor={`termImage${index}`} className="w-1/3 flex items-center bg-white text-blue-500 font-base border border-gray-300
                 py-2 px-4 rounded-md cursor-pointer">
                  <MdFileUpload className="mr-2" />
                  Upload Image
                  <input
                    type="file"
                    id={`termImage${index}`}
                    name="termImage"
                    onChange={(e) => handleTermImageUpload(e, index)}
                    className="hidden"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => deleteTerm(index)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                > <MdDelete /> </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addTerm}
              className="bg-white text-blue-700 font-semibold rounded-md mt-2"
            >
              + Add More
            </button>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded-sm mt-2 w-40"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FlashcardForm;