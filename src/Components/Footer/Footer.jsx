import React from 'react'
import { Link } from 'react-router-dom';
import "./footer.css"

function Footer() {
  return (
    <div>
      <footer>
        <div className="footer-container">
          <div className="logo">
            <Link to="/">
              <img src="/Webp Images/White Logo.webp" alt="Logo" />
            </Link>
          </div>
          <div className="links">
            <div className="top">
              <ul>
                <li><Link to="/">Asosiy</Link></li>
                <li><Link to="/about">Biz haqimizda</Link></li>
                <li><Link to="/services">Xizmatlar</Link></li>
                <li><Link to="/news">Yangiliklar</Link></li>
                <li><Link to="/contact">Aloqa</Link></li>
              </ul>
            </div>
            <div className="bottom">
              <a href="https://www.facebook.com/andmiedu?__tn__=-UC*F" target="_blank" rel="noreferrer">
                <img src="/Webp Images/FacebookWhite.webp" alt="Facebook" />
              </a>
              <a href="/" target="_blank" rel="noreferrer">
                <img src="/Webp Images/TwitterWhite.webp" alt="Twitter" />
              </a>
              <a href="/" target="_blank" rel="noreferrer">
                <img src="/Webp Images/InstagramWhite.webp" alt="Instagram" />
              </a>
              <a href="https://t.me/Andmiedu1" target="_blank" rel="noreferrer">
                <img src="/Webp Images/TelegramWhite.webp" alt="Telegram" />
              </a>
              <a href="https://www.youtube.com/@andmieduuz" target="_blank" rel="noreferrer">
                <img src="/Images/Rasmlar/YouTubeWhite.png" alt="YouTube" />
              </a>
            </div>
          </div>
          <div className="contactInfos">
            <div className="rows">
              <img src="/Images/location.png" alt="Location" />
              <p>Andijon Shahar, Boburshoh ko'chasi 56</p>
            </div>
            <div className="rows">
              <img src="/Images/world-wide-web.png" alt="Website" />
              <p>info@andmiedu.uz</p>
            </div>
            <div className="rows">
              <img src="/Images/world-wide-web.png" alt="Website" />
              <p>support@andmiedu.uz</p>
            </div>
            <div className="rows">
              <img src="/Images/telephone.png" alt="Telephone" />
              <p>+998 90 529 2408</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer;
