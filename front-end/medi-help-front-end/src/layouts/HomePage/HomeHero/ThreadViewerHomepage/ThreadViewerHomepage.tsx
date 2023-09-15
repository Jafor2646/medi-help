export const ThreadViewerHomepage = () => {
    return (
        <div className={"bg-dark"}>
            <div className="container-fluid">
                <div className={"d-flex mb-3"}>
                    <div className="p-2">
                        <select className="form-select form-select-lg" aria-label="Default select example">
                            <option selected>Trending</option>
                            <option value="1">Newest First</option>
                            <option value="2">Oldest First</option>
                            <option value="3">Most Voted</option>
                        </select>
                    </div>
                    <div className="ms-auto py-2">
                        <a type="button" className="btn btn-lg btn-outline-light" href="#">
                            Post
                        </a>
                    </div>
                </div>
            </div>

        </div>
    )}