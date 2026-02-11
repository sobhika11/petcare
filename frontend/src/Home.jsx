import Services from "./Services";
import Care from "./Care.jsx";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="sec">
        <div id="dog"></div>

        <div style={{ float: "left" }}>
          <p style={{ fontSize: "50px", color: "black" }}>
            Your pet DESERVES<br /> to be Pampered!🐾
          </p>

          <p id="miss">
            At Loving petcare ,we take care of your beloved tiny members💕
          </p>

          <br />
        </div>
      </section>
      <Services/>
      <div className="footersec">
        <div className="carediv">
            
        <Care img={"../public/Images/vet1.jpg"}
              text={"PetCare helps users easily find and book nearby pet care services, including groomers and veterinarians, through a simple online platform. This makes pet care convenient and time-saving for owners."}
        />
        <Care 
          img={"../public/Images/vet2.jpeg"}
          text={"PetCare provides professional dog grooming services such as bathing, brushing, and nail trimming to keep dogs clean, healthy, and comfortable. Trained groomers ensure a safe and stress-free experience for every pet."}
        />
        <Care 
          img={"../public/Images/vet3.jpeg"}
          text={"PetCare offers gentle cat grooming services like de-shedding, nail trimming, and hygiene care. Our professionals ensure a calm environment to keep cats comfortable and healthy."}
        />


        </div>
      </div>
    </>
  );
}

export default Home;
