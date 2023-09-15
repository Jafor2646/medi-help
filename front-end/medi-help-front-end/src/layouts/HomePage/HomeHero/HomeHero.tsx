import {ThreadViewerHomepage} from "./ThreadViewerHomepage/ThreadViewerHomepage";

export const HomeHero = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-9 my-auto p-5">
                        <div>
                            <ThreadViewerHomepage/>
                        </div>
                    </div>
                    <div className="col-sm my-auto p-5">
                        <div>
                            Here goes Doctor Of The Day Container
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )}