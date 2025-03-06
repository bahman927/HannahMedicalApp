// import contactImage from '/images/contact.jpg'
import React from 'react'
const contact = () => {
  return (
    <div>
       <div className='pt-10 mb-10 text-2xl text-center text-gray-500'>
        <p>  Contact <span className='font-medium text-gray-800'>US</span></p>
       </div>
     
       <div className='flex justify-center flex-col-2 md:flex-row'>
         <div>
           <img  className='mr-10 w-96' src='/images/contact.jpg' alt="" />
         </div>
         <div>
          <p className='mt-10 mb-5 text-2xl'> Our Office</p>
          <p> Address: 1099-9470 Yonge Street, <br />Richmond Hill, ON Canada</p>
          <p> Tel: 1-(947)-635-6509</p>
          <p> Email: hanna.hadipour@gmail.com</p>
         </div>
       </div>
     
 
      
    </div>
  )
}

export default contact
