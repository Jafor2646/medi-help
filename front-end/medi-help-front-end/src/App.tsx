import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import {HomePage} from "./layouts/HomePage/HomePage";

function App() {
  return (
    <div>
      <Navbar />
      <HomePage/>
    </div>
  );
}

export default App;
