import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditDoctor.css";

const EditDoctor = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState({
    name: "",
    speciality: "",
    experience: "",
    bio: "",
    image: "",
    status: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      const response = await fetch(`https://www-promedicalclinic-com.onrender.com/api/doctors/${doctorId}`, {
       credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setDoctor(data);
      } else {
        alert("Error fetching doctor data");
      }
    };

    fetchDoctor();
  }, [doctorId]);

  const handleInputChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleUpdateDoctor = async (e) => {
    e.preventDefault();
    
    const response = await fetch(`https://www-promedicalclinic-com.onrender.com/api/doctors/${doctorId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(doctor),
    });

    if (response.ok) {
      alert("Doctor updated successfully");
      navigate("/admin-dashboard");
    } else {
      alert("Error updating doctor");
    }
  };

  return (
    <div className="edit-doctor">
      <h2>Edit Doctor</h2>
      <form onSubmit={handleUpdateDoctor}>
        <div>
          <label>Doctor ID:</label>
          <input
            type="text"
            name="docId"
            value={doctor.docId || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={doctor.name || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Speciality:</label>
          <input
            type="text"
            name="speciality"
            value={doctor.speciality || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Bio:</label>
          <input
            type="text"
            name="Bio"
            value={doctor.bio || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={doctor.image || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={doctor.status || ""}
           onChange={handleInputChange}
  >
           <option value="active">Active</option>
           <option value="disabled">Disabled</option>
         </select>
          
        </div>
        <br />
        <button type="submit">Update Doctor</button>
      </form>
    </div>
  );
};

export default EditDoctor;
