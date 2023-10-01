import React, {useContext, useEffect, useState} from "react";
import ThreadViewerModel from "../../../../models/ThreadViewerModel/ThreadViewerModel";
import UserModel from "../../../../models/UserModel";
import {GlobalContext} from "../../../../Auth/GlobalContext";
import {Link} from "react-router-dom";

export const SearchDoctorProfileCard: React.FC<{doctorId: string}> = (props) => {

    const [user, setUser] = useState<UserModel>();
    const {setglobalUserId} = useContext(GlobalContext);

    useEffect(() => {
        const fetchProfile = async () => {
            const baseUrl: string = "http://localhost:8080/api";
            const url: string = `${baseUrl}/users/search/findUserByUserId?userId=${props.doctorId}`;
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
        };
        fetchProfile().catch((error: any) => {
        })
    }, []);



    return (
        <div className="col-lg-2 mt-2">
            <div className="card shadow bg-white text-dark">
                {user?.picture?
                    <img
                        className="card-img-top"
                        src={user?.picture}
                        alt="Doctor Profile"
                        height="190"
                        loading="eager"
                    />
                    :
                    <img
                        className="card-img-top"
                        src={require("./../../../../images/Placeholder-images/placeholder-dp.png")}
                        alt="Doctor Profile"
                        height="190"
                        loading="eager"
                    />
                }
                <div className="card-body text-center">
                    <h5 className="card-title">{user?.userName}</h5>
                    <Link to="/profile" className="stretched-link" onClick={event => {
                        if (user?.userId){
                            setglobalUserId(user?.userId);
                        }
                    }}></Link>
                </div>
            </div>
        </div>
    );
};

