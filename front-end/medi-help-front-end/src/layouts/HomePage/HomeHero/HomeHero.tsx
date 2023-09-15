import { DoctorOfTheDay } from "./DoctorOfTheDay/DoctorOfTheDay"
import { ThreadViewerHomepage } from "./ThreadViewerHomepage/ThreadViewerHomepage";

export const HomeHero = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 my-auto p-5">
                        <div>
                            <ThreadViewerHomepage />
                        </div>
                    </div>
                    <div className="col-md p-5">
                        <DoctorOfTheDay />
                    </div>   
                </div>
            </div>
        </div>
    )
}