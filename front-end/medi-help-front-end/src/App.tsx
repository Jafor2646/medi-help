import React from "react";
import "./App.css";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { HomePage } from "./layouts/HomePage/HomePage";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { UserProfile } from "./layouts/Profiles/UserProfile/UserProfile";

function App() {
  return (
    <div>
      <Navbar />
      <UserProfile/>
      {/*<HomePage />*/}
      <Footer />
    </div>
  );
}

export default App;
