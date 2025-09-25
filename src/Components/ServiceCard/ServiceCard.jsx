import React from 'react'
import './ServiceCard.css'
import BasicRating from '../Ratings/Ratings'
import IconCheckboxes from '../Like/Like'
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../../config';

function ServiceCard() {
    const navigate = useNavigate();

    const fallbackServices = [
        {
            name: 'Web Development',
            videoSrc: '/Videos/WebDevelopment.mp4',
            description: 'Statik yoki Dinamik veb-sayt yaratish',
            price: '$50',
            person: 'Ostanaqulov Xojiakabr',
            rating: 9,
        },
        {
            name: 'Graphic Design',
            videoSrc: '/Videos/GrafikDesign.mp4',
            description: 'Banner va Postlar uchun noyob dizaynlar yaratish',
            price: '$45',
            person: 'Elyor Rahimov',
            rating: 9,
        },
        {
            name: 'Web Design',
            videoSrc: '/Videos/WebDesign.mp4',
            description: 'Veb-Saytlar uchun dizayn yaratish',
            price: '$40',
            person: 'Zilola Anvarova',
            rating: 8,
        },
        {
            name: 'Solar Panels',
            videoSrc: '/Videos/QuyoshPanel.mp4',
            description: 'Korxonalar uchun quyosh panellari o\'rnatish',
            price: '$65',
            person: 'Abdullayev Sarvar',
            rating: 10,
        },
        {
            name: 'Solar Panels',
            videoSrc: '/Videos/QuyoshPanel.mp4',
            description: 'Korxonalar uchun quyosh panellari o\'rnatish',
            price: 'Kelishiladi',
            person: 'Abdullayev Sarvar',
            rating: 10,
        },
        {
            name: 'Camera services',
            videoSrc: '/Videos/QuyoshPanel.mp4',
            description: "Korxonalar uchun kameralar o'rnatib berish",
            price: '1/5$',
            person: 'Sherboyev Murodjon',
            rating: 10,
        }
    ];

    const [services, setServices] = React.useState(fallbackServices);

    React.useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await fetch(`${API_BASE}/api/services`);
                if (!res.ok) throw new Error('service fetch failed');
                const data = await res.json();
                if (!cancelled && Array.isArray(data) && data.length) {
                    const mapped = data.map(d => ({
                        name: d.name,
                        videoSrc: d.videoSrc || '',
                        description: d.description || '',
                        price: d.price || '',
                        person: d.person || '',
                        rating: d.rating || 0,
                    }));
                    setServices(mapped);
                }
            } catch {
                // keep fallback
            }
        })();
        return () => { cancelled = true };
    }, []);

    function handleOrderClick(e) {
        navigate('/contact', { state: e })
    }
    return (
        <div className='ServiceCardBigContainer'>
            <h2>Bizning Xizmatlar</h2>
            <div className='ServiceCardContainer'>
                {services.map((service, index) => (
                    <div className='ServiceCard' key={index}>
                        <div className='Person'>
                            <img src="/Images/Rasmlar/profile.png" alt="Person" />
                            <p>{service.person}</p>
                            <IconCheckboxes />
                        </div>
                        <div className='ImageVideo'>
                            {service.videoSrc ? (
                                <video width="340" height="220" controls>
                                    <source src={service.videoSrc} type="video/mp4" />
                                </video>
                            ) : (
                                <div style={{ width: 340, height: 220, background: '#f0f0f0' }} />
                            )}
                        </div>
                        <div className='ServiceCategory'>
                            <div>{service.name}</div>
                        </div>
                        <div className='Features'>
                            <img src="/Images/Rasmlar/Arzon.png" alt="Arzon" />
                            <p>Arzon</p>
                            <img src="/Images/Rasmlar/Ommabop.png" alt="Ommabop" />
                            <p>Ommabop</p>
                        </div>
                        <div className='ServiceName'>
                            {service.description}
                        </div>
                        <div className='Rating'>
                            <span>{service.rating}</span>/10
                        </div>
                        <div className='Stars'>
                            <BasicRating />
                            <div className='Price'>
                                <p>{service.price}</p>
                            </div>
                        </div>
                        <button alt="Buyurtma qilish" onClick={() => handleOrderClick(service)}>
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
                ))}
            </div>
        </div>
    )
}

export default ServiceCard