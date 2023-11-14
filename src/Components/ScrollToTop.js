import React, { useState } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';
import './ScrollToTopButton.css';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', handleScroll);

  return (
    <>
      {isVisible &&
        <button className="scroll-to-top-button" onClick={handleClick}>
          <MdKeyboardArrowUp />
        </button>
      }
    </>
  );
};

export default ScrollToTopButton;
