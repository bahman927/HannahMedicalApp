import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate} from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import  '../calendar.css'


const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const Calendar = (props) => {
  let {name} = useContext(AuthContext)
  const navigate = useNavigate()
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDoctor, setSelectedDoctor] = useState(props.docName)
  const [selectedDay, setSelectedDay] = useState(null)
  const [bookedDays, setBookedDays] = useState({});
  const [patientInfo, setPatientInfo] = useState({ name: '', familyName: '' });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [submitted, setSubmitted]= useState(true)
  
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  // Reference to the patient name input
  const patientInputRef = useRef(null);
  const patientInputRef2 = useRef(null);
  const slotInfoRef = useRef(null)
  // console.log('name in Calendar = ', name)
  
  
const handleDoctorChange = () => {
    setSelectedDay('')
    setSelectedTimeSlot('')
    // setSelectedDoctor(e.target.value);
  };

const today = new Date();
 
  // Generate time slots for appointments
const generateTimeSlots = () => {
  if (!name) {
    alert("Please Login or sign up first ");
    navigate("/");
  }
  
      const slots = [];
      let hour = 8;
      let minute = 0;
      let hour2 = 0;
      while (hour < 17 || (hour === 17 && minute === 0)) {
        hour2 = hour > 12 ? hour - 12 : hour;
        const time = `${hour2.toString()}:${minute === 0 ? '00' : '30'}`;
        const meridian = hour < 12 ? 'AM' : 'PM';
        const displayTime = `${time} ${meridian}`;
        slots.push(displayTime);

        minute += 30;
        if (minute === 60) {
          minute = 0;
          hour++;
        }
      }
  return slots;
};

// const timeSlotsRef = generateTimeSlots();
 
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  useEffect(() => {
    
    const storedBookedDays = localStorage.getItem(`bookedDays_${selectedDoctor}`);
    
    try {
      if (storedBookedDays) {
        const parsedBookedDays = JSON.parse(storedBookedDays);
        setBookedDays(parsedBookedDays);
      } else {
        setBookedDays({});
      }
    } catch (error) {
      console.error("Error parsing booked days:", error);
      setBookedDays({});
    }
  }, []);

useEffect(() => {
  
  const storedData = localStorage.getItem(`bookedDays_${selectedDoctor}`);
  if (storedData) {
    setBookedDays(JSON.parse(storedData));  // Set state with the retrieved data
  }
   
}, [selectedDoctor]); 
  

useEffect(() => {
   
  if (bookedDays)
     localStorage.setItem(`bookedDays_${selectedDoctor}`, JSON.stringify(bookedDays));
     const storedData = localStorage.getItem(`bookedDays_${selectedDoctor}`);
    
   }, [bookedDays]);

  //  useEffect(() => {
  //   if (!name) {
  //     alert("Please Login or sign up first ");
  //     navigate("/");
  //   }
  // }, [name]);

const handleDaySelection = (slot) => {
  
  setSelectedTimeSlot(slot)
  setSubmitted(true)
  // setSelectedDay(selectedDay);
  
}

  useEffect (()=> {
    if (selectedTimeSlot &&  patientInputRef.current){
      patientInputRef.current.focus();
      patientInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedTimeSlot]);

const nextMonth = () => {
    setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1);
    setCurrentYear(currentMonth === 11 ? currentYear + 1 : currentYear);
    setSelectedDay(null); 
  };

const prevMonth = () => {
    setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1);
    setCurrentYear(currentMonth === 0 ? currentYear - 1 : currentYear);
    setSelectedDay(null);
  };

const handleTimeSlotBooking = (timeSlot) => {
   
        
        if (name) {
          patientInfo.name = name
          
          alert(`Booked ${timeSlot} on ${selectedDay} for ${patientInfo.name} `);
          // setPatientInfo({ name: '', fam})
          setSubmitted(false)
        }
       //  if (!patientInfo.name || !patientInfo.familyName){

        //   if (!patientInfo.name && !patientInfo.familyName){
        //      alert('Please enter patient name and patient family name.');
        //     return patientInputRef.current.focus()
        //   }

        //   if (!patientInfo.name){
        //      alert('Please enter patient name.');
        //     return patientInputRef.current.focus
        //   } else {
        //     alert('Please enter patient family name.');
        //     return patientInputRef2.current.focus()
        //   }
       //  }
        
          setBookedDays((prev) => {
          const updatedDays = { ...prev };

          if (!updatedDays[selectedDoctor]) {
            updatedDays[selectedDoctor] = {};
          }
          if (!updatedDays[selectedDoctor][currentYear]) {
            updatedDays[selectedDoctor][currentYear] = {};
          }
          if (!updatedDays[selectedDoctor][currentYear][currentMonth]) {
            updatedDays[selectedDoctor][currentYear][currentMonth] = {};
          }
          if (!updatedDays[selectedDoctor][currentYear][currentMonth][selectedDay]) {
            updatedDays[selectedDoctor][currentYear][currentMonth][selectedDay] = [];
          }
          if (selectedDay && selectedTimeSlot && patientInfo.name ) {

              updatedDays[selectedDoctor][currentYear][currentMonth][selectedDay].push({
                timeSlot: selectedTimeSlot,
                patient: { name: patientInfo.name },
              })

            // alert(`Booked ${timeSlot} on ${selectedDay} for ${patientInfo.name}`);
                  
                // Clear input fields after booking
               //  setPatientInfo({ name: '' })
                setSubmitted(false)
                //  console.log('updatedDays in 159 = ', updatedDays, ' selectedDoctor =', selectedDoctor)
            return updatedDays;
               
            }

        })
      }
    
