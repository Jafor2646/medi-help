import { ThreadViewerHomepage } from "../../HomePage/HomeHero/ThreadViewerHomepage/ThreadViewerHomepage";

export const UserProfile = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="shadow d-flex justify-content-between m-2">
          <div>
            <img
                className="img-fluid p-1"
                src={require("./../../../images/DoctorOfTheDay-image/DoctorOfTheDay.jpeg")}
                alt="Profile Images"
                loading="lazy"
            />
          </div>

          <div className="pt-3">
            <p>
              Name: Shariar Islam Shuvo<br/>
              UserName: Shariarislam1<br/>
              email: shariarshuvo1@gmail.com
            </p>
          </div>
          <div className="pt-5 pe-3">
            <a type="button" className="btn btn-outline-dark" href="#">
              Following
            </a>
          </div>
        </div>
      </div>

      <ThreadViewerHomepage />
    </div>
  );
};

