import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Navbar from '../components/Navbar/Navbar';   
import CitasProximas from '../components/CitasProximas/CitasProximas'                                      
import '../App.css';
import axios from 'axios';  // Importa Axios
import { jwtDecode } from "jwt-decode";

Modal.setAppElement('#root');

function Home() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [consultories, setConsultories] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedConsultory, setSelectedConsultory] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [patient, setPatient] = useState({ name: '', email: '' });


    useEffect(() => {
        // Obtener y decodificar el token del localStorage
        const token = localStorage.getItem('Token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
    
                // Accede a los datos específicos del token
                const patientName = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
                const patientEmail = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
                // Aquí puedes añadir otros datos si es necesario
    
                // Actualiza el estado con el nombre del paciente
                setPatient({ name: patientName, email: patientEmail });  // Ajusta esto según la estructura de tu estado
            } catch (error) {
                console.error('Error decodificando el token:', error);
            }
        }
    
        fetchDoctors();
        fetchConsultories();
    }, []);
    

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:5156/api/UserAccount');
            const data = response.data;
            console.log('Fetched Doctors Data:', data);

            if (data && Array.isArray(data.Data)) {
                const filteredDoctors = data.Data.filter(doctor => doctor.AccountType === 1);
                console.log('Filtered Doctors:', filteredDoctors);
                setDoctors(filteredDoctors);
            } else {
                console.error('Doctors data is not an array:', data);
            }
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const fetchConsultories = async () => {
        try {
            const response = await axios.get('http://localhost:5156/api/Consultory');
            const data = response.data;
            console.log('Fetched Consultories Data:', data);

            if (data && Array.isArray(data.Data)) {
                setConsultories(data.Data);
            } else {
                console.error('Consultories data is not an array:', data);
            }
        } catch (error) {
            console.error('Error fetching consultories:', error);
        }
    };

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleDateChange = (e) => {
        setAppointmentDate(e.target.value);
    };

    const handleTimeChange = (e) => {
        setAppointmentTime(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}:00Z`).toISOString();
        console.log('Appointment DateTime:', appointmentDateTime);

        // Aquí puedes hacer la llamada a la API para agregar la cita, usando `appointmentDateTime`
    };

    return (
        <>
            <Navbar />
            <div className="w-full min-h-screen flex flex-col pt-4">
                <div className="flex-1 bg-gradient-to-r from-green-500 to-[#ffffff] p-6 rounded-lg shadow-md text-white">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl font-extrabold mb-2 font-sans pb-3">¡Bienvenido nuevamente, {patient.name}!</h2>
                        <p className="text-xl font-semibold">¿Qué te gustaría hacer el día de hoy?</p>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={openModal}
                            className="flex items-center gap-2 bg-[#0a8537] text-white px-4 py-2 rounded font-semibold"
                        >
                            <span className='font-bold text-xl'>+</span> Agregar nueva cita
                        </button>
                    </div>
                </div>
                <CitasProximas></CitasProximas>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="modal-content"
                overlayClassName="modal-overlay"
                contentLabel="Agregar nueva cita"
            >
                <div className="p-4 bg-white rounded-lg shadow-lg max-w-lg mx-auto relative">
                    <button
                        onClick={closeModal}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 className="text-xl font-semibold mb-4">Agregar Cita</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="block text-gray-700 w-1/3">Nutriólogo</label>
                            <select
                                className="w-2/3 px-4 py-2 bg-transparent border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={selectedDoctor}
                                onChange={(e) => setSelectedDoctor(e.target.value)}
                                required
                            >
                                <option value="">Elige el médico</option>
                                {doctors.length > 0 ? (
                                    doctors.map((doctor) => (
                                        <option key={doctor.Id} value={doctor.Id}>
                                            {doctor.UserName}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">No hay doctores disponibles</option>
                                )}
                            </select>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="block text-gray-700 w-1/3">Paciente</label>
                            <input
                                className="w-2/3 border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                                type='text'
                                value={patient.name}
                                readOnly
                            />
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="block text-gray-700 w-1/3">Consultorio</label>
                            <select
                                className="w-2/3 px-4 py-2 bg-transparent border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={selectedConsultory}
                                onChange={(e) => setSelectedConsultory(e.target.value)}
                                required
                            >
                                <option value="">Elige el consultorio</option>
                                {consultories.length > 0 ? (
                                    consultories.map((consultory) => (
                                        <option key={consultory.Id} value={consultory.Id}>
                                            {consultory.Name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">No hay consultorios disponibles</option>
                                )}
                            </select>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="block text-gray-700 w-1/3">Fecha</label>
                            <input
                                className="w-2/3 border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type='date'
                                value={appointmentDate}
                                onChange={handleDateChange}
                                required
                            />
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="block text-gray-700 w-1/3">Hora</label>
                            <input
                                className="w-2/3 border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type='time'
                                value={appointmentTime}
                                onChange={handleTimeChange}
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="mr-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Agregar Evento
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}

export default Home;
