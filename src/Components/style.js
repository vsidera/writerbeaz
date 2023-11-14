const styles = {
  boxWidth: "xl:max-w-[1280px] w-full",

  heading2: "font-poppins font-semibold xs:text-[48px] text-[40px] text-black xs:leading-[76.8px] leading-[66.8px] w-full",
  paragraph: "font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]",

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-center items-start",

  paddingX: "sm:px-8 md:px-16 px-6", // Adjusted padding for small screens
  paddingY: "sm:py-8 md:py-16 py-6", // Adjusted padding for small screens
  padding: "sm:px-8 md:px-16 px-6 sm:py-8 md:py-12 py-4", // Adjusted padding for small screens

  marginX: "sm:mx-8 md:mx-16 mx-6", // Adjusted margin for small screens
  marginY: "sm:my-8 md:my-16 my-6", // Adjusted margin for small screens
};

export const layout = {
  section: `flex md:flex-row flex-col ${styles.paddingY}`,
  sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

  sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative ${styles.paddingX}`, // Added paddingX
  sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative ${styles.paddingX}`, // Added paddingX

  sectionInfo: `flex-1 ${styles.flexStart} flex-col ${styles.paddingX}`, // Added paddingX
};

export default styles;
