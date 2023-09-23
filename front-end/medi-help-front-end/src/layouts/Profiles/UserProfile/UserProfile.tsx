import { ThreadViewerHomepage } from "../../HomePage/HomeHero/ThreadViewerHomepage/ThreadViewerHomepage";
import UserModel  from "../../../models/UserModel";
import {Link, useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import { SpinnerLoading } from "../../utils/SpinnerLoading";
import {UserContext} from "../../../Auth/UserContext";
import {GlobalContext} from "../../../Auth/GlobalContext";

export const UserProfile = () => {

  const {globalUserId} = useContext(GlobalContext);

  const {current_user_id, current_user_type} = useContext(UserContext);

  const [user, setUser] = useState<UserModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [isOwner, setisOwner] = useState(false);
  const location: any = useLocation();

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
    <div>
      <div className="container-fluid">
        <div className="shadow d-flex justify-content-between m-2">
          <div>
            {user?.picture?
              <img
                className="img-fluid p-1"
                src={user?.picture}
                width='200' 
                height='200'
                alt="Profile Images"
                loading="lazy"
              />
              :
              <img
                className="img-fluid p-1"
                src={require("./../../../images/Placeholder-images/placeholder-dp.png")}
                width='200' 
                height='200'
                alt="Profile Images"
                loading="lazy"
              />
            }
          </div>

          <div className="pt-3">
            <p>
              <strong style={{color: "darkblue"}}>Name:</strong> {user?.userName}<br/>
              <strong style={{color: "darkblue"}}>User Name:</strong> {user?.userId}<br/>
              <strong style={{color: "darkblue"}}>Email:</strong> {user?.email}
            </p>
          </div>
          <div className="pt-5 pe-3">
            <Link type="button" className="btn btn-outline-dark" to="/following">
              Following
            </Link>
          </div>
        </div>
      </div>

      <ThreadViewerHomepage/>
    </div>
  );
};

