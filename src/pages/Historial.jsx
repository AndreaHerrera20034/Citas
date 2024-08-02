import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios';
import '../App.css';

const Historial = () => {
    const [activeTab, setActiveTab] = useState('activas');
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:5156/api/Appointment');
                const fetchedAppointments = response.data.Data;

                // Ajustar citas
                const adjustedAppointments = fetchedAppointments.map(cita => {
                    let categoria;
                    switch (cita.StatusName.toLowerCase()) {
                        case 'agendada':
                            categoria = 'activas';
                            break;
                        case 'concluida':
                            categoria = 'concluidas';
                            break;
                        case 'perdida':
                            categoria = 'perdidas';
                            break;
                        case 're-agendada':
                            categoria = 'reagendar';
                            break;
                        default:
                            categoria = 'otras'; // Maneja otras posibles categorías
                    }

                    return {
                        id: cita.Id,
                        titulo: `${cita.DoctorFullName} - ${cita.PatientFullName}`,
                        fecha: new Date(cita.AppoinmentDate).toLocaleDateString('es-ES'),
                        hora: new Date(cita.AppoinmentDate).toLocaleTimeString('es-ES'),
                        categoria,
                        consultoryName: cita.ConsultoryName
                    };
                });

                // console.log('Adjusted Appointments:', adjustedAppointments); // Verifica las citas ajustadas
                setAppointments(adjustedAppointments);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    const filterAppointments = (status) => {
        return appointments.filter(appointment => appointment.categoria === status);
    };

    const renderCitas = (status) => {
        const filteredAppointments = filterAppointments(status);
        // console.log(`Filtered Appointments for ${status}:`, filteredAppointments); // Verifica las citas filtradas
        return filteredAppointments.map(appointment => (
            <div key={appointment.id} className="bg-white p-4 rounded-lg mb-4 shadow-md">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center text-black font-bold">
                            {appointment.titulo.charAt(0)}
                        </div>
                        <div className="ml-3">
                            <h3 className="text-xl text-black font-semibold">
                                {appointment.titulo}
                            </h3>
                            <p className="text-gray-500">
                                {appointment.fecha} - {appointment.hora}
                            </p>
                            <p className="text-gray-500">{appointment.consultoryName}</p>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <>
            <Navbar />
            <div className="p-6">
                <div className="flex space-x-4 mb-4">
                    <button
                        className={`py-2 px-4 ${activeTab === 'activas' ? 'text-VerdeLink border-b-2 border-VerdeLink' : 'text-gray-400'}`}
                        onClick={() => setActiveTab('activas')}
                    >
                        Activas
                    </button>
                    <button
                        className={`py-2 px-4 ${activeTab === 'reagendar' ? 'text-VerdeLink border-b-2 border-VerdeLink' : 'text-gray-400'}`}
                        onClick={() => setActiveTab('reagendar')}
                    >
                        Reagendar
                    </button>
                    <button
                        className={`py-2 px-4 ${activeTab === 'perdidas' ? 'text-VerdeLink border-b-2 border-VerdeLink' : 'text-gray-400'}`}
                        onClick={() => setActiveTab('perdidas')}
                    >
                        Perdidas
                    </button>
                    <button
                        className={`py-2 px-4 ${activeTab === 'concluidas' ? 'text-VerdeLink border-b-2 border-VerdeLink' : 'text-gray-400'}`}
                        onClick={() => setActiveTab('concluidas')}
                    >
                        Concluidas
                    </button>
                </div>
                <div>
                    {activeTab === 'activas' && renderCitas('activas')}
                    {activeTab === 'reagendar' && renderCitas('reagendar')}
                    {activeTab === 'perdidas' && renderCitas('perdidas')}
                    {activeTab === 'concluidas' && renderCitas('concluidas')}
                </div>
            </div>
        </>
    );
};

export default Historial;