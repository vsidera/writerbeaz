import React from 'react';

function Footer() {
  return (
    <div className="bg-black py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl md:text-3xl mx-5">
          <a href="/">
              <span className="logo-letter font-bold text-white">w</span>
              <lord-icon
                  src="https://cdn.lordicon.com/dycatgju.json"
                  trigger="loop"
                  delay="2000"
                  colors="primary:#ffffff"
                  style={{width: "25px", height: "25px", paddingTop: "4px"}}
              >
              </lord-icon>
              <span className="logo-letter font-bold text-white">rkX</span>
          </a>
        </div>
        <div className="text-white text-sm">
          <p>&copy; {new Date().getFullYear()} workX. All rights reserved.</p>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
