import {Link} from "react-router-dom";
import React, {useState} from "react";

export const SignupPage = () => {
    const [UsernameMessage, setUsernameMessage] = useState('');
    const [UserEmailMessage, setUserEmailMessage] = useState('');
    const [currentEmail, setcurrentEmail] = useState('');
    const [currentPassword, setcurrentPassword] = useState('');
    const [currentUsername, setcurrentUsername] = useState('');
    const [currentName, setcurrentName] = useState('');
    const [currentMedicalId, setcurrentMedicalId] = useState('');
    const [user_type, setuser_type] = useState("General_User");
    const [hasValidUsername, sethasValidUsername] = useState(false);
    const [hasValidEmail, sethasValidEmail] = useState(false);


    const userNameChanged = (event: React.MouseEvent<HTMLInputElement>) => {
        setUsernameMessage("");
        sethasValidUsername(true);
        const current_username: string = event.currentTarget.value;
        setcurrentUsername(current_username);
        if (current_username.length <= 4 || current_username.length>20){
            setUsernameMessage("User-Name has to be size 5 to 20");
            sethasValidUsername(false);
            return;
        }
        let validChars: String = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789._';
        for (const ch of current_username){
            if (!validChars.includes(ch)){
                setUsernameMessage("User-Name can only have 'a-z' or 'A-Z' or 0-9 or . _ and no other special character");
                sethasValidUsername(false);
                break;
            }
        }
        if (!hasValidUsername){
            return;
        }
        const baseUrl: string = "http://localhost:8080/api";
        const fetchUsernames = async () => {
            const resp = await fetch(`${baseUrl}/users/${current_username}`);
            if (resp.ok) {
                setUsernameMessage("User-Name already exist!");
                sethasValidUsername(false);
                return;
            }
        };
        fetchUsernames();
        if (!hasValidUsername){
            return;
        }
        setUsernameMessage("Valid Username");
    }

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
            if (response.length>0) {
                setUserEmailMessage("Email already exist!");
                sethasValidEmail(false);
                return;
            }
        };
        fetchEmail();
        if (!hasValidEmail){
            return;
        }
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,2}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ( !re.test(current_email) ) {
            setUserEmailMessage("Invalid Email!");
            sethasValidEmail(false);
            return;
        }
        setUserEmailMessage("");
    }

    const userTypeSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setuser_type(event.target.value);
    }


    const PasswordChanged = (event: React.MouseEvent<HTMLInputElement>) => {
        setcurrentPassword(event.currentTarget.value);
    }
    const NameChanged = (event: React.MouseEvent<HTMLInputElement>) => {
        setcurrentName(event.currentTarget.value);
    }
    const MedicalIdChanged = (event: React.MouseEvent<HTMLInputElement>) => {
        setcurrentMedicalId(event.currentTarget.value);
    }

    const submitClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (currentEmail!=undefined && currentPassword!= undefined && currentName!=undefined && currentUsername!=undefined && hasValidEmail && hasValidUsername){
            if (user_type == "Doctor" && currentMedicalId!= undefined){
                // First update DB as normal user
                //  then Update DB for Doctor user who has extra parameter of medical Id

            }
            else if (user_type == 'General_User' || user_type == "Hospital"){

                // for normal user as genral user and hospital has same must have data


            }
        }
    }

    return (
        <div>
            <form className="card shadow m-4">
                <div className="m-5">
                    <div className="mb-3">

                        <label htmlFor="InputEmail" className="form-label">Email</label>

                        <input required type="email" className="form-control shadow" id="InputEmail" placeholder="iub.an.naser@example.com" onInput={userEmailChanged}/>
                        <div id="UserEmailHelp" className="form-text">{UserEmailMessage}</div>

                    </div>

                    <div className="mb-3">

                        <label htmlFor="InputName" className="form-label">Name</label>

                        <input required type="text" className="form-control shadow" id="InputName"  placeholder="Iub An Naser" onInput={NameChanged}/>

                    </div>

                    <div className="mb-3">

                        <label htmlFor="InputUsername" className="form-label">User-name</label>

                        <input type="text" className="form-control shadow" id="InputUsername" placeholder="ian" onInput={userNameChanged}/>
                        <div id="UsernameHelp" className="form-text">{UsernameMessage}</div>

                    </div>

                    <div className="mb-3">

                        <label htmlFor="InputPassword" className="form-label">Password</label>

                        <input required type="password" className="form-control shadow" id="InputPassword"  placeholder="*********" onInput={PasswordChanged}/>

                    </div>

                    <div className='mb-3'>
                        <label htmlFor="typeSelect" className="form-label">Select User Type</label>
                        <select className="form-select shadow" id="typeSelect" onChange={userTypeSelected}>
                            <option selected value='General_User'>General User</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Hospital">Hospital</option>
                        </select>
                    </div>
                    {user_type == "Doctor"?
                        <div className="mb-3">

                            <label htmlFor="InputMedicalId" className="form-label">Medical ID</label>

                            <input type="text" className="form-control shadow" id="InputMedicalId" onInput={MedicalIdChanged}/>

                        </div>
                        :
                        <span></span>
                    }
                    <button type="submit" className="btn btn-outline-dark me-3 shadow" onClick={submitClicked}>Sign Up</button>
                </div>
            </form>
        </div>
    );
};