// -----------------------------------------------------
const isTimeSlotBooked = (day, timeSlot) => {   
  // console.log('bookedDays = ', bookedDays)
  
  if (!bookedDays){ 
    setBookedDays({})
  }
 
  if (!bookedDays[selectedDoctor]) {
    bookedDays[selectedDoctor] = {};
  }
  
  // Initialize bookedDays[selectedDoctor][currentYear] if it doesn't exist
  if (!bookedDays[selectedDoctor][currentYear]) {
    bookedDays[selectedDoctor][currentYear] = {};
  }
  
  // Initialize bookedDays[selectedDoctor][currentMonth] if it doesn't exist
  if (!bookedDays[selectedDoctor][currentYear][currentMonth]) {
    bookedDays[selectedDoctor][currentYear][currentMonth] = {};
  } 
    const dayBookings = bookedDays[selectedDoctor]?.[currentYear]?.[currentMonth]?.[day] ;

    if (!dayBookings) { return false}
    // console.log( 'dayBookings = ', dayBookings)

    return dayBookings?.find((booking) => booking.timeSlot === timeSlot);
  };

const isDayInPast = (day) => {
    const selectedDate = new Date(currentYear, currentMonth, day).setHours(0,0,0,0);
    return selectedDate < today.setHours(0, 0, 0, 0);
  };

const isDayBooked = (day) => {
    //  console.log('bookeddays in isDayBooked = ', bookedDays)
    if (
      !bookedDays ||
      !bookedDays[selectedDoctor] ||
      !bookedDays[selectedDoctor][currentYear] ||
      !bookedDays[selectedDoctor][currentYear][currentMonth] ||
      !bookedDays[selectedDoctor][currentYear][currentMonth][day]
    ) {  
      return false; // If any part is missing, return false
    }  
    // If everything exists, check if the day is booked
    return bookedDays[selectedDoctor][currentYear][currentMonth][day]?.length > 0;
  };

  const handleDayClick = (day) => {
   
    setSubmitted(true)
    setSelectedDay(day);
    setSelectedTimeSlot(null); // Reset time slot on day selection
    // setPatientInfo({ name: '', familyName: '' })
    
    
  };

  useEffect(() => {
    if (selectedDay !== null && slotInfoRef.current) {
      slotInfoRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedDay]);

  const handlePatientInfoChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  

return (

    <div className="flex flex-col items-center">
        {/* Doctor Selection
        <label className="mb-4">
          Select Doctor:
          <select value={selectedDoctor} onChange={handleDoctorChange} className="p-2 ml-2 border rounded">
            {doctors.map((doctor, index) => (
              <option key={index} value={doctor}>
                {doctor}
              </option>
            ))}
          </select>
        </label> */}

        {/* Month Navigation */}
        <h1 className='mt-16 mb-2 text-2xl font-semibold text-blue-800'> Appointment Time Slot for {selectedDoctor}</h1>
        <div className="flex items-center justify-between w-full max-w-md mb-5">
          <button className="text-gray-500 hover:text-black" onClick={prevMonth}>
            &#8592; Prev
          </button>
          <h2 className="text-xl font-semibold text-blue-800">
            {months[currentMonth]} {currentYear}
          </h2>
          <button className="text-gray-500 hover:text-black" onClick={nextMonth}>
            Next &#8594;
          </button>
        </div>

         {/* Days Grid */}
        <div className="grid w-full max-w-md grid-cols-7 gap-2 mb-4">
            {daysArray.map((day) => (
              <button
                key={day}
                disabled={isDayInPast(day)}  
                className={`p-4 rounded-lg flex justify-center items-center ${
                  isDayBooked(day)
                    ? 'bg-green-800 text-white' 
                    : isDayInPast(day)
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        :selectedDay === day
                          ?  'bg-yellow-300'
                          :  'bg-blue-100 hover:bg-blue-200'
                }`}
                onClick={() => !isDayInPast(day) && handleDayClick(day) }
              >
                {day}
              </button>
            ))}
        </div>

        {/* Calendar code for day selection */}
        {selectedDay && (
        
          <div  className="w-full max-w-md mt-4">
            <h3 className='mb-4 text-xl'>
              Available Time Slots for {months[currentMonth]} {selectedDay}, {currentYear}
            </h3>
            <div className="grid grid-cols-9 gap-4 " ref={slotInfoRef}>
                {generateTimeSlots().map((slot) => {
                  const booking = isTimeSlotBooked(selectedDay, slot);
                   
                  return (
                    <div key={slot} className="timeslot-container">
                      <button
                        className={`p-2 w-12 rounded-lg  text-sm ${
                          booking ? 'bg-red-500 text-white' 
                                  : selectedTimeSlot === slot 
                                    ? 'bg-yellow-300'
                                    : 'bg-green-100 hover:bg-green-200'
                                 }`}
                        onClick={() => handleDaySelection(slot) }        
                        disabled={!!booking}
                        
                        // title={booking ? renderTooltip(booking) : ""}
                      >
                        {slot}
                      </button>
                       {/* Custom Tooltip */}
                      {booking && (
                        <div className="tooltip-container">
                          <span className="tooltip-text">
                            {`Booked by ${booking.patient.name} ${booking.patient.familyName}`}
                          </span>
                        </div>
                      )}
                      
                  </div>                
                )
              })}
     
            </div>
          </div>
          )
        }
          {/* Patient Info Input Form */}
           {/* {selectedTimeSlot && submitted &&  (    
                   <div className="mt-4 mb-4 ml-5 text-xl patient-info"> 
                    <button className='mb-5' onClick={() => handleTimeSlotBooking(selectedTimeSlot)}>Confirm Booking
                    </button>
                   </div>
                 
                )} 
            */}
            <div>
             {selectedTimeSlot && submitted  && handleTimeSlotBooking(selectedTimeSlot)}
             </div>
            
       </div> 
      )
    
    
    
};

export default Calendar;



 


