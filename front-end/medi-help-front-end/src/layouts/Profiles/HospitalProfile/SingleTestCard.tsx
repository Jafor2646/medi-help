import React, {useContext, useEffect, useState} from "react";
import UserModel from "../../../models/UserModel";
import {GlobalContext} from "../../../Auth/GlobalContext";
import {useHistory} from "react-router-dom";
import HospitalExtraInfoModel from "../../../models/HospitalExtraInfoModel";
import HospitalEquipmentListModel from "../../../models/HospitalEquipmentListModel";

export const SingleTestCard: React.FC<{hospitalEquipment: HospitalEquipmentListModel}>= (props) => {

    // const [user, setUser] = useState<UserModel>();
    // const {setglobalUserId} = useContext(GlobalContext);
    //
    // const history = useHistory();
    //
    //
    // useEffect(() => {
    //     const fetchProfile = async () => {
    //         const baseUrl: string = "http://localhost:8080/api";
    //         const url: string = `${baseUrl}/users/search/findUserByUserId?userId=${props.doctorId}`;
    //         const response = await fetch(url);
    //
    //         if (!response.ok) {
    //             throw new Error('Something went wrong!');
    //         }
    //         const responseJson = await response.json();
    //         const responseData = responseJson._embedded.users[0];
    //         let tempUser: UserModel = {
    //             userId: responseData.userId,
    //             userName: responseData.userName,
    //             email: responseData.email,
    //             password: responseData.password,
    //             address: responseData.address,
    //             phone: responseData.phone,
    //             userType: responseData.userType,
    //             picture: responseData.picture
    //         };
    //         setUser(tempUser);
    //     };
    //     fetchProfile()
    // }, []);
    //
    // const DoctorNameClicked = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    //     setglobalUserId(props.doctorId);
    //     history.push('/profile');
    // }


    return (
        <div className='card shadow text-dark m-2  card-hover-style'>
            {props.hospitalEquipment!=undefined&&
                <div className='m-2'>
                    <div className="fs-4">
                        {props.hospitalEquipment.equipmentName}
                    </div>
                    <div>
                        {props.hospitalEquipment.quantity} Taka
                    </div>
                </div>
            }

        </div>
    );
};
