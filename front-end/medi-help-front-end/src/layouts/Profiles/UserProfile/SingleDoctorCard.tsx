import React, {useEffect, useState} from "react";
import UserModel from "../../../models/UserModel";

export const SingleDoctorCard: React.FC<{doctorId: string}>= (props) => {

    const [user, setUser] = useState<UserModel>();


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


    return (
        <div className='card shadow text-dark mt-1 m-2  card-hover-style'>
            {user!=undefined&&
                user.picture?
                <img className="single-doctor-card" src={user.picture} alt="User Picture" height='100' width='100'/>
                :
                <img className="single-doctor-card" src={require('./../../../images/Placeholder-images/placeholder-dp.png')} alt="User Picture" height='100' width='100'/>
            }

        </div>
    );
};
