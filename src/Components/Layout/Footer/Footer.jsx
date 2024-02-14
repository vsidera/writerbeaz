import React from "react";
import './footer.css';
import  fb from './assets/icons8-facebook.svg';
import twitter from './assets/icons8-twitter.svg';
import insta from './assets/icons8-youtube.svg';
import linkedin from './assets/icons8-instagram.svg';
import logoheader from './assets/logonobg.png'
import { FaBookOpen, FaComments, FaConnectdevelop, FaHome, FaQuestion, FaRoad, FaServer, FaTeamspeak, FaUnlock, FaUser } from "react-icons/fa";



const  Footer=()=>{
    return(
        <div className="footer">
            <div className="sb_footer section_padding">
            <div className="sb_footer-links">
                 <div className="sb_footer-links_div">
                    
                    <div className="socialmedia">
                        {/*<p><img src = {fb} alt="" /></p>
                        //<p><img src = {twitter} alt=""/></p>
                        <p><img src = {linkedin} alt=""/></p>
    <p><img src = {insta} alt=""/></p>*/}

                    </div>
                    </div>
                
                <div className="sb_footer-links_div">
                     <h4> Resources </h4>
                     <a href="#features">
                        <p>Resource center{''} <FaRoad className="icons" />
</p>
                    </a>
                    <a href="#testimonials">
                        <p>Testimonials {''}<FaComments className="icons"/>
 </p>

                    </a>
                    <a href="/">
                        <p>Go to Home {''}<FaHome className="icons"/>
</p>
                     </a>
                 
                </div>
                <div className="sb_footer-links_div">
                    <h4>Account</h4>
                    <a href="/login">
                        <p>Login{''}<FaUser className="icons"/> </p>
                    </a>
                    <a href="/signup">
                        <p>Sign up {''}<FaUnlock className="icons"/>
</p>
                    </a>
                    <a href="/login">
                        <p>Help Center {''}<FaQuestion className="icons"/> </p>

                    </a>

                </div>
                <div  className="sb_footer-links_div">

                <h4>Company</h4>
                <a  href="#about">
                <p>About {''}<FaConnectdevelop  className="icons"/>
</p>
                </a>
                <a  href="#services">
                <p>Services{''} <FaServer className="icons"/>
</p>
</a>
                {/* Updated section to link to T&Cs */}
                <a href="https://terms-of-use.writerbeaz.com/" rel="noopener noreferrer">
                    <p>T&Cs {''}<FaTeamspeak className="icons" /></p>
                </a>
               
                </div>
                
                <div className="sb_footer-links_div">
                    <h4>WriterBeaz</h4>
                    <div style={{backgroundColor:'black', borderRadius:'0px', marginLeft:'0px', padding:'0px'}} className="text-xl md:text-3xl">
                        <a style={{display:'flex'}} href="/" >
                           {/* <img src={logoheader} alt='logo' style={{ height: '115px', width: 'auto', position:'absolute', transform: 'rotate(90deg)', marginLeft:'18px', marginTop:'-30px' }}/> */}
                        <h1  className="header-logo" style={{fontSize:'36px',padding:'0px', marginLeft:'0px'}} >Writer<br></br>Beaz<FaBookOpen /> </h1></a>                        
                    </div>
                </div>

             
                <hr></hr>
               
                <div className="sb_footer-below-links">
                    <a href="/terms">
                        <div>
                            <p>@{new Date().getFullYear()}</p>
                        </div>
                    </a>
                    <a href="/terms">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <p>Writerbeaz.com </p>
                    </div>
                    <div>
                        <p>Email: support@writerbeaz.com </p>
                    </div>
                    <div>
                        <p>Whatsapp: +1 (914) 201-4858 </p>
                    </div>
                    </div>
                    </a>
                    
                </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;