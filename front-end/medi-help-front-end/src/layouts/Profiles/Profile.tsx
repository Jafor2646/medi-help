import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../Auth/UserContext";
import {GlobalContext} from "../../Auth/GlobalContext";
import {UserProfile} from "./UserProfile/UserProfile";
import {DoctorProfile} from "./DoctorProfile/DoctorProfile";
import {HospitalProfile} from "./HospitalProfile/HospitalProfile";
import {useHistory} from "react-router-dom";

export const Profile = () => {
    const history = useHistory();

    const {globalUserId} = useContext(GlobalContext);
    const [globalUserType, setglobalUserType] = useState<string>("");

    const {current_user_id, current_user_type} = useContext(UserContext);

    const [httpError, setHttpError] = useState(null);


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

    if(globalUserType == "General_User"){
        history.push('/General-Profile');
    }
    else if(globalUserType == "Doctor"){
        history.push('/Doctor-Profile');
    }
    else if(globalUserType == "Hospital"){
        history.push('/Hospital-Profile');
    }
    else if(globalUserType == "admin"){
        history.push('/admin-Profile');
    }




    return (
        <div>

        </div>
    );
};

