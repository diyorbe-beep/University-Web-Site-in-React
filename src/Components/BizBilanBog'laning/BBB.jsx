import React from 'react';
import { useState } from 'react';
import './BBB.css';

function BBB() {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    const botToken = '7880432469:AAEadDHofYPBSVS08rv-qRf7MF-VDVeiOiI';
    const chatId = '1068969623';
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className='BBBContainer'>
      <h1>Biz bilan <span>Email</span> orqali bog'laning</h1>
      <p>Platforma yuzasidan savollaringiz bo'lsa bizga o'z Email pochtangizni yuborish orqali bog'lanishingiz mumkin!</p>
      <div className='InputImg'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Iltimos, Email pochtangizni kiriting!'
          />
          <img src="/Webp Images/EmailGold.webp" alt="Email" />
          <button type='submit'>Yuborish!</button>
        </form>
      </div>
      <div className='Checked'>
        <div className='FirstChecked'>
          <img src="/Webp Images/CheckedGold.webp" alt="Checked" />
          <span>Takliflar</span>
        </div>
        <div className='SecondChecked'>
          <img src="/Webp Images/CheckedGold.webp" alt="Checked" />
          <span>Shikoyatlar</span>
        </div>
        <div className='ThirdChecked'>
          <img src="/Webp Images/CheckedGold.webp" alt="Checked" />
          <span>Fikrlar</span>
        </div>
      </div>
    </div>
  );
}

export default BBB;
