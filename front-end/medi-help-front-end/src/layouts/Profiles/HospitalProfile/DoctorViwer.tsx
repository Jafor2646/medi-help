import React, {useEffect, useState} from "react";
import ThreadViewerModel from "../../../models/ThreadViewerModel/ThreadViewerModel";
import {SpinnerLoading} from "../../utils/SpinnerLoading";
import {Pagination} from "../../utils/Pagination";
import UserModel from "../../../models/UserModel";
import {SingleThreadCard} from "../../HomePage/HomeHero/ThreadViewerHomepage/SingleThreadCard";
import {SingleDoctorCard} from "../UserProfile/SingleDoctorCard";

export const DoctorViwer: React.FC<{userId: string}> = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [ThreadsPerPage] = useState(15);
    const [totalAmountOfThreads, setTotalAmountOfThreads] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchUrl, setSearchUrl] = useState(`&sort=threadTrendView,desc`);

    const [users, setusers] = useState<string[]>([]);



    useEffect(() => {
        const fetchThreads = async () => {
            const baseUrl: string = "http://localhost:8080/api";

            let url: string = `${baseUrl}/doctorProfessionalQualifications/search/findAllByCurrentlyWorkingHospitalInfoId?currentlyWorkingHospitalInfoId=${props.userId}&page=${currentPage-1}&size=${ThreadsPerPage}${searchUrl}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.doctorProfessionalQualifications;

            setTotalAmountOfThreads(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

            let tempArray:string[] = []

            for(const key in responseData){
                if (!responseData[key].endingYear){

                    tempArray.push(responseData[key].doctorUserId);
                }
            }
            setusers(tempArray);


            setIsLoading(false);
        };
        fetchThreads().catch((error: any) => {
            setHttpError(error.message);
        })
        // window.scrollTo(0, 0);
    }, [currentPage, searchUrl, users]);

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

    const indexOfLastBook: number = currentPage * ThreadsPerPage;
    const indexOfFirstBook: number = indexOfLastBook - ThreadsPerPage;
    let lastItem = ThreadsPerPage * currentPage <= totalAmountOfThreads ?
        ThreadsPerPage * currentPage : totalAmountOfThreads;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


    return (
        <div className={"home-thread-bg shadow"}>
            <div className="container-fluid">
                <div className="d-flex justify-content-between">

                    <div className="pt-2">
                        <h4 className="fw-bold">Doctors</h4>
                    </div>

                </div>
            </div>

            <div>
                {users.map(doctor => (
                    <div className="card-link-style">
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
