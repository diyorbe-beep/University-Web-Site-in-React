import React from 'react'
import './Home.css'
import Hero from '../../Components/Hero/Hero'


function Home() {
  return (
    <div>
    
    <Hero />

    <section className="features">
        <div className="container">
            <h2>Bizning Xizmatlar</h2>
            <div className="card-container">
                <div className="card">
                    <img height="164" width="164" src="/Images/Rasmlar/Ta'lim xizmatlari.webp" alt="Ta'lim Xizmatlari"/>
                    <h3>Ta'lim Xizmatlari</h3>
                    <p>Ta'lim resurslari, darsliklar va o'qituvchilarning qo'llanmalari. Eng yaxshi ta'lim xizmatlarini taqdim etamiz.</p>
                    <a href="#" className="btn-secondary">Ko'proq o'qish</a>
                </div>
                <div className="card">
                    <img height="164" width="164" src="/Images/Rasmlar/Biznes Hamkorlik.jpg" alt="Biznes Hamkorlik"/>
                    <h3>Biznes Hamkorlik</h3>
                    <p>Biznes hamkorlar uchun ma'lumotlar va imkoniyatlar. Biznesingizni rivojlantirishda yordam beramiz.</p>
                    <a href="#" className="btn-secondary">Ko'proq ma'lumot</a>
                </div>
                <div className="card">
                    <img height="164" width="164" src="/Images/Rasmlar/Ilmiy tadqiqotlar.webp" alt="Ilmiy Tadqiqotlar"/>
                    <h3>Ilmiy Tadqiqotlar</h3>
                    <p>Ilmiy tadqiqotlar va maqolalar. Eng so'nggi ilmiy yangiliklar va izlanishlar.</p>
                    <a href="#" className="btn-secondary">Ko'proq izlash</a>
                </div>
                <div className="card">
                    <img height="164" width="164" src="/Images/Rasmlar/Sport.webp" alt="Sport va Sog'lik"/>
                    <h3>Sport va Sog'lik</h3>
                    <p>Sport va sog'lik xizmatlari haqida ma'lumotlar. Sog'ligingiz uchun eng yaxshi xizmatlar.</p>
                    <a href="#" className="btn-secondary">Batafsil</a>
                </div>
                <div className="card">
                    <img height="164" width="164" src="/Images/Rasmlar/Madaniyat.webp" alt="Madaniyat va San'at"/>
                    <h3>Madaniyat va San'at</h3>
                    <p>Madaniyat va san'at tadbirlari. O'z madaniyatingiz va san'atingizni rivojlantiring.</p>
                    <a href="#" className="btn-secondary">Ko'proq ma'lumot</a>
                </div>
                <div className="card">
                    <img height="164" width="164" src="/Images/Rasmlar/Resurslar.webp" alt="Resurslar"/>
                    <h3>Resurslar</h3>
                    <p>Qo'llanmalar va boshqa resurslar. Eng yaxshi resurslardan foydalaning.</p>
                    <a href="#" className="btn-secondary">Batafsil</a>
                </div>
            </div>
        </div>
    </section>

    <section className="news-events">
        <div className="container">
            <h2>Yangiliklar</h2>
            <div className="news-container">
                <div className="news-item">
                    <div className="left">
                        <img src="/Images/Rasmlar/O'quv Yangiliklari.jpg" alt="2024-2025 O'quv Yili Yangiliklari"/>
                    </div>
                    <div className="right">
                        <h3>2024-2025 O'quv Yili Yangiliklari</h3>
                        <p>Yangi o'quv yiliga tayyorgarlik va yangiliklar. Bizning ta'lim olami bilan tanishing.</p>
                        <a href="#" className="btn-secondary">Batafsil</a>
                    </div>
                </div>
                <div className="news-item">
                   <div className="left">
                        <img src="/Images/Rasmlar/Tadbirlar.jpg" alt="Tadbirlar va Konferensiyalar"/>
                   </div>
                   <div className="right">
                        <h3>Tadbirlar va Konferensiyalar</h3>
                        <p>Ilmiy tadqiqotlar va boshqa tadbirlar haqida ma'lumotlar. Bizning tadbirlarimizga qo'shiling.</p>
                        <a href="#" className="btn-secondary">Batafsil</a>
                   </div>
                </div>
                <div className="news-item">
                   <div className="left">
                        <img src="/Images/Rasmlar/MadaniyMarifiy.jpg" alt="Tadbirlar va Konferensiyalar"/>
                   </div>
                   <div className="right">
                        <h3>Madaniy-marifiy tadbirlar</h3>
                        <p>Ilmiy tadqiqotlar va boshqa tadbirlar haqida ma'lumotlar. Bizning tadbirlarimizga qo'shiling.</p>
                        <a href="#" className="btn-secondary">Batafsil</a>
                   </div>
                </div>
                <div className="news-item">
                   <div className="left">
                        <img src="/Images/Rasmlar/1-kurslar.jpg" alt="Tadbirlar va Konferensiyalar"/>
                   </div>
                   <div className="right">
                        <h3>1-kurslarga ko'rsatmalar berish</h3>
                        <p>Ilmiy tadqiqotlar va boshqa tadbirlar haqida ma'lumotlar. Bizning tadbirlarimizga qo'shiling.</p>
                        <a href="#" className="btn-secondary">Batafsil</a>
                   </div>
                </div>
            </div>
        </div>
    </section>

    <section className="resources">
        <div className="container">
            <h2>Resurslar</h2>
            <div className="resource-container">
                <div className="resource-item">
                    <img src="/Images/Rasmlar/qollanmanew.png" alt="Foydali Qo'llanmalar" />
                    <h3>Foydali Qo'llanmalar</h3>
                    <p>O'quvchilar va o'qituvchilar uchun qo'llanmalar. Eng yaxshi resurslardan foydalaning.</p>
                    <a href="#" className="btn-secondary">Yuklab Oling</a>
                </div>
                <div className="resource-item">
                    <img src="/Images/Rasmlar/mehnat.png" alt="Mehnat Imkoniyatlari" />
                    <h3>Mehnat Imkoniyatlari</h3>
                    <p>Mehnat bozori va staj imkoniyatlari. Yangi imkoniyatlar va tajribalar.</p>
                    <a href="#" className="btn-secondary">Ko'proq Ma'lumot</a>
                </div>
                <div className="resource-item">
                    <img src="/Images/Rasmlar/ilmiyy.png" alt="Ilmiy Maqolalar" />
                    <h3>Ilmiy Maqolalar</h3>
                    <p>So'nggi ilmiy maqolalar va izlanishlar. Ilmiy olam bilan tanishing.</p>
                    <a href="#" className="btn-secondary">Batafsil</a>
                </div>
            </div>
        </div>
    </section>

    <div className="student-life">
        <div className="container">
            <h2>Bajarilgan Ishlarimiz</h2>
            <p>Talabalar uchun ta'lim va madaniyat hayotining qiziqarli voqealari. Bizning talabalarimizning hayotiga nazar tashlang.</p>
            <div className="gallery">
                <img src="/Images/Rasmlar/Image11.jpg" alt="O'quvchilar hayoti 1"/>
                <img src="/Images/Rasmlar/Image12.png" alt="O'quvchilar hayoti 2"/>
                <img src="/Images/Rasmlar/Image13.jpg" alt="O'quvchilar hayoti 3"/>
                <img src="/Images/Rasmlar/Image14.jpg" alt="O'quvchilar hayoti 4"/>
                <img src="/Images/Rasmlar/Image15.jpg" alt="O'quvchilar hayoti 5"/>
                <img src="/Images/Rasmlar/Image16.jpg" alt="O'quvchilar hayoti 6"/>
            </div>
        </div>
    </div>

    
</div>
  )
}

export default Home
