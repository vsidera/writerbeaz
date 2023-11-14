import React from "react";
import { Image } from "./image";

export const Gallery = (props) => {
  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Team</h2>
          <p>Our Top Writers</p>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`} className="col-sm-6 col-md-4 col-lg-4">
                  <div className="image-container">
                    <Image
                      title={d.title}
                      largeImage={d.largeImage}
                      smallImage={d.smallImage}
                    />
                    <div className="image-overlay">
                      <h3>{d.title}</h3>
                      <h4>5 <span className="rating-star">*****</span> rating</h4>
                      <p>{d.rate}</p>
                    </div>
                  </div>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};
