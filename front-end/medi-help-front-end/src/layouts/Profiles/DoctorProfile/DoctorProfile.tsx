import { BlogViewerHomepage } from "../../HomePage/HomeHero/BlogViewerHomepage/BlogViewerHomepage";
import { ThreadViewerHomepage } from "../../HomePage/HomeHero/ThreadViewerHomepage/ThreadViewerHomepage";

export const DoctorProfile = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="shadow d-flex justify-content-left m-2">
          <div>
            <img
                className="img-fluid p-3"
                src={require("./../../../images/DoctorOfTheDay-image/DoctorOfTheDay.jpeg")}
                alt="Profile Images"
                loading="lazy"
            />
          </div>

          <div className="p-3">
            <p>
              Name: Shariar Islam Shuvo<br/>
              UserName: Shariarislam1<br/>
              email: shariarshuvo1@gmail.com
            </p>
            <div className="pt-5 pe-3">
            <a type="button" className="btn btn-outline-dark" href="#">
              Following
            </a>
            <a type="button" className="btn btn-outline-dark" href="#">
              Follow
            </a>
            <a type="button" className="btn btn-outline-dark" href="#">
              Follower
            </a>
          </div>
          </div>
        </div>
      </div>

      <BlogViewerHomepage />
    </div>
  );
};

