import UserModel  from "../../../models/UserModel";
import React, {useContext, useEffect, useState} from "react";
import { SpinnerLoading } from "../../utils/SpinnerLoading";
import {UserContext} from "../../../Auth/UserContext";
import {GlobalContext} from "../../../Auth/GlobalContext";
import { BlogViewerDoctorProfile } from "./BlogViewerDoctorProfile";
import {useHistory} from "react-router-dom";
import {FollowingList} from "../UserProfile/FollowingList";
import UserService from "../../../Service/UserService";
import DoctorExtraInfoModel from "../../../models/DoctorExtraInfoModel";
import { error } from "console";
import {TopicBadge} from "../../utils/TopicBadge";
import TopicTable from "../../../models/TopicTable";
import DoctorSpecialitiesService from "../../../Service/DoctorSpecialitiesService";
import {ThreadViewerDoctorProfile} from "./ThreadViewerDoctorProfile";
import {FollowingListDoctor} from "./FollowingListDoctor";
import {DoctorEducation} from "./DoctorEducation";
import {DoctorProffesion} from "./DoctorProffesion";

export const DoctorProfile = () => {

  const {globalUserId} = useContext(GlobalContext);

  const {current_user_id, current_user_type, isAuthorised} = useContext(UserContext);

  const [user, setUser] = useState<UserModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [isOwner, setisOwner] = useState(false);
  const [totalFollowing, settotalFollowing] = useState(0);
  const [currentState, setcurrentState] = useState<string>('Timeline');
  const [doctorExtraInfoes, setDoctorExtraInfoes] = useState<DoctorExtraInfoModel>();
  const [newDp, setnewDp] = useState<any>("");
  const [newAddress, setnewAddress] = useState<any>("");
  const [addressClicked, setaddressClicked] = useState<any>("false");
  const [newTopic, setnewTopic] = useState<any>("");
  const [topicClicked, settopicClicked] = useState<any>("false");
  const [newPhone, setnewPhone] = useState<any>("");
  const [phoneClicked, setphoneClicked] = useState<any>("false");
  const [doctorSpecialities, setdoctorSpecialities] = useState<string[]>([]);
  const [topicTable, settopicTable] = useState<TopicTable[]>([]);

  const history = useHistory();

  useEffect(() => {
    const fetchTopic = async () => {
      const baseUrl: string = "http://localhost:8080/api";

      const url: string = `${baseUrl}/topicTables`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseJson = await response.json();

      const responseData = responseJson._embedded.topicTables;

      const loadedTopics: TopicTable[] = [];

      for (const key in responseData) {

        loadedTopics.push({
          topicName: responseData[key].topicName
        });
      }
      settopicTable(loadedTopics);

    };
    fetchTopic().catch((error: any) => {
      setHttpError(error.message);
    })
  }, []);

  const topicSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if(event.target.value != "default"){

      setnewTopic(event.target.value);
    }
  }



  useEffect(() => {
    const fetchDoctorExtraInfo =async () => {
      const baseUrl: string = "http://localhost:8080/api";
      const url: string = `${baseUrl}/doctorExtraInfoes/search/findFirstByDoctorUserId?doctorUserId=${globalUserId}`;
      const response = await fetch(url);
      if(!response.ok){
        throw new Error('Something went wrong!');
      }
      const responseJson = await response.json();
      const responseData = responseJson._embedded.doctorExtraInfoes[0];
      let tempDoctorExtraInfo: DoctorExtraInfoModel = {
        doctorUserId: responseData.doctorUserId,
        medicalRegistrationNumber: responseData.medicalRegistrationNumber,
        city: responseData.city,
        verified: responseData.verified,
        currentRating: responseData.currentRating
      };
      setDoctorExtraInfoes(tempDoctorExtraInfo);
      setIsLoading(true);
    };
    fetchDoctorExtraInfo().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    })
  }, []);







  useEffect(() => {
    const fetchDoctorSpecialities =async () => {
      const baseUrl: string = "http://localhost:8080/api";
      const url: string = `${baseUrl}/doctorSpecialitieses/search/findDoctorSpecialitiesByDoctorId?doctorId=${globalUserId}`;
      const response = await fetch(url);
      if(!response.ok){
        throw new Error('Something went wrong!');
      }
      const responseJson = await response.json();
      const responseData = responseJson._embedded.doctorSpecialitieses;
      let tempArr: string[] = [];
      for (const key in responseData){
        tempArr.push(responseData[key].speciality);
      }
      setdoctorSpecialities(tempArr);

      setIsLoading(true);
    };
    fetchDoctorSpecialities().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    })
  }, []);










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



  useEffect(() => {
    const fetchFollowerId = async () => {
      const baseUrl: string = "http://localhost:8080/api";
      const url: string = `${baseUrl}/followingTables/search/findAllByFollowingId?followingId=${globalUserId}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const responseJson = await response.json();
      const responseData = responseJson.page.totalElements;
      settotalFollowing(responseData);
    };
    fetchFollowerId().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    })
  }, []);


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
                            <div className="btn btn-dark btn-sm">Change Your Profile Picture</div>
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

          <div className="pt-3">
            <div className="fw-bold fs-4 m-0">{user?.userName}
              {!doctorExtraInfoes?.verified?
                <span className="btn btn-sm btn-warning ms-2">Unverified</span>
                :
                <span className="btn btn-sm btn-primary ms-2">Verified</span>
              
              }
            </div>
            <p>@{user?.userId}</p>
          </div>

















          {doctorSpecialities.length>0&&
              doctorSpecialities.map((doctorSpeciality) => (
                  <TopicBadge topic={doctorSpeciality}/>
              ))
          }
          {(isAuthorised === 'true' && current_user_id == globalUserId)?
              topicClicked=='false'?
                  <div className="btn btn-dark btn-sm mb-1" onClick={(event) => {
                    settopicClicked('true');
                  }}>
                    <div>
                      Add Specialities
                    </div>
                  </div>
                  :
                  <div className="mb-1">
                    <div className='mb-1 ms-1'>
                      <select className="form-select shadow" id="typeSelect" onChange={topicSelected}>
                        <option selected value='default'> Select a Speciality</option>
                        {topicTable.map(topic => (
                            <option value={topic.topicName}>{topic.topicName}</option>
                        ))}
                      </select>
                    </div>
                    <button className="btn btn-danger me-1 btn-sm" onClick={(event) =>{
                      settopicClicked('false');
                      setnewTopic("");
                    }}>Discard</button>
                    <button className="btn btn-info btn-sm" onClick={(event) =>{
                      let speciality = {
                        "doctorId": current_user_id,
                        "speciality": newTopic
                      }
                      DoctorSpecialitiesService.createDoctorSpecialities(speciality).then();
                      setnewTopic("");
                      settopicClicked('false');
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


          <div>
            <a href="#" className="btn btn-outline-dark mb-1" onClick={(e) =>{
              setcurrentState("Timeline");
            }}>
              Blogs
            </a>
          </div>

          <div>
            <a href="#" className="btn btn-outline-dark mb-1" onClick={(e) =>{
              setcurrentState("Threads");
            }}>
              Threads
            </a>
          </div>

          <div>
            <a href="#" className="btn btn-outline-dark mb-1" onClick={(e) =>{
              setcurrentState("Education");
            }}>
              Education
            </a>
          </div>

          {/*<div>*/}
          {/*  <a href="#" className="btn btn-outline-dark mb-1" onClick={(e) =>{*/}
          {/*    setcurrentState("Profession");*/}
          {/*  }}>*/}
          {/*    Profession*/}
          {/*  </a>*/}
          {/*</div>*/}

          <div>
            <a href="#" className="btn btn-outline-dark" onClick={(e) =>{
              setcurrentState("Following");
            }}>
              Total {totalFollowing} Follower
            </a>
          </div>

        </div>
        {currentState == 'Timeline'&&
            <div className="col-lg-9 mt-1">
              <BlogViewerDoctorProfile userId={globalUserId}/>
            </div>
        }
        {currentState == 'Threads'&&
            <div className="col-lg-9 mt-1">
              <ThreadViewerDoctorProfile userId={globalUserId}/>
            </div>
        }
        {currentState == 'Following'&&
            <div className="col-lg-9 mt-1">
              <FollowingListDoctor/>
            </div>
        }
        {currentState == 'Education'&&
            <div className="col-lg-9 mt-1">
              <DoctorEducation/>
            </div>
        }
        {/*{currentState == 'Profession'&&*/}
        {/*    <div className="col-lg-9 mt-1">*/}
        {/*      <DoctorProffesion/>*/}
        {/*    </div>*/}
        {/*}*/}

      </div>
    </div>
  );
};