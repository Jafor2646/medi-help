import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../Auth/GlobalContext";
import {SingleThreadCardDoctorProfile} from "./SingleThreadCardDoctorProfile";
import {Link} from "react-router-dom";
import {TopicBadge} from "../../utils/TopicBadge";
import {Pagination} from "../../utils/Pagination";
import {SingleDoctorCard} from "../UserProfile/SingleDoctorCard";

export const FollowingListDoctor= () => {
    const {globalUserId} = useContext(GlobalContext);
    const [doctorList, setdoctorList] = useState<string[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [ThreadsPerPage] = useState(15);
    const [totalAmountOfThreads, setTotalAmountOfThreads] = useState(0);
    const [totalPages, setTotalPages] = useState(0);



    useEffect(() => {
        const fetchProfile = async () => {
            const baseUrl: string = "http://localhost:8080/api";
            const url: string = `${baseUrl}/followingTables/search/findAllByFollowingId?followingId=${globalUserId}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseJson = await response.json();
            const responseData = responseJson._embedded.followingTables;
            let tempArr:string[] = [];
            for (const key in responseData){
                tempArr.push(responseData[key].followerId);
            }
            setdoctorList(tempArr);
        };
        fetchProfile()
    }, []);

    const indexOfLastBook: number = currentPage * ThreadsPerPage;
    const indexOfFirstBook: number = indexOfLastBook - ThreadsPerPage;
    let lastItem = ThreadsPerPage * currentPage <= totalAmountOfThreads ?
        ThreadsPerPage * currentPage : totalAmountOfThreads;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


    return (
        <div  className={"home-thread-bg shadow"}>
            <div className="container-fluid">
                <div className="d-flex justify-content-between">

                    <div className="pt-2">
                        <h4 className="fw-bold">Following</h4>
                    </div>

                </div>
            </div>



            <div>
                {doctorList.map(doctor => (
                    <div>
                        <SingleDoctorCard doctorId={doctor}/>
                    </div>
                ))}
            </div>
            {totalPages>1 &&
                <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
            }

        </div>
    );
};
