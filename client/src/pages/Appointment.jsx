import React,  { useState, useEffect}  from 'react'
import {useParams}  from 'react-router-dom'
import Calendar from '../pages/Calendar'
import { AuthContext } from "../context/AuthContext";
import {useContext}   from 'react'
 

const Appointment = () => {
  const {docId}  = useParams()
  const {name, doctors, setDrAppointment} = useContext(AuthContext) 
  const [docInfo, setDocInfo] = useState(false)
 
  useEffect(() => {
    const fetchDocInfo = ()=> {
      const drInfo = doctors.find(doc => doc._id == docId)
      if (drInfo)
         setDocInfo(drInfo);
      if (name)
         setDrAppointment(drInfo);
        
      console.log('name = ',name,  ' docInfo = ', docInfo)
    }
      
    fetchDocInfo()
  }, [doctors, docId, docInfo]) 

  return ( 
    docInfo && (
          <div>
            <div className='flex flex-col justify-center gap-4 sm:flex-row mt-14'>
              <div>
                <img className='w-full rounded-lg bg-primary sm:max-w-72' src={docInfo.image}  alt="" />
              </div>
              <div className='flex flex-col border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0' >
                <p className='flex items-center gap-2 text-2xl font-medium text-gray-900' >
                  {docInfo.name}
                </p>
                <div className='flex items-center gap-2 mt-1 text-sm text-gray-600' >
                  <p>{docInfo.degree} - {docInfo.speciality}</p>
                  <button className='px-4 py-1 border rounded-full '> {docInfo.experience} </button>
                </div>
                <div>
                  <p className='text-sm font-semibold text-gray-500 max-w-[700px] mt-1'> {docInfo.about}</p>
                </div>
                <p>
                  Appointment fee : $<span>{docInfo.fees}</span>
                </p>
              </div>
             
            </div>
            <Calendar docName={docInfo.name} docId={docId}/>
          </div>
        )
      
      
      )
      
}

export default Appointment
