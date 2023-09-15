import { DoctorOfTheDay } from "./DoctorOfTheDay/DoctorOfTheDay"

export const HomeHero = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 my-auto p-5">
                        <div>
                            Here goes Thread Container
                        </div>
                    </div>
                    <div className="col-md my-auto p-5" style={{width: '300px', height:'200px'}}>
                        <div className="row-md-5">
                            <DoctorOfTheDay/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )}