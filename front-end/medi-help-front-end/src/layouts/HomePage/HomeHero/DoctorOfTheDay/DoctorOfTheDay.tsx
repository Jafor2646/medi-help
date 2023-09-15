export const DoctorOfTheDay = () => {
  return (
    <div className="card shadow home-doctor-of-the-day-bg mx-auto">
      <div className="card-body">
        <h4 className="p-4 text-white bg-primary fw-bold fs-5">
          DOCTOR OF THE DAY!!!!
        </h4>
        <div className="lc-block">
          <img
            className="img-fluid"
            src={require("./../../../../images/DoctorOfTheDay-image/DoctorOfTheDay.jpeg")}
            sizes="(max-width: 1080px) 100vw, 1080px"
            width="1080"
            height="1080"
            alt="Doctor Images"
            loading="lazy"
          />
        </div>
        <div className="lc-block mb-3">
          <h5 className="pt-3">Doctor Pushpita Amin</h5>
          <p>
            She is a specialist in Psychology. People from all over the country
            come to popular diagnosis center, Dhanmondi, to visit her.
          </p>
        </div>
      </div>
    </div>
  );
};
