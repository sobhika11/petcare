import React from 'react'

const Newsletter = () => {
  return (
    <>
    <p>
        <img src="../public/Images/footer_img.avif" alt="PetCare.go Logo" width="50%"/>
        Welcome to PetCare.go, where we’re passionate about providing exceptional care for your beloved pets.Our clinic is dedicated to creating a safe, nurturing, and comfortable environment for animals of all kinds. With a team of highly qualified veterinary doctors, skilled technicians, and caring staff, we offer a comprehensive range of services, from routine check-ups and vaccinations to advanced medical treatments and emergency care.
        Thank you for choosing PetCare.go as your trusted partner in pet care. We look forward to welcoming you and your pets into our family!
        <div className="newsletter">
            <div>
                <h4>PETCARE.GO</h4>
                <p>crosscut road,Gandhipuram,<br/>                
                Coimbatore -642002</p>
                <p>Phone: +91 8438439860</p>
                <p>Email:sobhika1105@gmail.com</p>
            </div>
            <div>
                <h4>NEWSLETTER</h4>
                <p>Subscribe to our newsletter to get the latest updates and offers.</p>
                <input type="email" placeholder="Enter your email" />
                <button type="submit">Subscribe</button>
            </div>
            <div>
                <h4>FOLLOW US</h4>
                <p>Stay connected through our social media channels.</p>
                <p> <a href="#">Facebook</a> | <a href="#">Twitter</a> | <a href="#">Instagram</a> | <a href="#">LinkedIn</a></p>
            </div>
        </div>
    </p>

    </>
  )
}

export default Newsletter