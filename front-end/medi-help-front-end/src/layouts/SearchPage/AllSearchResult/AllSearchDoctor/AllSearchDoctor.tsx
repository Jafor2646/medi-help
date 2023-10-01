import {SearchDoctorProfileCard} from "./SearchDoctorProfileCard";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../../Auth/GlobalContext";

export const AllSearchDoctor = () => {

    const {globalSearchText} = useContext(GlobalContext);
    const [doctorProfileList, setdoctorProfileList] = useState<string[]>([]);
    const commonVerb:string[] = ["a", "an", "the", "I", "you", "your", "his", "hers", "him", "her", "ours", "as", "at", "by", "to", "for", "from", "in", "into", "of", "onto", "and", "or", "but", "unless", "since", "because", "although", "am", "is", "are", "was", "were",]

    useEffect(() => {
        const fetchDoctor = async () => {
            let searchText = globalSearchText.split(' ');
            let finalSearchText = [];
            for (const word in searchText){
                if (!(commonVerb.includes(searchText[word]))){
                    finalSearchText.push(searchText[word]);
                }
            }
            const baseUrl: string = "http://localhost:8080/api";

            let url: string = `${baseUrl}/doctorSpecialitieses?page=0&size=10000`;
            let response = await fetch(url);
            let responseJson = await response.json();
            let responseData = responseJson._embedded.doctorSpecialitieses;


            let tempArr: string[] = [];
            for (const key in responseData){
                if (finalSearchText.includes(responseData[key].speciality)){
                    if (!(tempArr.includes(responseData[key].doctorId))){
                        tempArr.push(responseData[key].doctorId);
                    }
                }
            }
            if (tempArr.length>=6){
                setdoctorProfileList(tempArr);
                return;
            }

            url = `${baseUrl}/blogs?page=0&size=10000`;
            response = await fetch(url);
            responseJson = await response.json();
            responseData = responseJson.content;

            for (const key in responseData){
                let words = responseData[key].blogBody.split(' ');
                for (const w in finalSearchText){
                    if (words.includes(finalSearchText[w])){
                        if (!(tempArr.includes(responseData[key].uploaderId))){
                            tempArr.push(responseData[key].uploaderId);
                        }
                        break;
                    }
                }
            }
            setdoctorProfileList(tempArr);
        };
        fetchDoctor()
    }, []);


    return (
        <div className="container-fluid m-0 p-0 shadow-sm" style={{background: "#4d4d4d", borderRadius: '0.7rem'}}>
            <div className="d-flex ps-2 mt-1 justify-content-between" style={{background: "#282828", height:'56px', borderTopLeftRadius: '0.7rem', borderTopRightRadius: '0.7rem'}}>
                <div className="text-white">
                    <h1>
                        Doctors
                    </h1>
                </div>
            </div>
            <div className="row justify-content-center mt-md-2 ps-2 pe-2 pb-3">
                {/*<SearchDoctorProfileCard/>*/}
                {/*<SearchDoctorProfileCard/>*/}
                {/*<SearchDoctorProfileCard/>*/}
                {/*<SearchDoctorProfileCard/>*/}
                {/*<SearchDoctorProfileCard/>*/}
                {/*<SearchDoctorProfileCard/>*/}
                {doctorProfileList.splice(0,6).map(doctorId =>
                    <SearchDoctorProfileCard doctorId={doctorId}/>
                )}
            </div>

        </div>
    );
};

