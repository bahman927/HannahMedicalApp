import mongoose  from 'mongoose';

const doctorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    docId: { type: String, required: true, },
    name: { type: String, required: true, },
    speciality: {type: String, required: true, },
    experience: {type: Number, required: true},
    image: {type: String},
    status: { type: String, enum: [ "active", "inactive"], default: "active"},
    bio: String,
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', }],
});
doctorSchema.index({ userId: 1 });
export default mongoose.model('Doctor', doctorSchema);
