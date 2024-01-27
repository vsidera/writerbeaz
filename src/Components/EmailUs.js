import React from 'react';
import './EmailButton.css';
import { FaBeer, FaPaperPlane } from 'react-icons/fa';

const EmailButton = () => {
  const recipientEmail = 'support@writerbeaz.com';

  const handleClick = () => {
    window.location.href = `mailto:${recipientEmail}`;
  };

  return (
    <button className="email-button" onClick={handleClick} >
     Email Us<FaPaperPlane className='icon' />
      
    </button>
  );
};

export default EmailButton;
