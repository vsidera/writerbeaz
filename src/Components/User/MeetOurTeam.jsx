import React from "react";
import imgConfetti from "../../assets/images/articles/1.png";
import imgCurrency from "../../assets/images/articles/2.png";
import imgPlane from "../../assets/images/articles/3.png";
import imgConfetti2 from "../../assets/images/articles/tinified (1)/vadim-bogulov-rdHrrFA1KKg-unsplash.jpg";
import imgRestaurant from "../../assets/images/articles/4.png";
import imgCurrency1 from "../../assets/images/articles/5.png";
import imgPlane3 from "../../assets/images/articles/6.png";
import imgRestaurant2 from "../../assets/images/articles/tinified (1)/alex-suprun-1JGHAAdbL_Y-unsplash.jpg";

export default function MeetOurTeam() {
  const ARTICLES = [
    [imgCurrency, "Claire Robinson", "*****", "Client"],
    [imgRestaurant, "Wilson Hutton", " *****", "Writer"],
    [imgPlane, "Wilson Hutton", "***** ", "Client"],
    [imgConfetti, "Claire Robinson", "***** ", "Client"],
    [imgCurrency1, " Claire Robinson", "*****", "Client"],
    [imgRestaurant2, " Wilson Hutton", " ***** ", "Writer"],
    [imgPlane3, "Wilson Hutton", " ***** ", "Client"],
    [imgConfetti2, "Claire Robinson", "***** ", "Client"],
  ];

  return (
    <>
      <div style={{ boxShadow: "0 0 2px inset" }} className="pb-10 pt-10">
        <article >
          <h1 style={{ textAlign: "center", fontWeight: "bold" }} className="text-4xl font-extrabold text-center text-white pb-5" id="team">
            Meet Some of Our Team
          </h1>
          <div
            style={{ padding: "10px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 justify-center"
          >
            {ARTICLES.map((art, i) => (
              <article
                style={{ padding: "5px" }}
                key={i + 325}
                className={`${
                  "scrollAnimation-" + i
                } bg-white transition-transform rounded-lg overflow-hidden cursor-pointer  mx-auto w-56`}
                id="homeArticles"
              >
                <div className="relative">
                  <img
                    style={{ borderRadius: "50%", height: "200px", width: "200px", background: 'black' }}
                    src={art[0]}
                    alt="article"
                    className="object-cover hover:!scale-105"
                  />
                  <div style={{ background: 'rgba(0, 0, 0, 0.5)', borderRadius: '5px', }} className="absolute top-30  left-10 right-14 rounded-md bottom-0 flex flex-col items-center justify-center  bg-gradient-to-b from-white text-center">
                    <p className="text-md text-white">{art[1]}</p>
                    <h3 className="text-white">5<span style={{ color: 'yellow' }}>{art[2]}</span>Rated</h3>
                    <p style={{ color: 'white' }} className="text-md">{art[3]}</p>

                  </div>
                </div>
              </article>
            ))}
          </div>
        </article>
      </div>
    </>
  );
}
