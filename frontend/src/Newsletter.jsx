import React from 'react'

const Newsletter = () => {
  return (
    <div className="about-page-wrapper">

      {/* SECTION 1: HERO ABOUT */}
      <section className="about-hero">
        <span className="subtitle">Our Story</span>
        <h2>About PetCare</h2>

        <p className="hero-desc">
          At PetCare, we believe pets are not just animals — they are family.
          Our mission is to provide loving, safe, and professional care so your
          furry companions feel comfortable, happy, and healthy every day.
        </p>

        <div className="about-image-grid">
          <div className="img-large">
            <img src="/Images/aboutus1.jpeg" alt="Pet care" />
          </div>
          <div className="img-stack">
            <img src="/Images/aboutus2.jpeg" alt="Vet 1" />
          </div>
          <div className="img-stack">
            <img src="/Images/aboutus3.jpeg" alt="Vet 2" />
          </div>
        </div>
      </section>


      {/* SECTION 2: THE VISION */}
      <section className="vision-section">
        <div className="vision-content">
          <h3>Providing the Best Care for Your Beloved Pets</h3>

          <div className="vision-text-grid">
            <p>
              Our goal is to create a welcoming and stress-free environment where
              pets receive the care, attention, and love they deserve. We focus on
              maintaining the highest standards of hygiene, safety, and comfort.
            </p>

            <p>
              With experienced pet care specialists and trained professionals,
              PetCare offers reliable grooming, health monitoring, and personalized
              care services to ensure your pets stay happy and healthy.
            </p>
          </div>
        </div>
      </section>


      {/* SECTION 3: CORE VALUES */}
      <section className="values-grid">

        <div className="value-item">
          <div className="value-icon">🐾</div>
          <h4>Experienced Team</h4>
          <p>
            Our trained pet care professionals ensure your pets receive gentle,
            safe, and expert handling.
          </p>
        </div>

        <div className="value-item">
          <div className="value-icon">❤️</div>
          <h4>Pet First Approach</h4>
          <p>
            Every service we provide is designed around the comfort and happiness
            of your beloved pets.
          </p>
        </div>

        <div className="value-item">
          <div className="value-icon">✨</div>
          <h4>Trusted Care</h4>
          <p>
            We maintain high standards of hygiene and safety so pet owners can
            trust us completely.
          </p>
        </div>

      </section>


      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">

          <div className="footer-col">
            <ul>
              <li><h3>PETCARE</h3></li>
              <li>First Floor Khasra No. 47, Kundli, Sonipat</li>
              <li>📞 +91-9999971719</li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>USEFUL LINKS</h3>
            <ul>
              <li>FAQs</li>
              <li>Privacy Policy</li>
              <li>About Us</li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>GALLERY</h3>
            <div className="footer-mini-grid">
              <img src="/Images/aboutus4.jpeg" alt="v1"/>
              <img src="/Images/vet2.jpeg" alt="v2"/>
              <img src="/Images/vet3.jpeg" alt="v3"/>
              <img src="/Images/vet4.webp" alt="v4"/>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          © 2026 petcare.com All Rights Reserved
        </div>
      </footer>

    </div>
  )
}

export default Newsletter