import  { useState} from 'react';

const SearchPatients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchSubmitted, setSearchSubmitted] = useState(false) 
  const [bookedDays, setBookedDays] = useState({});
  const [selectedDoctor, setSelectedDoctor] = useState('');
  
  const doctors =  ['Dr. Mina James','Dr. Ben Hyvard','Dr. Hennry ofss','Dr. Albert Robin','Dr. Frank Starr',
                    'Dr. David Starr','Dr. Marry Tagg','Dr. Elli Oniel','Dr. Hannah Pertain','Dr. Anni Arton']
   let dayBookings = [] 

    const handleCancelAppointment = (appointmentToCancel, selectedDay) => {

          const confirmed = window.confirm("Are you sure you want to cancel this appointment?");
          if (!confirmed) return;

          const updatedAppointments = dayBookings[selectedDay].filter(
            (appointment) => appointment.timeSlot !== appointmentToCancel.timeSlot
          );
    
          // Update the state
          setBookedDays((prevState) => {
            const updatedState = { ...prevState };
            updatedState[selectedDoctor][currentYear][currentMonth][selectedDay] = updatedAppointments;
            return updatedState;
          });
    
         localStorage.setItem(`bookedDays_${selectedDoctor}`, JSON.stringify(updatedState));
    };

    const handleInputChange = (e) => {
      setSearchQuery(e.target.value);
      setSearchSubmitted(false);
      setSearchResults([]) // Reset searchSubmitted to false when typing starts
    };
    
  const handleSearch = () => {
      let results = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        // const key = localStorage.key(i);
  
       // Check if the key belongs to a doctor's booked days (assuming the pattern `bookedDays_DoctorName`)
        // if (key.startsWith('bookedDays_')) {
        //   const doctorName = key.replace('bookedDays_', ''); // Extract doctor's name
        //   const doctorPatients = JSON.parse(localStorage.getItem(key)) || {};
      
          doctors.forEach(doctor => {
            const doctorPatients = JSON.parse(localStorage.getItem(`bookedDays_${doctor}`)) || {};
            Object.keys(doctorPatients).forEach(year => {
              Object.keys(doctorPatients[year]).forEach(month => {
                Object.keys(doctorPatients[year][month]).forEach(day => {
                    dayBookings = doctorPatients[year][month][day];
                  Object.keys(dayBookings).forEach((dayKey) => {
                    const bookingsArray = dayBookings[dayKey];
                    
                    if (Array.isArray(bookingsArray)) { 
                      // console.log('bookingsArray = ', bookingsArray)
                      bookingsArray.forEach(slot =>{
                        if (slot.patient && 
                          (slot.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          slot.patient.familyName.toLowerCase().includes(searchQuery.toLowerCase())) 
                        ){
                          results.push({
                            doctor,
                            date: `${day}/${month}/${year}`,
                            slot,
                          });
                         }
                      });
                    }

                  });
                });
              })
            })
          })
 
          setSearchResults(results);
          // if (results) setSearchSubmitted(true);
          results ? setSearchSubmitted(true):setSearchSubmitted(false)
          results= []

        }
    
     }
     
    return (
    <div className="p-4">
      <input
        type="text"
        className="border p-2 w-64 rounded mr-5 ml-96"
        placeholder="Search by name, family, or phone"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded mt-2 w-24"
        onClick={() => handleSearch()}
      >
        Search
      </button>

      {searchResults.length > 0 && (
        <ul className="mt-4 border p-4 rounded ">
          {searchResults.map((result, index) => (
            <li key={index} className="p-2 border-b mt-4 mb-4">
              <strong>Doctor:</strong> {result.doctor} <br />
              <strong>Date:</strong> {result.date} <br />
              <strong>Time Slot:</strong> {result.slot.timeSlot} <br />
              <strong>Patient:</strong> {result.slot.patient.name } {result.slot.patient.familyName} <br />
              <button 
                onClick={() => handleCancelAppointment(result.slot.timeSlot, result.day)} 
                className="">
                Cancel Appointmant
              </button>
            </li>
          ))}
        </ul>
      )}
      {searchResults.length === 0 && searchQuery && searchSubmitted && (
        <p className="mt-10 ml-96 text-red-500">No results found</p>
      )}
    </div>
  ); 
}
export default SearchPatients;
