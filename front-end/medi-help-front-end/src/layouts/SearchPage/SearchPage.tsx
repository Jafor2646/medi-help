import {AllSearchResult} from "./AllSearchResult/AllSearchResult";

export const SearchPage = () => {
    return (
        <div className={"home-thread-bg shadow m-2"}>
            {/*<div className="ps-2 pe-2 pt-2">*/}
            {/*    <select*/}
            {/*        className="form-select form-select-md form-select-lg bg-dark text-white shadow"*/}
            {/*        aria-label="Default select example"*/}
            {/*    >*/}
            {/*        <option selected>All</option>*/}
            {/*        <option value="1">Doctors</option>*/}
            {/*        <option value="2">Hospitals</option>*/}
            {/*        <option value="3">Threads</option>*/}
            {/*        <option value="3">Vlogs</option>*/}
            {/*    </select>*/}
            {/*</div>*/}
            <div className="ps-2 pe-2 pt-2">
                <AllSearchResult/>
            </div>
        </div>
    );
};

