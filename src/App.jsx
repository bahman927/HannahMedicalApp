import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Doctors from './pages/Doctors'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import About from './pages/About'
import Contact  from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Navbar  from './components/Navbar'
import Appointment from './pages/Appointment'
import SearchPatient from './pages/SearchPatients'
import AppContextProvider from "./context/myContext"
import Footer from "./components/Footer"

 const App = () => {
   return (
     <div className='mx-4 sm:mx-[10%]'>
      <BrowserRouter>
        <AppContextProvider>
           {/* <Calendar /> */}
            <Navbar />
            <Routes>
              <Route path='/'          element={<Home />}/>
              <Route path='/doctors'   element={<Doctors />}/>
              <Route path='/doctors/:speciality' element={<Doctors />}/>
              <Route path='/login'     element={<Login />}/>
              <Route path='/signUp'    element={<SignUp />}/>
              <Route path='/search'    element={<SearchPatient />}/>
              <Route path='/about'     element={<About />}/>
              <Route path='/myProfile' element={<MyProfile />}/>
              <Route path='/contact'   element={<Contact />}/>
              <Route path='/myAppointments'   element={<MyAppointments />} />
              <Route path='/appointment/:docId'   element={<Appointment />} /> 
            </Routes>
            <Footer />
        </AppContextProvider>
      </BrowserRouter>
     </div>
   )
 }
 
 export default App
 