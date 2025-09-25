import React from 'react'
import "./TopHeader.css"

function TopHeader() {
    return (
        <div className='BigContainer'>
            <div className='TopHeaderContainer'>
                <div className='left'>
                    <img src="/Images/Rasmlar/phone-call.png" alt="Phone icon" />
                    <p>Tel: +998 90 529 24 08</p>
                    <img src="/Images/Rasmlar/time.png" alt="Clock icon" />
                    <p>Ish vaqti: 8.00-18.00</p>
                </div>
                <div className='right'>
                    <img src="/Images/Rasmlar/EmailWhite2.png" alt="Email icon" />
                    <p>Email: x.ostanaqulov@mail.ru</p>
                    <a href="https://www.facebook.com/andmiedu?__tn__=-UC*F" target='_blank' rel="noopener noreferrer">
                        <img src="/Images/Rasmlar/FacebookWhite.png" alt="Facebook logo" />
                    </a>
                    <a href="" target='_blank' rel="noopener noreferrer">
                        <img src="/Images/Rasmlar/TwitterWhite.png" alt="Twitter logo" />
                    </a>
                    <a href="" target='_blank' rel="noopener noreferrer">
                        <img src="/Images/Rasmlar/InstagramWhite.png" alt="Instagram logo" />
                    </a>
                    <a href="https://t.me/Andmiedu1" target='_blank' rel="noopener noreferrer">
                        <img src="/Images/Rasmlar/TelegramWhite.png" alt="Telegram logo" />
                    </a>
                    <a href="https://www.youtube.com/@andmieduuz" target='_blank' rel="noopener noreferrer">
                        <img src="/Images/Rasmlar/YouTubeWhite.png" alt="YouTube logo" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default TopHeader
