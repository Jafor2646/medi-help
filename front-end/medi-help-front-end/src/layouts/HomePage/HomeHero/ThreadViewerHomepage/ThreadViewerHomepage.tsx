import {SingleThreadCard} from "./SingleThreadCard";

export const ThreadViewerHomepage = () => {
    return (
        <div className={"home-thread-bg shadow"}>
            <div className="container-fluid">
                <div className={"d-flex"}>
                    <div className="p-2">
                        <select className="form-select form-select-lg" aria-label="Default select example">
                            <option selected>Trending</option>
                            <option value="1">Newest First</option>
                            <option value="2">Oldest First</option>
                            <option value="3">Most Voted</option>
                        </select>
                    </div>
                    <div className="ms-auto p-2">
                        <a type="button" className="btn btn-lg btn-outline-dark" href="#">
                            Post
                        </a>
                    </div>
                </div>
            </div>

            <div className="container d-flex align-items-center ">
                <div className="row">
                    <SingleThreadCard/>
                    <SingleThreadCard/>
                    <SingleThreadCard/>
                    <SingleThreadCard/>
                    <SingleThreadCard/>
                    <SingleThreadCard/>
                    <SingleThreadCard/>
                    <SingleThreadCard/>
                    <SingleThreadCard/>
                </div>
            </div>

        </div>
    )}