import { ThreadViewerHomepage } from "../../HomePage/HomeHero/ThreadViewerHomepage/ThreadViewerHomepage";
import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../Auth/GlobalContext";
import {UserContext} from "../../../Auth/UserContext";
import UserModel from "../../../models/UserModel";
import {useHistory} from "react-router-dom";
import {SpinnerLoading} from "../../utils/SpinnerLoading";
import UserService from "../../../Service/UserService";
import {ThreadViewerUserProfile} from "../UserProfile/ThreadViewerUserProfile";
import {FollowingList} from "../UserProfile/FollowingList";
import HospitalExtraInfoModel from "../../../models/HospitalExtraInfoModel";
import HospitalExtraInfoService from "../../../Service/HospitalExtraInfoService";
import {DoctorViwer} from "./DoctorViwer";
import {TestViewer} from "./TestViewer";

export const HospitalProfile = () => {
    const {globalUserId} = useContext(GlobalContext);

    const {current_user_id, current_user_type, isAuthorised} = useContext(UserContext);

    const [user, setUser] = useState<UserModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [isOwner, setisOwner] = useState(false);
    const [totalFollowing, settotalFollowing] = useState(0);
    const [currentState, setcurrentState] = useState<string>('Doctors');
    const [hospitalExtraInfo, sethospitalExtraInfo] = useState<HospitalExtraInfoModel>();

    const [newDp, setnewDp] = useState<any>("");
    const [newAddress, setnewAddress] = useState<any>("");
    const [addressClicked, setaddressClicked] = useState<any>("false");
    const [newPhone, setnewPhone] = useState<any>("");
    const [phoneClicked, setphoneClicked] = useState<any>("false");
    const [newBio, setnewBio] = useState<any>("");
    const [bioClicked, setbioClicked] = useState<any>("false");
    const [newWebsite, setnewWebsite] = useState<any>("");
    const [websiteClicked, setwebsiteClicked] = useState<any>("false");
    const [newgovernanceDetails, setnewgovernanceDetails] = useState<any>("");
    const [governanceDetailsClicked, setgovernanceDetailsClicked] = useState<any>("false");

    const history = useHistory();

    useEffect(() => {
        if (current_user_id == globalUserId){
            setisOwner(true);
        }
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            const baseUrl: string = "http://localhost:8080/api";
            const url: string = `${baseUrl}/users/search/findUserByUserId?userId=${globalUserId}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseJson = await response.json();
            const responseData = responseJson._embedded.users[0];
            let tempUser: UserModel = {
                userId: responseData.userId,
                userName: responseData.userName,
                email: responseData.email,
                password: responseData.password,
                address: responseData.address,
                phone: responseData.phone,
                userType: responseData.userType,
                picture: responseData.picture
            };
            setUser(tempUser);
            setIsLoading(false);
        };
        fetchProfile().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [user]);


    //
    useEffect(() => {
        const fetchProfile = async () => {
            const baseUrl: string = "http://localhost:8080/api";
            const url: string = `${baseUrl}/hospitalExtraInfoes/search/findFirstByHospitalUserId?hospitalUserId=${globalUserId}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseJson = await response.json();
            const responseData = responseJson._embedded.hospitalExtraInfoes[0];
            sethospitalExtraInfo(new HospitalExtraInfoModel(globalUserId, responseData.website, responseData.bio, responseData.status, responseData.governanceDetails));
        };
        fetchProfile().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [hospitalExtraInfo]);


    if (isLoading) {
        return (
            <SpinnerLoading/>
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    let toggleDoctors  = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (currentState == 'Doctors'){
            setcurrentState("Test")
        }
        else {
            setcurrentState("Doctors")
        }
    }

    function getBase64(file: any) {

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setnewDp(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error', error);
        }
    }

    let uploadProfilePicture  = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        UserService.dpChanged(current_user_id, newDp).then();
        setnewDp("");
    }
    let newAddressChanged  = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        setnewAddress(event.currentTarget.value);
    }
    let newPhoneChanged  = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        setnewPhone(event.currentTarget.value);
    }
    let newBioChanged  = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        setnewBio(event.currentTarget.value);
    }
    let newWebsiteChanged  = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        setnewWebsite(event.currentTarget.value);
    }
    let newgovernanceDetailsChanged  = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        setnewgovernanceDetails(event.currentTarget.value);
    }


    return (
        <div className="d-flex container-fluid">
            <div className="row">
                <div className="col-lg-2 m-2 ms-0 mt-0 p-1 user-profile-bg">
                    <div>
                        {newDp!=""?
                            <img
                                className="img-fluid p-1 shadow"
                                src={newDp}
                                height='250'
                                alt="Profile Image"
                                loading="eager"
                            />
                            :
                            user?.picture?
                                <img
                                    className="img-fluid p-1 shadow"
                                    src={user?.picture}
                                    height='250'
                                    alt="Profile Image"
                                    loading="eager"
                                />
                                :
                                <img
                                    className="img-fluid p-1 shadow"
                                    src={require("./../../../images/Placeholder-images/placeholder-dp.png")}
                                    height='250'
                                    alt="Profile Image"
                                    loading="eager"
                                />

                        }

                    </div>


                    {globalUserId == current_user_id&&
                        <div className="d-flex">


                            <div>
                                {newDp==""?
                                    <div>
                                        <label className="form-label text-white m-1" htmlFor="dpfileinput">
                                            <div className="btn btn-dark btn-sm">Change Cover Picture</div>
                                        </label>
                                        <input type="file" accept="image/png, image/jpg, image/jpeg" className="form-control d-none"
                                               id="dpfileinput"  onChange={(event) => {

                                            if (event.target.files){
                                                getBase64(event.target.files[0])
                                            }
                                        }}/>
                                    </div>
                                    :
                                    <div className='mt-1'>
                                        <div className="btn btn-danger btn-sm" onClick={(event) =>{
                                            setnewDp("");}}>Discard
                                        </div>
                                        <div className='btn btn-info ms-2 btn-sm' onClick={uploadProfilePicture}>
                                            Submit
                                        </div>
                                    </div>
                                }
                            </div>


                        </div>
                    }

                    {hospitalExtraInfo?.bio&&
                        <div className="m-1">
                            {hospitalExtraInfo.bio}
                        </div>
                    }

                    {(isAuthorised === 'true' && current_user_id == globalUserId)?
                        bioClicked=='false'?
                            <div className="btn btn-dark btn-sm mb-1" onClick={(event) => {
                                setbioClicked('true');
                            }}>
                                {hospitalExtraInfo?.bio?
                                    <div>
                                        Change Bio
                                    </div>
                                    :
                                    <div>
                                        Add Bio
                                    </div>
                                }
                            </div>
                            :
                            <div className="mb-1">
                                <input maxLength={256} type="text" className="form-control shadow mb-1" id="InputBio" placeholder={`Hey its ${user?.userName}`} onInput={newBioChanged}/>
                                <button className="btn btn-danger me-1 btn-sm" onClick={(event) =>{
                                    setbioClicked('false');
                                    setnewBio("");
                                }}>Discard</button>
                                <button className="btn btn-info btn-sm" onClick={(event) =>{
                                    HospitalExtraInfoService.addBio(globalUserId, newBio).then();
                                    setnewBio("");
                                    setbioClicked('false');
                                }}>Submit</button>
                            </div>
                        :
                        <span></span>


                    }

                    <div className="pt-3">
                        <div className="fw-bold fs-4 m-0">
                            {user?.userName}
                            <span className="btn btn-sm btn-outline-primary ms-2">{hospitalExtraInfo?.status}</span>
                        </div>
                        <p>@{user?.userId}</p>
                    </div>

                    {hospitalExtraInfo?.website&&
                        <div className="m-1">
                            <a className="card-link-style" href={`https://${hospitalExtraInfo.website}`}  target="_blank">{hospitalExtraInfo.website}</a>
                        </div>
                    }

                    {(isAuthorised === 'true' && current_user_id == globalUserId)?
                        websiteClicked=='false'?
                            <div className="btn btn-dark btn-sm mb-1" onClick={(event) => {
                                setwebsiteClicked('true');
                            }}>
                                {hospitalExtraInfo?.website?
                                    <div>
                                        Change Website
                                    </div>
                                    :
                                    <div>
                                        Add Website
                                    </div>
                                }
                            </div>
                            :
                            <div className="mb-1">
                                <input maxLength={50} type="text" className="form-control shadow mb-1" id="InputWebsite" placeholder={`www.${user?.userId}.com`} onInput={newWebsiteChanged}/>
                                <button className="btn btn-danger me-1 btn-sm" onClick={(event) =>{
                                    setwebsiteClicked('false');
                                    setnewWebsite("");
                                }}>Discard</button>
                                <button className="btn btn-info btn-sm" onClick={(event) =>{
                                    HospitalExtraInfoService.addWebsite(globalUserId, newWebsite).then();
                                    setnewWebsite("");
                                    setwebsiteClicked('false');
                                }}>Submit</button>
                            </div>
                        :
                        <span></span>


                    }

                    {hospitalExtraInfo?.governanceDetails&&
                        <div className="m-1">
                            {hospitalExtraInfo.governanceDetails}
                        </div>
                    }

                    {(isAuthorised === 'true' && current_user_id == globalUserId)?
                        governanceDetailsClicked=='false'?
                            <div className="btn btn-dark btn-sm mb-1" onClick={(event) => {
                                setgovernanceDetailsClicked('true');
                            }}>
                                {hospitalExtraInfo?.governanceDetails?
                                    <div>
                                        Change Governance Details
                                    </div>
                                    :
                                    <div>
                                        Add Governance Details
                                    </div>
                                }
                            </div>
                            :
                            <div className="mb-1">
                                <input maxLength={512} type="text" className="form-control shadow mb-1" id="InputGovernanceDetails" placeholder={`Government Approved`} onInput={newgovernanceDetailsChanged}/>
                                <button className="btn btn-danger me-1 btn-sm" onClick={(event) =>{
                                    setgovernanceDetailsClicked('false');
                                    setnewgovernanceDetails("");
                                }}>Discard</button>
                                <button className="btn btn-info btn-sm" onClick={(event) =>{
                                    HospitalExtraInfoService.addGovernanceDetails(globalUserId, newgovernanceDetails).then();
                                    setnewgovernanceDetails("");
                                    setgovernanceDetailsClicked('false');
                                }}>Submit</button>
                            </div>
                        :
                        <span></span>


                    }

                    {user?.address&&
                        <div>
                            Address: <a href={`http://maps.google.com/?q=${user.address}`}>{user.address}</a>
                        </div>
                    }
                    {(isAuthorised === 'true' && current_user_id == globalUserId)?
                        addressClicked=='false'?
                            <div className="btn btn-dark btn-sm mb-1" onClick={(event) => {
                                setaddressClicked('true');
                            }}>
                                {user?.address?
                                    <div>
                                        Change Address
                                    </div>
                                    :
                                    <div>
                                        Add Address
                                    </div>
                                }
                            </div>
                            :
                            <div className="mb-1">
                                <input type="text" className="form-control shadow mb-1" id="InputAddress" placeholder="Mohakhali, Dhaka, Bangladesh" onInput={newAddressChanged}/>
                                <button className="btn btn-danger me-1 btn-sm" onClick={(event) =>{
                                    setaddressClicked('false');
                                    setnewAddress("");
                                }}>Discard</button>
                                <button className="btn btn-info btn-sm" onClick={(event) =>{
                                    UserService.addressChanged(current_user_id, newAddress).then();
                                    setnewAddress("");
                                    setaddressClicked('false');
                                }}>Submit</button>
                            </div>
                        :
                        <span></span>


                    }


                    <br/>
                    {user?.phone&&
                        <div>
                            Phone: <a href={`tel: ${user.phone}`}>{user.phone}</a>
                        </div>
                    }
                    {(current_user_id == globalUserId && isAuthorised === 'true')?
                        phoneClicked=='false'?
                            <div className="btn btn-dark btn-sm mb-1" onClick={(event) => {
                                setphoneClicked('true');
                            }}>
                                {user?.phone?
                                    <div>
                                        Change Phone Number
                                    </div>
                                    :
                                    <div>
                                        Add Phone Number
                                    </div>
                                }
                            </div>
                            :
                            <div className="mb-1">
                                <input type="tel" className="form-control shadow mb-1" id="InputPhone" placeholder="01100000000" onInput={newPhoneChanged}/>
                                <button className="btn btn-danger me-1 btn-sm" onClick={(event) =>{
                                    setphoneClicked('false');
                                    setnewPhone("");
                                }}>Discard</button>
                                <button className="btn btn-info btn-sm" onClick={(event) =>{
                                    UserService.phoneChanged(current_user_id, newPhone).then();
                                    setnewPhone("");
                                    setphoneClicked('false');
                                }}>Submit</button>
                            </div>
                        :
                        <span></span>

                    }


                    {currentState=='Test'&&
                        <div>
                            <a href="#" className="btn btn-outline-dark mb-1" onClick={toggleDoctors}>
                                View Doctors
                            </a>
                        </div>
                    }

                    {currentState=='Doctors'&&
                        <div>
                            <a href="#" className="btn btn-outline-dark" onClick={toggleDoctors}>
                                View Tests
                            </a>
                        </div>
                    }
                </div>
                {currentState == 'Doctors'&&
                    <div className="col-lg-9 mt-1">
                        <DoctorViwer userId={globalUserId}/>
                    </div>
                }
                {currentState == 'Test'&&
                    <div className="col-lg-9 mt-1">
                        <TestViewer userId={globalUserId}/>
                    </div>
                }

            </div>
        </div>
    );
};

