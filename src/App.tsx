import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';
import Landing from './pages/Landing';
import Schedules from './pages/Schedules';
import Book from './pages/Book';
import Track from './pages/Track';

const App: React.FC = () => {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/book/:slotId" element={<Book />} />
          <Route path="/track" element={<Track />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
};

export default App;

