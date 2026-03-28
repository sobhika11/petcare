import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";

const Popup = (props) => {
const location = useLocation();
const service = location.state?.servicename;
let petname = "";
if (service === "Paw trim" || service === "Paw tint" || service === "Pet Glow-Up")
  petname = "Dog";
else
  petname = "Cat";
const navigate=useNavigate();
const [selectedDate,setSelectedDate]=useState("");
const [selectedSlot, setSelectedSlot] = useState("");
const days=[]
const date=new Date();
for(let i=1;i<=7;i++){
  const d=new Date(date);
  d.setDate(date.getDate()+i);
  days.push(d);

}
const amt=new Map();
amt.set("Paw trim",300);
amt.set("kitty cut",400);
amt.set("Paw tint",300);
amt.set("kitty tint",500);
amt.set("Pet Glow-Up",700);
amt.set("Pet Caretaker",1200);
const amount=amt.get(service);

const[slot,setSlot]=useState([])
useEffect(()=>{
    const fetchslot=async()=>{
      const res=await fetch(`http://localhost:5000/api/slot/timeslot?date=${selectedDate}`,{
        headers:{
         'Content-Type': 'application/json'
        }
      });
      const data=await res.json();
       if (!res.ok) throw new Error("Failed to fetch");
      setSlot(data.length > 0 ? data : ["10.00", "11.00", "12.00"]);
      
    }
    if(slot.length===0)
        setSlot(["10.00","11.00"]);
    fetchslot();
},[selectedDate])


const handleConfirm = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/apt/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        petType: petname,
        preferredDate: selectedDate,
        preferredTime: selectedSlot,
        amount: amount
      })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Unknown error");
    } else {
      alert("Booked! See you soon💕");
      navigate(-1);
      
      try {
        await fetch("http://localhost:5000/api/apt/email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
          email: data.email, 
          name: data.name,  
          petType: petname, 
          preferredDate: selectedDate,
          preferredTime: selectedSlot
        })
        });
      } catch (e) {
        console.error("Silent email failure", e);
      }
    }
  } catch (err) {
    console.error("booking error", err);
    alert("Booking failed, Try Again Later!");
  }
};

  return (
    <div className='popup'>
      <div className='popupp'>
        <h3 className="popup-header">Book Appointment</h3>
        <br/>
        <div >
          <h4>Booking: {service}</h4>
          <p className="price-tag">Amount to Pay: <strong>₹{amount}</strong></p>
        </div>
        
        <hr />
        <div className='popup-body'>
          <label>Select Date:</label>
        <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
          <option value="">Choose Date</option>
          {days.map((day, i) => {
            // store as ISO "YYYY-MM-DD" so profile can compare easily
            const iso = day.toISOString().split('T')[0];
            return (
              <option key={i} value={iso}>
                {day.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
              </option>
            );
          })}
        </select>

        <label>Select Time Slot:</label>
        <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>
          <option value="">Choose Time</option>
          {slot.map((slot, i) => (
            <option key={i} value={slot}>{slot}</option>
          ))}
        </select>

        <div className="actions">
          <button onClick={() => navigate(-1)}>Cancel</button>
          <button 
            disabled={!selectedDate || !selectedSlot} 
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default Popup;