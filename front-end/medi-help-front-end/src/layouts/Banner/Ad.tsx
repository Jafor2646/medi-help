import image from "./images.jpg";
export const ImageContainer = () => {
  return (
    <div className="container mt-2">
      <div className="row d-flex justify-content-center align-item-left">
        <div className="col-xs-10 col-sm-10 col-md-4 col-lg-10 mb-2">
          <img src={image} alt={"Ad"} className="img-fluid" />
        </div>
      </div>
    </div>
)}