import { useState } from 'react';
import Modal from 'react-modal';
import Navbar from '../components/Navbar/Navbar';
import '../App.css'; // Asegúrate de tener estilos para el modal aquí
import { useEffect } from 'react';
import axios from 'axios';

Modal.setAppElement('#root');

function Home() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const [upcomingAppointments, setUpcomingAppointments] = useState([]);

    useEffect(() => {
        const fetchUpcomingAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:5156/api/Appointment');
                
                if (Array.isArray(response.data.Data)) {
                    const activeAppointments = response.data.Data.filter(cita => cita.StatusName.toLowerCase() === 'agendada');
                    const sortedAppointments = activeAppointments.sort((a, b) => new Date(a.AppoinmentDate) - new Date(b.AppoinmentDate));
                    const topThreeAppointments = sortedAppointments.slice(0, 3);

                    setUpcomingAppointments(topThreeAppointments);
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
            <Navbar />
            <div className="w-full min-h-screen flex flex-col pt-4">
                <div className="flex-1 bg-gradient-to-r from-green-500 to-[#ffffff] p-6 rounded-lg shadow-md text-white">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl font-extrabold mb-2 font-sans pb-3">¡Bienvenido nuevamente!</h2>
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
                                            <div className="font-medium">{new Date(appointment.AppoinmentDate).toLocaleDateString('es-ES')}</div>
                                            <div className="text-sm text-gray-500">{new Date(appointment.AppoinmentDate).toLocaleTimeString('es-ES')}</div>
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
                    <form>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="block text-gray-700 w-1/3">Nutriólog</label>
                            <select
                                className="w-2/3 px-4 py-2 bg-transparent border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Elige el médico</option>
                                <option value="Gaspar Gonzalez Mooh">Gaspar Gonzalez Mooh</option>
                                <option value="Ana Polanco Rodriguez">Ana Polanco Rodriguez</option>
                                <option value="William Flores Chuc">William Flores Chuc</option>
                            </select>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="block text-gray-700 w-1/3">Nombre del paciente</label>
                            <input
                                className="w-2/3 border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type='text'
                                required
                            />
                        </div>
                        <div className='mb-2 flex items-center'>
                            <label className="block text-gray-700 w-1/3">Hora Inicial</label>
                            <div className="flex">
                                <input
                                    type="time"
                                    name="startTime"
                                    className="rounded-none rounded-s-xl bg-gray-50 w-auto border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="09:00"
                                    max="18:00"
                                    required
                                />
                            </div>
                        </div>
                        <div className='mb-2 flex items-center'>
                            <label className="block text-gray-700 w-1/3">Hora Final</label>
                            <div className="flex">
                                <input
                                    type="time"
                                    name="endTime"
                                    className="rounded-none rounded-s-xl bg-gray-50 w-auto border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="09:00"
                                    max="18:00"
                                    required
                                />
                            </div>
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
                                type="button"
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