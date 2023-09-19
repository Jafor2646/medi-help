import { DoctorOfTheDay } from "./DoctorOfTheDay/DoctorOfTheDay";
import { ThreadViewerHomepage } from "./ThreadViewerHomepage/ThreadViewerHomepage";
import { BlogViewerHomepage } from "./BlogViewerHomepage/BlogViewerHomepage";

export const HomeHero = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 p-3">
            <ThreadViewerHomepage />
          </div>
          <div className="col-lg-5 p-3">
            <BlogViewerHomepage />
          </div>
          <div className="col-lg p-3">
            <DoctorOfTheDay />
          </div>
        </div>
      </div>
    </div>
  );
};
