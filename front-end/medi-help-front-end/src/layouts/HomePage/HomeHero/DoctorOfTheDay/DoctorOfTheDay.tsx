import {useContext, useEffect, useState} from "react";
import UserModel from "../../../../models/UserModel";
import {Link} from "react-router-dom";
import {GlobalContext} from "../../../../Auth/GlobalContext";

export const DoctorOfTheDay = () => {
  const [user, setUser] = useState<UserModel>();
  const {setglobalUserId} = useContext(GlobalContext);


  useEffect(() => {
    const fetchProfile = async () => {
      const baseUrl: string = "http://localhost:8080/api";

      let url: string = `${baseUrl}/doctorExtraInfoes`;
      let response = await fetch(url);
      let responseJson = await response.json();
      let responseData = responseJson;
      let mx = 0;
      let userId = "";
      for (const key in responseData){
        if (responseData[key].currentRating> mx){
          mx = responseData[key].currentRating;
          userId = responseData[key].doctorUserId;
        }
      }





      url = `${baseUrl}/users/search/findUserByUserId?userId=${userId}`;
      response = await fetch(url);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      responseJson = await response.json();
      responseData = responseJson._embedded.users[0];
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
    };
    fetchProfile().catch((error: any) => {
    })
  }, [user]);



  return (
    <div className="card shadow home-doctor-of-the-day-bg mx-auto">
      <div className="card-body">
        <h4 className="p-4 text-white bg-primary fw-bold fs-5">
          Recommended Doctor
        </h4>
        <div className="lc-block">
          {user?.picture?
            <img
              className="img-fluid"
              src={user.picture}
              sizes="(max-width: 1080px) 100vw, 1080px"
              width="1080"
              height="1080"
              alt="Doctor Images"
              loading="eager"
            />
              :
              <img
                  className="img-fluid"
                  src={require("./../../../../images/Placeholder-images/placeholder-dp.png")}
                  sizes="(max-width: 1080px) 100vw, 1080px"
                  width="1080"
                  height="1080"
                  alt="Doctor Images"
                  loading="eager"
              />
          }
        </div>
        <div className="lc-block mb-3">
          <Link className="pt-3 card-link-style" to="/profile" onClick={event =>{
            if (user?.userId){
            setglobalUserId(user?.userId);
            }
          }}>{user?.userName}</Link>
          <p>
            {user?.userId}
          </p>
        </div>
      </div>
    </div>
  );
};
