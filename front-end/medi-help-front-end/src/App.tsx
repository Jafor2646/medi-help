import React, {useEffect, useState} from "react";
import "./App.css";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { HomePage } from "./layouts/HomePage/HomePage";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import {Redirect, Route, Switch} from "react-router-dom";
import {ThreadView} from "./layouts/ThreadView/ThreadView";
import {UserProfile} from "./layouts/Profiles/UserProfile/UserProfile";
import {LoginPage} from "./Auth/LoginPage";
import {SignupPage} from "./Auth/SignupPage";
import {UserContext} from "./Auth/UserContext";
import Cookies from "js-cookie";
import {GlobalContext} from "./Auth/GlobalContext";
import {SearchPage} from "./layouts/SearchPage/SearchPage";
import {Profile} from "./layouts/Profiles/Profile";
import { BlogView } from "./layouts/BlogView/BlogView";
import {DoctorProfile} from "./layouts/Profiles/DoctorProfile/DoctorProfile";
import {HospitalProfile} from "./layouts/Profiles/HospitalProfile/HospitalProfile";


function App() {
    const [isAuthorised, setisAuthorised] = useState(() => Cookies.get('isAuthorised') || 'false');
    const [current_user_id, setcurrent_user_id] = useState(() => Cookies.get('current_user_id') || '');
    const [current_user_type, setcurrent_user_type] = useState(() => Cookies.get('current_user_type') || '');
    const [globalUserId, setglobalUserId] = useState(() => Cookies.get('globalUserId') || '');
    const [globalThreadId, setglobalThreadId] = useState(() => Cookies.get('globalThreadId') || '');
    const [globalThreadDate, setglobalThreadDate] = useState(() => Cookies.get('globalThreadDate') || '');
    const [globalBlogId, setglobalBlogId] = useState(() => Cookies.get('globalBlogId') || '');
    const [globalBlogDate, setglobalBlogDate] = useState(() => Cookies.get('globalBlogDate') || '');
    const [globalSearchText, setglobalSearchText] = useState(() => Cookies.get('globalSearchText') || '');

    useEffect(() => {
        Cookies.set('isAuthorised', isAuthorised);
        Cookies.set('current_user_id', current_user_id);
        Cookies.set('current_user_type', current_user_type);
        Cookies.set('globalUserId', globalUserId);
        Cookies.set('globalThreadId', globalThreadId);
        Cookies.set('globalThreadDate', globalThreadDate);
        Cookies.set('globalBlogId', globalBlogId);
        Cookies.set('globalBlogDate', globalBlogDate);
        Cookies.set('globalSearchText', globalSearchText);
    }, [isAuthorised, current_user_id, current_user_type, globalUserId, globalThreadId, globalBlogId, globalSearchText]);

  return (
    <div>
        <GlobalContext.Provider value = {{globalUserId, setglobalUserId, globalThreadId, setglobalThreadId, globalThreadDate, setglobalThreadDate, globalBlogId, setglobalBlogId, globalBlogDate, setglobalBlogDate, globalSearchText, setglobalSearchText}}>
        <UserContext.Provider value={{isAuthorised, setisAuthorised, current_user_id, setcurrent_user_id, current_user_type, setcurrent_user_type}}>
          <Navbar />
            <Switch>
                <Route path='/' exact>
                    <Redirect to="/home"/>
                </Route>
                <Route path='/home'>
                    <HomePage/>
                </Route>
                <Route path='/thread'>
                    <ThreadView/>
                </Route>
                <Route path='/blog'>
                    <BlogView/>
                </Route>
                <Route path='/profile'>
                    <Profile/>
                </Route>
                <Route path='/General-Profile'>
                    <UserProfile/>
                </Route>
                <Route path='/Doctor-Profile'>
                    <DoctorProfile/>
                </Route>
                <Route path='/Hospital-Profile'>
                    <HospitalProfile/>
                </Route>
                <Route path='/admin-Profile'>
                    <UserProfile/>
                </Route>
                <Route path='/login'>
                    <LoginPage/>
                </Route>
                <Route path='/search'>
                    <SearchPage/>
                </Route>
                <Route path='/signup'>
                    <SignupPage/>
                </Route>
            </Switch>
          <Footer />
        </UserContext.Provider>
        </GlobalContext.Provider>
    </div>
  );
}

export default App;
