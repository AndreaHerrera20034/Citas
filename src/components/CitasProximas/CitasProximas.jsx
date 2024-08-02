import { useState } from 'react';
import Modal from 'react-modal';
import { useEffect } from 'react';
import axios from 'axios';

Modal.setAppElement('#root');

const CitasProximas= ()=> {

    const [upcomingAppointments, setUpcomingAppointments] = useState([]);

    useEffect(() => {
        const fetchUpcomingAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:5156/api/Appointment');
                // console.log('API Response:', response.data); // Verifica la respuesta completa de la API
                
                // Verifica si response.data.Data es un array
                if (Array.isArray(response.data.Data)) {
                    // Ordenar las citas por fecha en orden ascendente
                    const sortedAppointments = response.data.Data.sort((a, b) => new Date(a.AppoinmentDate) - new Date(b.AppoinmentDate));

                    // Seleccionar solo las 3 más próximas
                    const topThreeAppointments = sortedAppointments.slice(0, 3);

                    setUpcomingAppointments(topThreeAppointments); // Ajustar el estado con las citas filtradas
                } else {
                    console.error('La respuesta de la API no contiene un array en response.data.Data');
                }
            } catch (error) {
                console.error('Error fetching upcoming appointments:', error);
            }
        };

        fetchUpcomingAppointments();
    }, []);

    return (
        <>
                <div className="px-4 md:px-6 lg:px-8 py-8 flex-1">
                    <h2 className="text-2xl font-bold mb-4">Próximas citas</h2>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left p-2">Nutriólogo</th>
                                    <th className="text-left p-2">Fecha/Hora</th>
                                    <th className="text-left p-2">Consultorio</th>
                                </tr>
                            </thead>
                            <tbody>
                            {upcomingAppointments.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="text-center p-2">No hay citas próximas.</td>
                                    </tr>
                                )}
                                {upcomingAppointments.map((appointment) => (
                                    <tr className="border-t" key={appointment.Id}>
                                        <td className="p-2">
                                            <div className="flex items-center gap-2">
                                                <div>
                                                    <div className="font-medium">{appointment.DoctorFullName}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="font-medium">{new Date(appointment.AppoinmentDate).toLocaleDateString()}</div>
                                            <div className="text-sm text-gray-500">{new Date(appointment.AppoinmentDate).toLocaleTimeString()}</div>
                                        </td>
                                        <td className="p-2">
                                            <div>
                                                <span className="inline-block align-middle">{appointment.ConsultoryName}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
        </>
    );
}

export default CitasProximas;