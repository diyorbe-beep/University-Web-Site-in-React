import React, { useState } from 'react';

const TelegramForm = () => {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    const botToken = '7880432469:AAEadDHofYPBSVS08rv-qRf7MF-VDVeiOiI';
    const chatId = '1068969623';
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    })
    .catch((error) => console.error('Error sending message:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button type="submit">Send to Telegram</button>
    </form>
  );
};

export default TelegramForm;
