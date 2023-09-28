import { ThreadViewerHomepage } from "../../HomePage/HomeHero/ThreadViewerHomepage/ThreadViewerHomepage";
import UserModel  from "../../../models/UserModel";
import {Link, useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import { SpinnerLoading } from "../../utils/SpinnerLoading";
import {UserContext} from "../../../Auth/UserContext";
import {GlobalContext} from "../../../Auth/GlobalContext";
import {ThreadViewerUserProfile} from "./ThreadViewerUserProfile";

export const UserProfile = () => {

  const {globalUserId} = useContext(GlobalContext);

  const {current_user_id, current_user_type} = useContext(UserContext);

  const [user, setUser] = useState<UserModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [isOwner, setisOwner] = useState(false);
  const [totalFollowing, settotalFollowing] = useState(0);

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
  }, []);



  useEffect(() => {
    const fetchProfile = async () => {
      const baseUrl: string = "http://localhost:8080/api";
      const url: string = `${baseUrl}/followingTables/search/findAllByFollowerId?followerId=${globalUserId}`;
      console.log(url);
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
  return (
    <div className="d-flex container-fluid">
      <div className="row">
        <div className="col-lg-2 m-2 ms-0 mt-0 p-1 user-profile-bg">
          <div>
            {user?.picture?
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

          <div className="pt-3">
            <p className="fw-bold fs-4 m-0">{user?.userName}</p>
            <p>@{user?.userId}</p>
          </div>
          <div className="pt-1 pe-3">
            <Link type="button" to="/following">
              Following {totalFollowing} Doctors
            </Link>
          </div>
        </div>
      <div className="col-lg-9 mt-1">
        <ThreadViewerUserProfile userId={globalUserId}/>
      </div>
      </div>
    </div>
  );
};

