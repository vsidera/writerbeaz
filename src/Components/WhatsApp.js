import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsApp.css'

const WhatsAppButton = () => {
  const handleButtonClick = () => {
    // Replace the phone number and message with your own information
    const phoneNumber = '+1 (914) 201-4858';
    const message = 'Hello, writerbeaz admin, I need ypur help.';
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <button className="whatsapp-button" onClick={handleButtonClick}>
      <FaWhatsapp />
    </button>
  );
};

export default WhatsAppButton;