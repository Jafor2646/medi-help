import image from "./../../images/Banner-images/current-banner.jpg";
export const ImageContainer = () => {
  return (
    <div className="container mt-1">
      <div className="d-flex justify-content-left">
          <img src={image} alt={"Banner"} height="100" width={"1000"} />
      </div>
    </div>
)}