import React, { useState, useEffect } from 'react';
import { getAppointments, deleteAppointment } from '../services/appointmentService';
import { useAuth } from '../context/AuthContext';

const AppointmentManager = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const data = await getAppointments(user.token);
            setAppointments(data);
        };

        fetchAppointments();
    }, [user.token]);

    const handleDelete = async (appointmentId) => {
        await deleteAppointment(appointmentId, user.token);
        setAppointments(appointments.filter((app) => app._id !== appointmentId));
    };

    return (
        <div>
            <h2>Your Appointments</h2>
            {appointments.map((appointment) => (
                <div key={appointment._id}>
                    <p>Doctor: {appointment.doctor.name}</p>
                    <p>Date: {appointment.date}</p>
                    <p>Time: {appointment.time}</p>
                    {user.role !== 'admin' && user._id === appointment.patient && (
                        <button onClick={() => handleDelete(appointment._id)}>Delete</button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AppointmentManager;
