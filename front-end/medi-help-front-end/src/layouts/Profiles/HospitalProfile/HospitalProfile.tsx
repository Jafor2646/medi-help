import { ThreadViewerHomepage } from "../../HomePage/HomeHero/ThreadViewerHomepage/ThreadViewerHomepage";

export const HospitalProfile = () => {
    return (
        <div>
            <div className="hospital-profile-info shadow m-2">
                <div className="hospital-cover-image"></div>
                <div className="pt-3 ps-3 pb-1">
                    <p>
                        Name: Pushpita Clinic<br/>
                        UserName: pspc1<br/>
                        email: pspc1@email.com
                    </p>
                </div>
            </div>

            <div className="m-2 shadow">
                <div className='d-none d-lg-block'>
                    <div className='row g-0 mt-5'>
                        <div className='col-sm-6 col-md-6'>
                            <div className='hospital-hero-first-image'></div>
                        </div>
                        <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
                            <div className='ml-2'>
                                <h1>Find Doctor</h1>
                                <p className='lead'>
                                    We have best Doctor
                                </p>
                                <a className='btn bg-dark text-white btn-lg' href='#'>View Doctors</a>
                            </div>
                        </div>
                    </div>
                    <div className='row g-0'>
                        <div className='col-4 col-md-4 container d-flex
                        justify-content-center align-items-center'>
                            <div className='ml-2'>
                                <h1>Find Tests</h1>
                                <p className='lead'>
                                    We have best test
                                </p>
                                <a className='btn bg-dark text-white btn-lg' href='#'>View Tests</a>
                            </div>
                        </div>
                        <div className='col-sm-6 col-md-6'>
                            <div className='hospital-hero-second-image'></div>
                        </div>
                    </div>
                </div>

                {/* Mobile Heros */}
                <div className='d-lg-none'>
                    <div className='container'>
                        <div className='m-2'>
                            <div className='hospital-hero-first-image'></div>
                            <div className='mt-2'>
                                <h1>Find Doctor</h1>
                                <p className='lead'>
                                    We have best Doctor
                                </p>
                                <a className='btn bg-dark text-white btn-lg' href='#'>View Doctors</a>
                            </div>
                        </div>
                        <div className='m-2'>
                            <div className='hospital-hero-second-image'></div>
                            <div className='mt-2'>
                                <h1>Find Tests</h1>
                                <p className='lead'>
                                    We have best test
                                </p>
                                <a className='btn bg-dark text-white btn-lg' href='#'>View Tests</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

