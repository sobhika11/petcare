import React from 'react'

const Newsletter = () => {
  return (
    <>
    <div className="footer-div">
        <h2>Welcome to PetCare.go, where we’re passionate about providing exceptional care for your beloved pets.Our clinic is dedicated to creating a safe, nurturing, and comfortable environment for animals of all kinds. With a team of highly qualified veterinary doctors, skilled technicians, and caring staff, we offer a comprehensive range of services, from routine check-ups and vaccinations to advanced medical treatments and emergency care.

Thank you for choosing PetCare.go as your trusted partner in pet care. We look forward to welcoming you and your pets into our family!</h2>
  
    </div>
    <footer className="footer">
        <div className="footer-container">
    <div className="footer-col">
      <h3>PETCARE.GO</h3>
      <p>First Floor Khasra No. 47, Kundli, Sonipat - 131028</p>
      <p>📞 +91-9999971719</p>
      <p>✉ info@petcare.go</p>
    </div>

    <div className="footer-col">
      <h3>USEFUL LINKS</h3>
      <ul>
        <li>FAQs</li>
        <li>Privacy Policy</li>
        <li>Terms & Conditions</li>
        <li>About Us</li>
        <li>Contact Us</li>
      </ul>
    </div>

    <div className="footer-col">
      <h3>PRODUCT CATEGORY</h3>
      <ul>
        <li>Pet Feeders</li>
        <li>Cat Scratchers</li>
        <li>Pet Beds & Accessories</li>
      </ul>
    </div>

    <div className="footer-col images">
      <img src="../public/images/vet1.jpg" />
      <img src="../public/images/vet2.jpeg" /><br/>
      <img src="../public/images/vet3.jpeg" />
      <img src="../public/images/vet4.webp" />
    </div>

  </div>

  <div className="footer-bottom">
    © 2022 petzcreation.com All Rights Reserved.
  </div>
</footer>

    </>
  )
}

export default Newsletter