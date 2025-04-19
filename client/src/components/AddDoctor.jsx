import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddDoctor.css"
const specialities = [
  'Family Medicine',
  'Cardiology',
  'Dermatology',
  'Pediatrics',
  'Orthopedics',
  'Neurology',
  'Psychiatry',
  'Gynecology',
  'Urology',
];
const AddDoctor = () => {
  const [doctor, setDoctor] = useState({
    docId: "",
    name: "",
    email: "",
    password: "",
    speciality: "",
    experience: "",
    bio: "",
    image: "",
    status: "active", 
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("doctor : ", doctor)
    try {
      const response = await fetch("http://localhost:3000/api/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(doctor),
      });
          const data = response.json()
          console.log("data -> addDoctor : ", data)
      if (response.ok) {
        alert("Doctor added successfully");
        navigate("/");
      } else {
        alert("Error adding doctor");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="add-doctor">
      <h2>Add Doctor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>DocId:</label>
          <input
            type="text"
            name="docId"
            value= {doctor.docId || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value= {doctor.name || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
         <label>Password</label>
         <input type="password" name="password" value={doctor.password} onChange={handleInputChange}
          className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value= {doctor.email || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Specialization:</label>
          <select
          name="speciality"
          value={doctor.speciality || ""}
          onChange={handleInputChange}
          className="w-full p-3 m-1 mb-2 border rounded"
          required
        >
          <option value="">Select speciality</option>
          {specialities.map((spec) => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
          {/* <input
            type="text"
            name="speciality"
            value= {doctor.speciality || ""}
            onChange={handleInputChange}
            required
          /> */}
        </div>
        <div>
          <label>Experience:</label>
          <input
            type="text"
            name="experience"
            value= {doctor.experience || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Bio:</label>
          <input
            type="text"
            name="Bio"
            value= {doctor.bio || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value= {doctor.image || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={doctor.status || ""}
           onChange={handleInputChange} >
           <option value="active">Active</option>
           <option value="inactive">Disabled</option>
         </select>
          
        </div>
        <br />
        <button type="submit">Add Doctor</button>
      </form>
    </div>
  
  );
};

export default AddDoctor;