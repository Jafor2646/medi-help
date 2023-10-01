import {AllSearchDoctor} from "./AllSearchDoctor/AllSearchDoctor";
import {AllSearchHospital} from "./AllSearchHospital/AllSearchHospital";
import {AllSearchThread} from "./AllSearchThread/AllSearchThread";
import {AllSearchBlog} from "./AllSearchBlog/AllSearchBlog";

export const AllSearchResult = () => {
    return (
        <div className="d-flex flex-column pb-2">
            <div>
                <AllSearchDoctor/>
            </div>
            {/*<div>*/}
            {/*    <AllSearchHospital/>*/}
            {/*</div>*/}
            <div>
                <AllSearchThread/>
            </div>
            <div>
                <AllSearchBlog/>
            </div>
        </div>
    );
};

