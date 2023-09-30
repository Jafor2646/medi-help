import {Link, Redirect, useHistory} from "react-router-dom";
import React, {useContext, useState} from "react";
import UserService from "../Service/UserService";
import {UserContext} from "./UserContext";
import DoctorExtraInfoService from "../Service/DoctorExtraInfoService";
import DoctorExtraInfoModel from "../models/DoctorExtraInfoModel";
import HospitalExtraInfoModel from "../models/HospitalExtraInfoModel";
import HospitalExtraInfoService from "../Service/HospitalExtraInfoService";

export const SignupPage = () => {

    const {setisAuthorised, setcurrent_user_id, setcurrent_user_type} = useContext(UserContext);

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
    const [hospitalType, sethospitalType] = useState("Private");

    const history = useHistory();


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
            const resp = await fetch(`${baseUrl}/users/search/findUserByUserId?userId=${current_username}`);
            const respJson = await resp.json();
            const respData = respJson._embedded.users[0];
            if (respData != undefined) {
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
    const hospitalTypeSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
        sethospitalType(event.target.value);
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
                let user = {
                    "userId": currentUsername,
                    "userName": currentName,
                    "email": currentEmail,
                    "password": currentPassword,
                    "userType": user_type
                }
                UserService.createUser(user).then();
                let doctorExtraInfo = new DoctorExtraInfoModel(currentUsername, currentMedicalId);
                DoctorExtraInfoService.createDoctorExtraInfo(doctorExtraInfo).then();
                setisAuthorised("true");
                setcurrent_user_id(currentUsername);
                setcurrent_user_type(user_type);
                history.push('/home');

            }
            else if (user_type == 'General_User'){

                let user = {
                    "userId": currentUsername,
                    "userName": currentName,
                    "email": currentEmail,
                    "password": currentPassword,
                    "userType": user_type
                }
                UserService.createUser(user).then();
                setisAuthorised("true");
                setcurrent_user_id(currentUsername);
                setcurrent_user_type(user_type);
                history.push('/home');


            }
            else if (user_type == "Hospital"){

                let user = {
                    "userId": currentUsername,
                    "userName": currentName,
                    "email": currentEmail,
                    "password": currentPassword,
                    "userType": user_type
                }
                UserService.createUser(user).then();
                let hospitalExtraInfo = new HospitalExtraInfoModel(currentUsername, undefined, undefined, hospitalType);
                HospitalExtraInfoService.createHospitalExtraInfo(hospitalExtraInfo).then();
                setisAuthorised("true");
                setcurrent_user_id(currentUsername);
                setcurrent_user_type(user_type);
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

                            <label htmlFor="InputMedicalId" className="form-label">BMDC registration number</label>

                            <input type="text" className="form-control shadow" id="InputMedicalId" maxLength={7} onInput={MedicalIdChanged}/>

                        </div>
                        :
                        <span></span>
                    }
                    {user_type == "Hospital"?
                        <div className="mb-3">

                            <label htmlFor="hospitalTypeSelect" className="form-label">Select Hospital Type</label>
                            <select className="form-select shadow" id="hospitalTypeSelect" onChange={hospitalTypeSelected}>
                                <option selected value="Private">Private</option>
                                <option value="Public">Public</option>
                            </select>

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
