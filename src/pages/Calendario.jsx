import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import Modal from 'react-modal';
import Navbar from '../components/Navbar/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import axios from 'axios';
import { useState, useCallback, useEffect } from 'react';
import '../App.css';

Modal.setAppElement('#root');

const Calendario = () => {
    const localizer = dayjsLocalizer(dayjs);
    const [events, setEvents] = useState([]);
    const [modalState, setModalState] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventDetails, setEventDetails] = useState(null);

    // Estado del formulario
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startTime: '09:00',
        endTime: '10:00',
        date: null,
        doctor: '',
        patientName: ''
    });

    // Función para obtener el token desde localStorage
    const getToken = () => {
        return localStorage.getItem('Token');
    };

    useEffect(() => {
        // Cargar eventos desde la API al inicio
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5156/api/Appointment');
                console.log('Response data:', response.data); // Verifica la estructura de los datos

                // Verifica si response.data tiene una propiedad Data
                const fetchedEvents = response.data.Data ? response.data.Data.map(event => ({
                    ...event,
                    id: event.Id, // Agregar el id del evento
                    title: event.StatusName,
                    start: new Date(event.AppoinmentDate),
                    end: new Date(event.AppoinmentDate)
                })) : [];

                setEvents(fetchedEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);

    const handleSelectedEvent = async (event) => {
        setSelectedEvent(event);
        setModalState(true);
        // Realiza la solicitud GET a la API para obtener los detalles del evento
        try {
            const response = await axios.get(`http://localhost:5156/api/Appointment?Id=${event.id}`);
            if (response.data.Data && response.data.Data.length > 0) {
                setEventDetails(response.data.Data[0]);
                // Verifica los detalles del evento
            } else {
                console.error("No event details found");
                setEventDetails(null);
            }
        } catch (error) {
            console.error("Error fetching event details:", error);
            setEventDetails(null);
        }
    };

    // Función para actualizar el estado de la cita
    const updateAppointmentStatus = async (id, status) => {
        const url = `http://localhost:5156/api/Appointment/${id}/status/${status}`;
        const token = getToken();

        try {
            const response = await axios.put(url, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                alert(`Cita marcada como ${status}`);

                // Actualiza el estado del evento en la lista de eventos
                const updatedEvents = events.map(event =>
                    event.id === id ? { ...event, title: status } : event
                );
                setEvents(updatedEvents);
                closeModal();
            }
        } catch (error) {
            console.error('Error al actualizar el estado de la cita:', error);
            alert('Hubo un error al actualizar el estado de la cita.');
        }
    };

    // Manejadores de eventos
    const handleConcluded = (id) => updateAppointmentStatus(id, 'Concluded');
    const handleLoss = (id) => updateAppointmentStatus(id, 'Loss');
    const handleRescheduled = (id) => updateAppointmentStatus(id, 'ReScheduled');

    const handleSelectSlot = (slotInfo) => {
        setFormData({
            ...formData,
            date: slotInfo.start
        });
        setSelectedEvent(null);
        setModalState(true);
    };

    const closeModal = () => {
        setModalState(false);
        setSelectedEvent(null);
        setFormData({
            title: '',
            description: '',
            startTime: '09:00',
            endTime: '10:00',
            date: null,
            doctor: '',
            patientName: ''
        });
    };

    // const handleAddEvent = () => {
    //     const newEvent = {
    //         title: formData.title,
    //         description: formData.description,
    //         start: dayjs(formData.date).set('hour', parseInt(formData.startTime.split(':')[0])).set('minute', parseInt(formData.startTime.split(':')[1])).toDate(),
    //         end: dayjs(formData.date).set('hour', parseInt(formData.endTime.split(':')[0])).set('minute', parseInt(formData.endTime.split(':')[1])).toDate(),
    //     };
    //     setEvents([...events, newEvent]);
    //     closeModal();
    // };

    // const handleCancelEvent = () => {
    //     const updatedEvents = events.map(event =>
    //         event === selectedEvent ? { ...event, title: `${event.title} (Cancelado)` } : event
    //     );
    //     setEvents(updatedEvents);
    //     closeModal();
    // };

    const ModalContent = useCallback(() => (
        <div className="p-4 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
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
            {selectedEvent ? (
                <>
                    {eventDetails ? (
                        <>
                            <h2 className="text-xl font-semibold mb-4">Detalles de la cita</h2>
                            <p className="mb-4">Paciente: {eventDetails.PatientFullName}</p>
                            <p className="mb-4">Nutriólogo: {eventDetails.DoctorFullName}</p>
                            <p className="mb-4">Consultorio: {eventDetails.ConsultoryName}</p>
                            <p className="mb-4">Fecha: {new Date(eventDetails.AppoinmentDate).toLocaleString()}</p>
                            <div className="flex justify-evenly mt-2">
                                <button onClick={() => handleConcluded(eventDetails.Id)} className="w-28 bg-green-500 text-white py-2 rounded hover:bg-green-600">
                                    Concluida
                                </button>
                                <button onClick={() => handleLoss(eventDetails.Id)} className="w-28 bg-red-500 text-white py-2 rounded hover:bg-red-600">
                                    Perdida
                                </button>
                                <button onClick={() => handleRescheduled(eventDetails.Id)} className="w-28 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
                                    Reagendar Cita
                                </button>
                            </div>
                        </>
                    ) : (
                        <p>No se encontraron detalles del evento.</p>
                    )}
                </>
            ) : (
                <>
                    <h2 className="text-xl font-semibold mb-4">Agregar Cita</h2>
                    <form>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="block text-gray-700 w-1/3">Título</label>
                            <input
                                className="w-2/3 border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type='text'
                                name="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="block text-gray-700 w-1/3">Médico</label>
                            <select
                                name="doctor"
                                className="w-2/3 px-4 py-2 bg-transparent border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.doctor}
                                onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
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
                                name="patientName"
                                value={formData.patientName}
                                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="block text-gray-700 w-1/3">Descripción</label>
                            <textarea
                                className="w-2/3 h-1/2 border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Escribe la descripción aquí..."
                                rows={3}
                                name="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </div>
                        <div className='mb-2 flex items-center'>
                            <label className="block text-gray-700 w-1/3">Hora inicial</label>
                            <div className="flex">
                                <input
                                    type="time"
                                    name="startTime"
                                    className="rounded-none rounded-s-xl bg-gray-50 w-auto border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="09:00"
                                    max="18:00"
                                    value={formData.startTime}
                                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className='mb-2 flex items-center'>
                            <label className="block text-gray-700 w-1/3">Hora final</label>
                            <div className="flex">
                                <input
                                    type="time"
                                    name="endTime"
                                    className="rounded-none rounded-s-xl bg-gray-50 w-auto border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="09:00"
                                    max="18:00"
                                    value={formData.endTime}
                                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                />
                            </div>
                        </div>
                        <button
                            type="button"

                            className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600"
                        >
                            Agregar Cita
                        </button>
                    </form>
                </>
            )}
        </div>
    ), [closeModal, formData, selectedEvent, eventDetails]);

    return (
        <>
            <Navbar />
            <div className='flex flex-col items-center justify-center min-h-screen'>
                <div className='w-full max-w-4xl bg-white border-4 border-gray-100 rounded-lg shadow-lg p-6'>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        style={{ height: 500 }}
                        selectable
                        onSelectSlot={handleSelectSlot}
                        onSelectEvent={handleSelectedEvent}
                    />
                </div>
                <Modal
                    isOpen={modalState}
                    onRequestClose={closeModal}
                    className="modal-content"
                    overlayClassName="modal-overlay"
                    contentLabel="Event Modal"
                >
                    <ModalContent />
                </Modal>
            </div>
        </>
    );
};

export default Calendario;