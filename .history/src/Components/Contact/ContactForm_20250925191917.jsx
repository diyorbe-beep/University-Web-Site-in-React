import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './ContactForm.css'
import Map from '../GoogleMap/GoogleMap';
import { useLocation } from 'react-router-dom';
import BasicRating from '../Ratings/Ratings';
import IconCheckboxes from '../Like/Like';
import "./ContactForm.css"
import { io } from 'socket.io-client';
import { API_BASE } from '../../config';
import { requestJson } from '../../lib/api';

export default function BasicTextFields() {
  const { state: s } = useLocation();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [middleName, setMiddleName] = React.useState('');
  const [organization, setOrganization] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [phone2, setPhone2] = React.useState('');
  const [position, setPosition] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [orderId, setOrderId] = React.useState(null);
  const [userEmail, setUserEmail] = React.useState('');

  React.useEffect(() => {
    const socket = io(API_BASE, {
      transports: ['websocket', 'polling'],
      timeout: 20000,
      forceNew: true
    });
    
    socket.on('connect', () => {
      console.log('ContactForm Socket connected');
    });
    
    function onUpdated(order) {
      if (orderId && order && order._id === orderId) {
        if (order.status === 'approved') {
          setSuccess("Buyurtmangiz ma'qullandi! Tez orada bog'lanamiz.");
        } else if (order.status === 'rejected') {
          setError("Afsuski, buyurtmangiz rad etildi.");
        }
      }
    }
    socket.on('orders:updated', onUpdated);
    return () => {
      socket.off('orders:updated', onUpdated);
      socket.disconnect();
    };
  }, [orderId]);

  React.useEffect(() => {
    (async () => {
      const me = await requestJson(`${API_BASE}/auth/me`);
      if (me.ok && me.data?.user?.email) setUserEmail(me.data.user.email);
    })();
  }, []);

  async function submitOrder() {
    try {
      setSubmitting(true);
      setError('');
      setSuccess('');
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          middleName,
          organization,
          address,
          phone,
          phone2,
          position,
          message,
          userEmail: userEmail || undefined,
          service: s || null,
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Xatolik yuz berdi');
      setOrderId(data?._id || null);
      setSuccess("Buyurtma qabul qilindi! Tez orada bog'lanamiz.");
      setFirstName('');
      setLastName('');
      setMiddleName('');
      setOrganization('');
      setAddress('');
      setPhone('');
      setPhone2('');
      setPosition('');
      setMessage('');
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className='ContactFormBigContainer'>
      <div className='ContactFormContainer'>
        <h2>Biz bilan bog'laning!</h2>
        <Box className='Box'
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '50%' } }}
          noValidate
          autoComplete="off"
          onSubmit={(e) => { e.preventDefault(); submitOrder(); }}
        >
          <div className='LeftBox'>
            <TextField
              helperText="Ismingizni kiriting"
              id="first-name"
              label="Ism"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              helperText="Familiyangizni kiriting"
              id="last-name"
              label="Familiya"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              helperText="Otangizning ismini kiriting"
              id="middle-name"
              label="Otasining ismi"
              required
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
            <TextField
              helperText="Tashkilotingiz nomini kiriting"
              id="organization"
              label="Tashkilot nomi"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
            <TextField
              helperText="Manzilingizni kiriting"
              id="address"
              label="Manzil"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className='RightBox'>
            <TextField
              helperText="Telefon raqamingizni qoldiring"
              id="phone"
              label="Telefon raqam"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              helperText="Qo'shimcha telefon raqam qoldiring"
              id="phone2"
              label="Telefon raqam"
              value={phone2}
              onChange={(e) => setPhone2(e.target.value)}
            />
            <TextField className='inp'
              helperText="Lavozimingizni kiriting"
              id="position"
              label="Lavozim"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
            <textarea className='inpp' name="" id="message" placeholder="Qo'shimcha ma'lumot qoldiring" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
          </div>
        </Box>
        <Map />
        {
          s &&
          <div className='ServiceCardContainer'>
            <div className='ServiceCard'>
              <div className='Person'>
                <img src="/Webp Images/Profile.webp" alt="Person" />
                <p>{s?.person}</p>
                <IconCheckboxes />
              </div>
              <div className='ImageVideo'>
                <video width="340" height="220" controls>
                  <source src={s?.videoSrc} type="video/mp4" />
                </video>
              </div>
              <div className='ServiceCategory'>
                <div>{s?.name}</div>
              </div>
              <div className='Features'>
                <img src="/Webp Images/Arzon.webp" alt="Arzon" />
                <p>Arzon</p>
                <img src="/Webp Images/Ommabop.webp" alt="Ommabop" />
                <p>Ommabop</p>
              </div>
              <div className='ServiceName'>
                {s?.description}
              </div>
              <div className='Rating'>
                <span>{s?.rating}</span>/10
              </div>
              <div className='Stars'>
                <BasicRating />
                <div className='Price'>
                  <p>{s?.price}</p>
                </div>
              </div>
              <button alt="Buyurtma qilish" onClick={submitOrder} disabled={submitting}>
                <i>b</i>
                <i>u</i>
                <i>y</i>
                <i>u</i>
                <i>r</i>
                <i>t</i>
                <i>m</i>
                <i>a</i>
                <i>&nbsp;</i>
                <i>q</i>
                <i>i</i>
                <i>l</i>
                <i>i</i>
                <i>s</i>
                <i>h</i>
              </button>
            </div>
          </div>
        }
        {error && <div className='error-msg'>{error}</div>}
        {success && <div className='success-msg'>{success}</div>}
        <button className='ContactFormButton' alt="Yuborish" onClick={submitOrder} disabled={submitting}>
          <i>y</i>
          <i>u</i>
          <i>b</i>
          <i>o</i>
          <i>r</i>
          <i>i</i>
          <i>s</i>
          <i>h</i>
        </button>
      </div>
    </div>
  );
}