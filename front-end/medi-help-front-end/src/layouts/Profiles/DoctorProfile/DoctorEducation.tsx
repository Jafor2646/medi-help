import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../Auth/GlobalContext";
import {SingleThreadCardDoctorProfile} from "./SingleThreadCardDoctorProfile";
import {Link} from "react-router-dom";
import {TopicBadge} from "../../utils/TopicBadge";
import {Pagination} from "../../utils/Pagination";
import {SingleDoctorCard} from "../UserProfile/SingleDoctorCard";
import DoctorEducationalQualificationModel from "../../../models/DoctorEducationalQualificationModel";
import {UserContext} from "../../../Auth/UserContext";
import HospitalEquipmentListService from "../../../Service/HospitalEquipmentListService";
import DoctorEducationalQualificationservice from "../../../Service/DoctorEducationalQualificationservice";

export const DoctorEducation= () => {
    const { isAuthorised, current_user_id } = useContext(UserContext);
    const [postOpen, setpostOpen] = useState("false");
    const {globalUserId} = useContext(GlobalContext);
    const [doctorEdList, setdoctorEdList] = useState<DoctorEducationalQualificationModel[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [ThreadsPerPage] = useState(15);
    const [totalAmountOfThreads, setTotalAmountOfThreads] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [newDegree, setnewDegree] = useState("");
    const [newInstitution, setnewInstitution] = useState("");
    const [newPassingYear, setnewPassingYear] = useState<number>(0);



    useEffect(() => {
        const fetchProfile = async () => {
            const baseUrl: string = "http://localhost:8080/api";
            const url: string = `${baseUrl}/doctorEducationalQualifications/search/findAllByDoctorUserId?doctorUserId=${globalUserId}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseJson = await response.json();
            const responseData = responseJson._embedded.doctorEducationalQualifications;
            let tempArr:DoctorEducationalQualificationModel[] = [];
            for (const key in responseData){

                let temp_ed: DoctorEducationalQualificationModel = new DoctorEducationalQualificationModel(responseData[key].doctorUserId, responseData[key].degreeTitle, responseData[key].institution, responseData[key].passingYear);

                tempArr.push(temp_ed);
            }
            setdoctorEdList(tempArr);
        };
        fetchProfile()
    }, [doctorEdList]);

    const indexOfLastBook: number = currentPage * ThreadsPerPage;
    const indexOfFirstBook: number = indexOfLastBook - ThreadsPerPage;
    let lastItem = ThreadsPerPage * currentPage <= totalAmountOfThreads ?
        ThreadsPerPage * currentPage : totalAmountOfThreads;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const CreateTestClicked = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setpostOpen("true");
    };
    const DiscardClicked = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setpostOpen("false");
        setnewDegree("");
        setnewInstitution("");
        setnewPassingYear(0);
    };
    const postClicked = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (newDegree.length>0 && newInstitution.length>0 && newPassingYear>1900){
            let ed = {
                "doctorUserId": current_user_id,
                "degreeTitle": newDegree,
                "institution": newInstitution,
                "passingYear": newPassingYear,
            }
            DoctorEducationalQualificationservice.createEducationalQualification(ed).then();
            setpostOpen("false");
            setnewDegree("");
            setnewInstitution("");
            setnewPassingYear(0);
        }
    };


    return (
        <div  className={"home-thread-bg shadow"}>
            <div className="container-fluid">
                <div className="d-flex justify-content-between">

                    <div className="pt-2">
                        <h4 className="fw-bold">Education</h4>
                    </div>
                    <div className="p-2">
                        {isAuthorised == "false" ? (
                            <Link
                                type="button"
                                className="btn btn-md btn-outline-dark"
                                to="/login"
                            >
                                Sign in
                            </Link>
                        ) : globalUserId === current_user_id ? (
                            postOpen === "true" ? (
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-md btn-outline-danger me-3"
                                        onClick={DiscardClicked}
                                    >
                                        Discard
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-md btn-outline-success"
                                        onClick={postClicked}
                                    >
                                        Add
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    className="btn btn-md btn-outline-dark"
                                    onClick={CreateTestClicked}
                                >
                                    Add New Degree
                                </button>
                            )
                        ) : (
                            <span></span>
                        )}
                    </div>

                </div>
            </div>
            {postOpen === "true" && (
                <div className="card m-2 shadow">
                    <div className="mb-1 ms-1 mt-1 me-1">
                        <input
                            className="form-control shadow fw-bold"
                            id="DegreeTitle"
                            maxLength={100}
                            placeholder="Name of the Degree"
                            onInput={event => {
                                setnewDegree(event.currentTarget.value);
                            }}
                        />
                        <input
                            className="form-control shadow fw-bold mt-1"
                            id="InstitutionTitle"
                            maxLength={200}
                            placeholder="Name of the Institution"
                            onInput={event => {
                                setnewInstitution(event.currentTarget.value);
                            }}
                        />
                        <input
                            className="form-control shadow fw-bold mt-1"
                            id="YearTitle"
                            maxLength={200}
                            placeholder="Passing Year"
                            type="number"
                            onInput={event => {
                                setnewPassingYear(Number(event.currentTarget.value));
                            }}
                        />
                    </div>
                </div>
            )}



            <div>
                {doctorEdList.map(doctor => (
                    <div className='card shadow text-dark m-2  card-hover-style'>
                        <div className='ms-1 fw-bold'>
                        {doctor.degreeTitle}
                        </div>
                        <div className='ms-1'>
                            {doctor.institution} ({doctor.passingYear})
                        </div>
                    </div>
                ))}
            </div>
            {totalPages>1 &&
                <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
            }

        </div>
    );
};
