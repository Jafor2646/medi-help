import { ThreadViewerHomepage } from "../../HomePage/HomeHero/ThreadViewerHomepage/ThreadViewerHomepage";

export const UserProfile = () => {
  return (
    <div>
      <div className="card-body">
        <div className="card shadow d-flex flex-row mb-2">
          <img
            className="img-fluid p-5"
            src={require("./../../../images/DoctorOfTheDay-image/DoctorOfTheDay.jpeg")}
            sizes="(max-width: 1080px) 100vw, 1080px"
            width="500"
            height="100"
            alt="Profile Images"
            loading="lazy"
          />
          <div className="card-body">
            <div className="lc-block p-3">
              <h5 className="m-2">Name: Shariar Islam Shuvo</h5>
              <h5 className="m-2">UserName: Shariarislam1</h5>
              <h5 className="m-2">email: shariarshuvo1@gmail.com</h5>
            </div>
          </div>
        </div>
      </div>

      <ThreadViewerHomepage />
    </div>
  );
};

