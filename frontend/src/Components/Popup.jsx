import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";

const Popup = (props) => {
// const service=props.servicename;
const location = useLocation();
const service = location.state?.servicename;
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
amt.set("Pet Care+",1200);
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
    fetchslot();2
},[selectedDate])
  

  const handleConfirm = () => {
    props.setTrigger(false);
    navigate("/Receipt", { 
      replace: true, 
      state: { date: selectedDate, slot: selectedSlot } 
    });
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
          {days.map((day, i) => (
            <option key={i} value={day.toDateString()}>
              {day.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
            </option>
          ))}
        </select>

        <label>Select Time Slot:</label>
        <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>
          <option value="">Choose Time</option>
          {slot.map((slot, i) => (
            <option key={i} value={slot}>{slot}</option>
          ))}
        </select>

        <div className="actions">
          <button onClick={() => props.setTrigger(false)}>Cancel</button>
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