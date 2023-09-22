import {Link, Redirect, useHistory} from "react-router-dom";
import React, {useState} from "react";
import ThreadViewerModel from "../models/ThreadViewerModel/ThreadViewerModel";
import UserModel from "../models/UserModel";
import {Global} from "./UserStatas";

export const LoginPage = () => {
    const [UserEmailMessage, setUserEmailMessage] = useState('');
    const [UserPasswordMessage, setUserPasswordMessage] = useState('');
    const [currentEmail, setcurrentEmail] = useState('');
    const [hasValidEmail, sethasValidEmail] = useState(false);
    const [currentPassword, setcurrentPassword] = useState('');
    const [currentResponse, setcurrentResponse] = useState<UserModel>();
    const history = useHistory();
    const userEmailChanged = (event: React.MouseEvent<HTMLInputElement>) => {
        setUserEmailMessage("");
        sethasValidEmail(true);
        const baseUrl: string = "http://localhost:8080/api";
        const current_email: string = event.currentTarget.value;
        setcurrentEmail(current_email);
        const fetchEmail = async () => {
            const resp = await fetch(`${baseUrl}/users/search/findUserByEmail?email=${current_email}`);
            const respData = await resp.json();
            const response = respData._embedded.users;
            if (response.length==0) {
                setUserEmailMessage("No Account Exist by this email");
                sethasValidEmail(false);
                return;
            }
            setcurrentResponse(new UserModel(
                response[0].userId, response[0].userName, response[0].email, response[0].password, response[0].address, response[0].phone, response[0].userType, response[0].picture
            ));
        };
        fetchEmail();
        if (!hasValidEmail){
            return;
        }
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,2}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ( !re.test(current_email) ) {
            setUserEmailMessage("Invalid Email!");
            sethasValidEmail(true);
            return;
        }
        setUserEmailMessage("");
    }

    const PasswordChanged = (event: React.MouseEvent<HTMLInputElement>) => {
        setcurrentPassword(event.currentTarget.value);
    }

    const LoginClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (hasValidEmail){
            if (currentPassword === currentResponse?.password){
                (Global.isAuthorised as any) = true;
                (Global.currentUserId as any) = currentResponse.userId;
                (Global.currentUserType as any) = currentResponse.userType;
                console.log(Global.isAuthorised, Global.currentUserId, Global.currentUserType)
                history.push('/home');
            }
        }
    }


    return (
        <div>
        <form className="card shadow m-4">
            <div className="m-5">
                <div className="mb-3">

                    <label htmlFor="InputEmail" className="form-label">Email</label>

                    <input type="email" className="form-control shadow" id="InputEmail" aria-describedby="emailHelp" placeholder="iub.an.naser@example.com" onInput={userEmailChanged}/>
                    <div id="UserEmailHelp" className="form-text">{UserEmailMessage}</div>

                </div>
                <div className="mb-3">

                    <label htmlFor="InputPassword" className="form-label">Password</label>

                    <input type="password" className="form-control shadow" id="InputPassword" onInput={PasswordChanged}/>

                </div>
                <button type="button" className="btn btn-outline-dark me-3 shadow" onClick={LoginClicked }>Log In</button>
                <span className="me-3">or</span>
                <Link to="/signup">Create an account</Link>
            </div>
        </form>
        </div>
    );
};
