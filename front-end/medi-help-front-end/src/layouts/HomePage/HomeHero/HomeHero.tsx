import { DoctorOfTheDay } from "./DoctorOfTheDay/DoctorOfTheDay"
import {ThreadViewerHomepage} from "./ThreadViewerHomepage/ThreadViewerHomepage";

export const HomeHero = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 my-auto p-5">
                        <div>
                            <ThreadViewerHomepage/>
                        </div>
                    </div>
                    <div className="col-md my-auto p-5" style={{width: '300px', height:'200px'}}>
                        <div>
                            <DoctorOfTheDay/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )}