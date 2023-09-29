import UserModel  from "../../../models/UserModel";
import React, {useContext, useEffect, useState} from "react";
import { SpinnerLoading } from "../../utils/SpinnerLoading";
import {UserContext} from "../../../Auth/UserContext";
import {GlobalContext} from "../../../Auth/GlobalContext";
import {ThreadViewerUserProfile} from "./ThreadViewerUserProfile";
import {useHistory} from "react-router-dom";
import {FollowingList} from "./FollowingList";
import UserService from "../../../Service/UserService";

export const UserProfile = () => {

  const {globalUserId} = useContext(GlobalContext);

  const {current_user_id, current_user_type, isAuthorised} = useContext(UserContext);

  const [user, setUser] = useState<UserModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [isOwner, setisOwner] = useState(false);
  const [totalFollowing, settotalFollowing] = useState(0);
  const [currentState, setcurrentState] = useState<string>('Timeline');

  const [newDp, setnewDp] = useState<any>("");
  const [newAddress, setnewAddress] = useState<any>("");
  const [addressClicked, setaddressClicked] = useState<any>("false");
  const [newPhone, setnewPhone] = useState<any>("");
  const [phoneClicked, setphoneClicked] = useState<any>("false");

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



  useEffect(() => {
    const fetchProfile = async () => {
      const baseUrl: string = "http://localhost:8080/api";
      const url: string = `${baseUrl}/followingTables/search/findAllByFollowerId?followerId=${globalUserId}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const responseJson = await response.json();
      const responseData = responseJson.page.totalElements;
      settotalFollowing(responseData);
    };
    fetchProfile().catch((error: any) => {
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

  let toggleTimeline  = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (currentState == 'Timeline'){
    setcurrentState("Following")
    }
    else {
    setcurrentState("Timeline")
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
            <p className="fw-bold fs-4 m-0">{user?.userName}</p>
            <p>@{user?.userId}</p>
          </div>

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


          {currentState=='Following'&&
              <div>
                <a href="#" className="btn btn-outline-dark mb-1" onClick={toggleTimeline}>
                  Timeline
                </a>
              </div>
          }

          {currentState=='Timeline'&&
              <div>
                <a href="#" className="btn btn-outline-dark" onClick={toggleTimeline}>
                  Following {totalFollowing} Doctors
                </a>
              </div>
          }
        </div>
        {currentState == 'Timeline'&&
            <div className="col-lg-9 mt-1">
              <ThreadViewerUserProfile userId={globalUserId}/>
            </div>
        }
        {currentState == 'Following'&&
            <div className="col-lg-9 mt-1">
              <FollowingList/>
            </div>
        }

      </div>
    </div>
  );
};

