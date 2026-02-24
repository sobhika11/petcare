import Services from "./Services";
import Care from "./Care.jsx";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className='dogGroom'>
      <p className='para'>Welcome to petacre <br/></p>
      <p className='para2'>
          We take care of your <br/>BEST FRIEND
      </p>
      </div>
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
