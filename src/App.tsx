import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import FavouritePages from './pages/FavouritePages';
import Nav from './components/Navigator';


function App() {
  return (
    < div>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/favourite' element={<FavouritePages />} />
      </Routes>
    </div >

  );
}

export default App;
