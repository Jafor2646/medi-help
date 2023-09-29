import React, {useContext, useEffect, useState} from "react";
import UserModel from "../../../models/UserModel";
import {GlobalContext} from "../../../Auth/GlobalContext";
import {useHistory} from "react-router-dom";

export const SingleDoctorCard: React.FC<{doctorId: string}>= (props) => {

    const [user, setUser] = useState<UserModel>();
    const {setglobalUserId} = useContext(GlobalContext);

    const history = useHistory();


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
        fetchProfile()
    }, []);

    const DoctorNameClicked = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        setglobalUserId(props.doctorId);
        history.push('/profile');
    }


    return (
        <div className='card shadow text-dark m-2  card-hover-style'>
            {user!=undefined&&
                <div>
                    {user.picture ?
                        <img className="single-doctor-card" src={user.picture} alt="User Picture" height='60'
                             width='60'/>
                        :
                        <img className="single-doctor-card"
                             src={require('./../../../images/Placeholder-images/placeholder-dp.png')} alt="User Picture"
                             height='60' width='60'/>}
                    <a href="#" className='m-1 fs-3 username-mini-viewer fw-bold' onClick={DoctorNameClicked}>
                        {user.userName}
                    </a>
                </div>
            }

        </div>
    );
};
