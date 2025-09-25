import React from 'react'
import "./Testimonial.css"
function Testimonial() {
  return (
    <div>
        <div className="testimonials-hero">
        <div className="testimonials-content">
          <h2>Mijozlarimizning Fikrlari</h2>
          <p>Quyida bizning xizmatlarimizdan mamnun mijozlarimizning fikrlari bilan tanishing.</p>
          <div className="testimonial-cards">
            <div className="testimonial-card">
              <p>“Ajoyib xizmat! Men juda mamnunman va albatta yana foydalanaman.”</p>
              <h3>Olimjon Xasanov</h3>
              <h4>Yuridik maslahatchi</h4>
            </div>
            <div className="testimonial-card">
              <p>“Xizmat juda tez va sifatli amalga oshirildi. Rahmat!”</p>
              <h3>Shirinaxon Karimova</h3>
              <h4>Tadbirkor</h4>
            </div>
            <div className="testimonial-card">
              <p>“Menga juda yoqdi. Barchaga tavsiya qilaman!”</p>
              <h3>Ravshan Qayumov</h3>
              <h4>Dizayner</h4>
            </div>
            <div className="testimonial-card">
              <p>“Xizmatlar sifati yuqori va narxlar mos. Juda minnatdorman!”</p>
              <h3>Nodira Ahmedova</h3>
              <h4>O'qituvchi</h4>
            </div>
            <div className="testimonial-card">
              <p>“Xizmat ko'rsatish a'lo darajada. Kelgusida ham albatta foydalanaman.”</p>
              <h3>Farrux Rustamov</h3>
              <h4>Dasturchi</h4>
            </div>
            <div className="testimonial-card">
              <p>“Xizmatlar sifati meni lol qoldirdi. Rahmat!”</p>
              <h3>Mahmud Ismoilov</h3>
              <h4>Muhandis</h4>
            </div>
            <div className="testimonial-card">
              <p>“Kariyeramdagi o'sishda ushbu xizmatlar foyda berdi!”</p>
              <h3>Xakimov To'lanboy</h3>
              <h4>Talaba</h4>
            </div>
            <div className="testimonial-card">
              <p>“Institut hodimlariga ushbu xizmatlar uchun minnatdorchilik bildiraman!”</p>
              <h3>Abdumuxtororva Madina</h3>
              <h4>Jurnalist</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonial