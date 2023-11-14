import React from "react";
import imgConfetti from "../../assets/images/articles/Ecommerce web page-cuate.svg";
import imgCurrency from "../../assets/images/articles/Job hunt-cuate.svg";
import imgPlane from "../../assets/images/articles/Learning languages-cuate.svg";
import imgRestaurant from "../../assets/images/articles/Team work-cuate.svg";

export default function HomeArticles() {
 const ARTICLES = [
  [
    imgCurrency,
    "By Freelance Expert",
    "Get Paid in Multiple Currencies",
    "As a freelancer, receiving money in any currency is crucial. With our platform, you can easily manage payments with no extra fees.",
  ],
  [
    imgRestaurant,
    "By Financial Freedom",
    "Budgeting Tips for Freelancers",
    "Worried about managing finances as a freelancer? Learn effective budgeting strategies to treat yourself without financial stress.",
  ],
  [
    imgPlane,
    "By Work and Travel",
    "Freelancing on the Go",
    "Take your freelance career anywhere! Our platform ensures you can use your Easybank card with no fees, even when working abroad.",
  ],
  [
    imgConfetti,
    "By Freelance Community",
    "Join Our Exclusive Beta Community",
    "Exciting news! Our invite-only Beta accounts are now live. Request an invite through the site and become part of our thriving freelance community.",
  ],
];


  return (
    <>
      <div style={{ boxShadow: '0 0 2px inset' }}>
        <article className="px-9 xl:px-[20px] pt-2 pb-5 mx-auto max-w-6xl text-center">
          <h1 className="text-4xl font-extrabold text-center text-white pb-5 mt-10" id="blog">
            Latest Articles
          </h1>
          <div style={{ padding: '10px' }} className="flex flex-col sm:flex-row gap-6 sm:gap-4 flex-wrap justify-center">
            {ARTICLES.map((art, i) => (
              <article 
                key={i + 325}
                className={`${"scrollAnimation-" + i} bg-white transition-transform rounded-lg overflow-hidden cursor-pointer hover:!scale-105 mx-auto min-w-[14rem] max-w-[22rem] sm:max-w-[17rem] md:max-w-[20rem] lg:max-w-[16rem]`}
                id="homeArticles"
              >
                <img style={{ boxShadow: '0 0 2px inset', padding:'1px' }} src={art[0]} alt="article" className="h-[52%] w-full object-cover" />
                <div style={{ borderLeft: '1px solid gray' }} className="px-4 py-6">
                  <p className="text-[13px] opacity-75">{art[1]}</p>
                  <h3 className="py-1 leading-5">{art[2]}</h3>
                  <p className="text-sm opacity-75">{art[3]}</p>
                  <hr></hr>
                </div>
              </article>
            ))}
          </div>
        </article>
      </div>
    </>
  );
}
