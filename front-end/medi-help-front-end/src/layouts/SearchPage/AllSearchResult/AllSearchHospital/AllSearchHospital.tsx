import {SearchHospitalProfileCard} from "./SearchHospitalProfileCard";

export const AllSearchHospital = () => {
    return (
        <div className="container-fluid m-0 p-0 shadow-sm" style={{background: "#535750", borderRadius: '0.7rem'}}>
            <div className="d-flex ps-2 mt-1 justify-content-between" style={{background: "#353621", height:'56px', borderTopLeftRadius: '0.7rem', borderTopRightRadius: '0.7rem'}}>
                <div className="text-white">
                    <h1>
                        Hospitals
                    </h1>
                </div>
                <div>
                    <a type="button" className="btn btn-lg mt-1 me-2 btn-outline-light" href="#">
                        See More
                    </a>
                </div>
            </div>
            <div className="row justify-content-center mt-md-2 ps-2 pe-2 pb-3">
                <SearchHospitalProfileCard/>
                <SearchHospitalProfileCard/>
                <SearchHospitalProfileCard/>
                <SearchHospitalProfileCard/>
                <SearchHospitalProfileCard/>
                <SearchHospitalProfileCard/>
            </div>

        </div>
    );
};

