import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([])
  // const [doctor, setDoctor] = useState({
  //   name: "",
  //   specialization: "",
  //   experience: "",
  //   image: "",
  //   status: ""
  // });
  const navigate = useNavigate();
  const {id} = useParams()
  const { name,  role } = useContext(AuthContext); // Get current user (should be admin)
  
  // Fetch doctors data
  useEffect(() => {
    const fetchDoctors = async () => {
    try {
      const response = await fetch("https://hannahmedicalapi.onrender.com/api/doctors", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch doctor data");
      if (response.ok) {
        const data = await response.json();
        console.log('data in adminDashboard : ', data)
        setDoctors(data);
      } else {
        alert("Error fetching doctors");
      }
    } catch (error) {
      console.error("Error fetching doctor:", error);
    }
  };

    if (role === "admin") {
      fetchDoctors();
    }
  }, [name]);


  const handleEditDoctor = (doctorId) => {
    navigate(`/edit-doctor/${doctorId}`);
  };

  return (
    <div className="admin-dashboard">
      <h2>Doctors Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th> </th>
            <th> Doctor Id</th>
            <th> Name</th>
            <th>Specialization</th>
            <th> Years experience</th>
            <th> status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor._id}>
              <td> <img 
          src={doctor.image || "/default-doctor.png"}  
          alt={doctor.name} 
          className="doctor-image"
        /></td>
              <td>{doctor.docId}</td>
              <td>{doctor.name}</td>
              <td>{doctor.speciality}</td>
              <td>{doctor.experience}</td>
              <td>{doctor.status}</td>
              <td>
                <button onClick={() => handleEditDoctor(doctor._id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
