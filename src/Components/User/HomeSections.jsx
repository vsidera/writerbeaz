import React from "react";
import iconOnline from "../../assets/icons/home-sections/letter.png";
import iconBudgeting from "../../assets/icons/home-sections/global-connection.png";
import iconOnboarding from "../../assets/icons/home-sections/help-desk.png";
import iconApi from "../../assets/icons/home-sections/secure-payment.png";

const SECTIONS = [
  [iconOnline, "Essay Writing", "Expert writers in various fields deliver tailored essays."],
  [iconBudgeting, "Global Tutors", "Our diverse tutors worldwide meet global platform demands."],
  [iconOnboarding, "Constant Support", "24/7 support with rapid response times. Reach out anytime."],
  [iconApi, "Easy Payment", "Streamlined, straightforward, and fast payment system."],
];

export default function HomeSections() {
  return (
    <>
      <div  id="services" style={{ height: "100%" }}>
        <article className="py-6 px-9 xl:px-[20px] my-14 mx-auto max-w-6xl">
          <h1 className="text-subtitle text-4xl font-bold text-center mb-8 scroll-animation -word-5 " id="title">Our Services</h1>
          <div  className="flex flex-col sm:flex-row text-center sm:text-left gap-3 mt-[54px] flex-wrap justify-center xl:justify-between items-center">
            {SECTIONS.map((sec, i) => (
              <section style={{ boxShadow:'0 0 3px lightgray', padding:'10px', cursor:'pointer'}} key={i + 120} className={`section-${i} bg-white rounded-lg section max-w-[22rem] lg:max-w-[16rem] px-3 py-8 sm:p-0 text-center`}>
                <img style={{ width: '100px', height: '100px', }} src={sec[0]} alt="" className="mx-auto mb-4" />
                <div className="p-4">
                  <h3 className="text-2xl mb-4 sm:mb-0 py-2">{sec[1]}</h3>
                  <p>{sec[2]}</p>
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </>
  );
}
