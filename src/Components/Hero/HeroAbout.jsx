import React from 'react'
import './hero.css'
import BBB from '../BizBilanBog\'laning/BBB'
function HeroAbout() {
  return (
    <section className="hero">
        <div className="container1">
            <div className='left'>
              <h1><span>Platforma</span> bilan yaqindan tanishing!</h1>
              <p>Ushbu platforma foydalanuvchilar uchun eng yaxshi xizmatlarni taqdim etadi, platforma yutuqlari, mijozlarning fikrlari haqida yaqindan tanishing!</p>
              <a href="#" class="batafsil">Batafsil</a>
              <div className="social-links">
                        <a href="#" class="social-icon" aria-label="Facebook">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png" alt="Facebook"/>
                            <span className="icon-text">Facebook</span>
                        </a>
                        <a href="#" class="social-icon" aria-label="Twitter">
                            <img src="https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/twitter_circle-512.png" alt="Twitter"/>
                            <span className="icon-text">Twitter</span>
                        </a>
                        <a href="#" class="social-icon" aria-label="Instagram">
                            <img src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-instagram-new-circle-512.png" alt="Instagram"/>
                            <span className="icon-text">Instagram</span>
                        </a>
                        <a href="#" class="social-icon" aria-label="Telegram">
                            <img src="/Images/Rasmlar/Telegram.webp" alt="Telegram"/>
                            <span className="icon-text">Telegram</span>
                        </a>
                        <a href="#" class="social-icon" aria-label="You Tube">
                            <img src="/Images/Rasmlar/YouTubeNew.svg" alt="You Tube"/>
                            <span className="icon-text">You Tube</span>
                        </a>
              </div>
            </div>
            <div className='right'>
              <img src="/Images/Rasmlar/Heroabout xoji.png" alt="Hero Section of About Page" />
            </div>
        </div>
    </section>
  )
}

export default HeroAbout