import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home             from "./pages/Home.jsx"
import Doctors          from './pages/doctors.jsx'
import SignUp           from './pages/SignUp.jsx'
import Login            from './pages/Login.jsx'
import About            from './pages/About.jsx'
import Contact          from './pages/Contact.jsx'
import MyAppointment    from './pages/MyAppointment.jsx'
import Appointment      from './pages/Appointment.jsx'
import Navbar           from './components/Navbar.jsx'
import SearchPatient    from './pages/SearchPatients.jsx'
import { AuthProvider } from "./context/AuthContext"
import Footer           from "./components/Footer.jsx"

 const App = () => {
   return (
     <div className='mx-4 sm:mx-[10%]'>
      <BrowserRouter>
         <AuthProvider>
            <Navbar />
            <Routes>
              <Route path='/'                    element={<Home />}/>
              <Route path='/doctors'             element={<Doctors />}/>
              <Route path='/doctors/:speciality' element={<Doctors />} />
              <Route path='/login'               element={<Login />}/>
              <Route path='/signUp'              element={<SignUp />}/>
              
              <Route path='/search'              element={<SearchPatient />}/>
              <Route path='/about'               element={<About />}/>
              <Route path='/myAppointment'       element={<MyAppointment />}/>
              <Route path='/contact'             element={<Contact />}/>
              
              <Route path='/appointment/:docId'  element={<Appointment />} /> 
            </Routes>
            <Footer />
         </AuthProvider>
      </BrowserRouter>
     </div>
   )
 }
 
 export default App
 