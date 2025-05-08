import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; 
import "../styles/css.css";

// Import images
import slide1 from "./images/Snapchat-1292181574.jpg";
import slide2 from "./images/flat,1000x1000,075,f.jpg";
import slide3 from "./images/indian-young-female-doctor.jpg";
import slide4 from "./images/th.jpg";
import slide5 from "./images/OIP (1).jpg";
import slide6 from "./images/OIP (2).jpg";
import slide7 from "./images/OIP (3).jpg";
import slide8 from "./images/OIP.jpg";
import slide9 from "./images/R.jpg";

const SlideShow = () => {
  return (
    <div className="carousel-container">
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={slide1} className="d-block carousel-img" alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img src={slide2} className="d-block carousel-img" alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img src={slide3} className="d-block carousel-img" alt="Slide 3" />
          </div>
          <div className="carousel-item">
            <img src={slide4} className="d-block carousel-img" alt="Slide 4" />
          </div>
          <div className="carousel-item">
            <img src={slide5} className="d-block carousel-img" alt="Slide 5" />
          </div>
          <div className="carousel-item">
            <img src={slide6} className="d-block carousel-img" alt="Slide 6" />
          </div>
          <div className="carousel-item">
            <img src={slide7} className="d-block carousel-img" alt="Slide 7" />
          </div>
          <div className="carousel-item">
            <img src={slide8} className="d-block carousel-img" alt="Slide 8" />
          </div>
          <div className="carousel-item">
            <img src={slide9} className="d-block carousel-img" alt="Slide 9" />
          </div>
        </div>

        {/* Navigation Buttons */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
};

export default SlideShow;
