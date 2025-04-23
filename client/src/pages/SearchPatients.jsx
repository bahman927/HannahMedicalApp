import React, { useState} from 'react';

const SearchPatients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchSubmitted, setSearchSubmitted] = useState(false) 
  const [bookedDays, setBookedDays] = useState({});
  const [cancelMessage, setCancelMessage] = useState('');
  
  const doctors =  ['Dr. Mina James','Dr. Ben Hyvard','Dr. Hennry ofss','Dr. Albert Robin','Dr. Frank Starr',
                    'Dr. David Starr','Dr. Marry Tagg','Dr. Elli Oniel','Dr. Hannah Pertain','Dr. Anni Arton']
   

    const handleCancelAppointment = (doctorName, date, timeSlot) => {
      const [day, month, year] = date.split('/')
         
          let updatedAppointments = [];
          const confirmed = window.confirm("Are you sure you want to cancel this appointment?");
          if (!confirmed) return;

           const updatedState = JSON.parse(localStorage.getItem(`bookedDays_${doctorName}`)) ;
      
                if (!updatedState[doctorName]) {
                  updatedState[doctorName] = {};
                }
                if (!updatedState[doctorName][year]) {
                  updatedState[doctorName][year] = {};
                }
                if (!updatedState[doctorName][year][month]) {
                  updatedState[doctorName][year][month] = {};
                }
              
                const dayBookings = updatedState[doctorName][year][month][day] || [];

                  if (Array.isArray(dayBookings)) {
                    updatedAppointments = dayBookings.filter(
                    (appointment) => appointment.timeSlot !== timeSlot);
                 } else {
                   console.error(' dayBookings is not an array: ', dayBookings)
                 }    
                   updatedState[doctorName][year][month][day] = updatedAppointments;

                   if (updatedAppointments.length === 0) {
                       delete updatedState[doctorName][year][month][day];
                   }
                  
                   setCancelMessage(`Appointment at ${timeSlot} on ${day}/${month}/${year} has been canceled.` )
                   setTimeout(() => setCancelMessage(''), 6000)

                   setBookedDays(updatedState)
                   localStorage.setItem(`bookedDays_${doctorName}`, JSON.stringify(updatedState));
                   
                   const updatedSearchResults = searchResults.filter(
                    (result) => !(result.doctor === doctorName && result.date === date && result.timeSlot === timeSlot)
                  );
                  setSearchResults(updatedSearchResults);
                  setSearchSubmitted(false)
                  setSearchQuery('')
                             
     }
                
    const handleInputChange = (e) => {
      setSearchQuery(e.target.value);
      setSearchSubmitted(false);
    };
    
    const handleSearch = () => {
      let results = [];  
      // Iterate over all doctors in localStorage
      for (const doctor in localStorage) {
         let doctorName = doctor.substring(11)
        const bookedDays = JSON.parse(localStorage.getItem(`bookedDays_${doctorName}`));
         
        if (bookedDays) {
          // Traverse the structure: year -> month -> day
          for (const doctorName in bookedDays) {

            for (const year in bookedDays[doctorName]) {

              for (const month in bookedDays[doctorName][year]) {

                for (const day in bookedDays[doctorName][year][month]) {

                    const dayBookings = bookedDays[doctorName][year][month][day];
                    if (Array.isArray(dayBookings)) {
                      dayBookings.forEach((booking) => {
                        const { name, familyName} = booking.patient;
                        if (
                          name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          familyName.toLowerCase().includes(searchQuery.toLowerCase()) 
                          // || phone.includes(searchQuery)
                        ) {
                          // Found a match, push to results
                          results.push({
                            doctor: doctorName,
                            date: `${day}/${month}/${year}`,
                            timeSlot: booking.timeSlot,
                            patient: booking.patient
                          });
                        }
                      });
                    }
                }
              }
            }
          }        
        } 
       
      }
      setSearchResults(results);
      searchResults ? setSearchSubmitted(true):setSearchSubmitted(false)
      return searchResults;
    }
         
    return (
    <div className="p-4">
      <input
        type="text"
        className="w-64 p-2 mr-5 border rounded ml-96"
        placeholder="Search by name or familyname"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button
        className="w-24 p-2 mt-2 text-xl text-white bg-blue-500 rounded"
        onClick={() => handleSearch()}
      >
        Search
      </button>
     

      {searchResults.length > 0 && (
        <ul className="p-4 mt-4 border rounded ">
          {searchResults.map((result, index) => (
            
            <li key={index} className="p-2 mt-4 mb-5 text-xl border-b">
              <strong>Doctor:</strong> {result.doctor} <br />
              <strong>Date:</strong> {result.date} <br />
              <strong>Time:</strong> {result.timeSlot} <br />
              <strong>Patient:</strong> {result.patient.name } {result.patient.familyName} <br />
              <button
                onClick={() => handleCancelAppointment(result.doctor, result.date, result.timeSlot)} 
                className="mt-2 text-base rounded-full bg-cyan-100 w-44">
                Cancel Appointmant
              </button>
              
            </li>
          ))}
        </ul>
      )}
        {/* Conditionally render the cancellation message */}
      {cancelMessage && <p className="mt-3 mb-3 text-xl text-red-500">{cancelMessage}</p>}
      {searchResults.length === 0 && searchQuery && searchSubmitted && (
        <p className="mt-10 text-xl text-red-500 ml-96">No results found</p>
      )}
    </div>
  ); 
}
export default SearchPatients;

  