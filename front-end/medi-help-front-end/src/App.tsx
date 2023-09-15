import React from "react";
import "./App.css";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { HomePage } from "./layouts/HomePage/HomePage";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { UserProfile } from "./layouts/Profiles/UserProfile/UserProfile";
import {HospitalProfile} from "./layouts/Profiles/HospitalProfile/HospitalProfile";

function App() {
  return (
    <div>
      <Navbar />
      {/*<UserProfile/>*/}
      {/*<HomePage />*/}
      <HospitalProfile/>
      <Footer />
    </div>
  );
}

export default App;
