import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReviewList from './components/ReviewList';
import NewReview from './components/NewReview';
import EditReview from './components/EditReview';
import { ToastContainer } from 'react-toastify';
import "./App.css"

import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ReviewList />} />
          <Route path="/new" element={<NewReview />} />
          <Route path="/:id" element={<EditReview />} />
        </Routes>
      </Router>
      <ToastContainer />

    </>

  );
}

export default App;
