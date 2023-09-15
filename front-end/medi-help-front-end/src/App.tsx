import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import {HomePage} from "./layouts/HomePage/HomePage";
import {Footer} from "./layouts/NavbarAndFooter/Footer";


function App() {
  return (
    <div>
      <Navbar/>
      {/* <div className="col-lg">
        <UserProfile/>
      </div> */}
      <HomePage/>
      <Footer/>
    </div>
  );
}

export default App;
