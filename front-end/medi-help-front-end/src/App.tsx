import React from "react";
import "./App.css";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { HomePage } from "./layouts/HomePage/HomePage";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import {ThreadView} from "./layouts/ThreadView/ThreadView";
import {UserProfile} from "./layouts/Profiles/UserProfile/UserProfile";
import { oktaConfig } from './lib/oktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import LoginWidget from "./Auth/LoginWidget";
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';

const oktaAuth = new OktaAuth(oktaConfig);

function App() {
    const customAuthHandler = () => {
        history.push('/login');
    }

    const history = useHistory();

    const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
        history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
    };
  return (
    <div>
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
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
            <Route path='/profile'>
                <UserProfile/>
            </Route>
            <Route path='/login' render={
                () => <LoginWidget config={oktaConfig} />
            }
            />
            <Route path='/login/callback' component={LoginCallback} />
        </Switch>
      <Footer />
        </Security>
    </div>
  );
}

export default App;
