import mongoose from 'mongoose'
const AppointmentSchema = new mongoose.Schema({
  name: String,
  speciality: String,
  degree: String,
  image: String,
  appointment:[{type: mongoose.Schema.Type.objectId, ref: "users"}] 

})

export default  mongoose.model('Appointment', AppointmentSchema)
 