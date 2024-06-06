import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import FlashcardForm from './CreateFlashcardForm';
import MyFlashcards from './MyFlashcards';
import FlashcardDetails from './FlashcardDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlashcardForm />} />
        <Route path="/myflashcards" element={<MyFlashcards />} />
        <Route path="/flashcarddetails/:id" element={<FlashcardDetails />} />
      </Routes>
    </Router>
  );
}

export default App;