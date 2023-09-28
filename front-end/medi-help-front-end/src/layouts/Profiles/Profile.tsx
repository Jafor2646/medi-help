import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../Auth/UserContext";
import {GlobalContext} from "../../Auth/GlobalContext";
import {UserProfile} from "./UserProfile/UserProfile";
import {DoctorProfile} from "./DoctorProfile/DoctorProfile";
import {HospitalProfile} from "./HospitalProfile/HospitalProfile";

export const Profile = () => {

    const {globalUserId} = useContext(GlobalContext);
    const [globalUserType, setglobalUserType] = useState<string>("");

    const {current_user_id, current_user_type} = useContext(UserContext);

    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchThreads = async () => {
            const baseUrl: string = "http://localhost:8080/api";


            const resp = await fetch(`${baseUrl}/users/search/findUserByUserId?userId=${globalUserId}`);
            const respJson = await resp.json();
            const respData = respJson._embedded.users[0];

            setglobalUserType(respData.userType);
        };
        fetchThreads().catch((error: any) => {
            setHttpError(error.message);
        })
    }, []);


    return (
        <div>
            {globalUserType!=""&&
                globalUserType == "General_User"?
                    <UserProfile/>
                :
                globalUserType == "Doctor"?
                    <DoctorProfile/>
                    :
                    globalUserType == "Hospital"?
                        <HospitalProfile/>
                        :
                        <span>Admin Profile</span>
            }
        </div>
    );
};

