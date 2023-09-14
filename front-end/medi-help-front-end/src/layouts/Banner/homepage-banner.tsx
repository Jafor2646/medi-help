import image from "./../../images/Banner-images/current-banner.jpg";
export const ImageContainer = () => {
  return (
    <div className="container mt-1">
      <div className="d-flex justify-content-center">
          <img src={image} alt={"Banner"} height="100" />
      </div>
    </div>
)}