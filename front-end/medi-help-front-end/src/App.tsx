import React from "react";
import "./App.css";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { HomePage } from "./layouts/HomePage/HomePage";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { UserProfile } from "./layouts/Profiles/UserProfile/UserProfile";
import {HospitalProfile} from "./layouts/Profiles/HospitalProfile/HospitalProfile";
import {SearchPage} from "./layouts/SearchPage/SearchPage";
import {DoctorProfile} from "./layouts/Profiles/DoctorProfile/DoctorProfile";

function App() {
  return (
    <div>
      <Navbar />
      <HomePage/>
      <Footer />
    </div>
  );
}

export default App;
