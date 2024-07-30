import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import Modal from 'react-modal';
import Navbar from '../components/Navbar/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import { useState, useCallback } from 'react';
import '../App.css';

Modal.setAppElement('#root');

const Calendario = () => {
    const localizer = dayjsLocalizer(dayjs);
    const [events, setEvents] = useState([
        {
            start: dayjs('2024-07-28T04:00:00').toDate(),
            end: dayjs('2024-07-28T05:40:00').toDate(),
            title: "Cita 1",
            description: "Descripción de la cita 1"
        }
    ]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalState, setModalState] = useState(false);
    const [newEventTitle, setNewEventTitle] = useState('');
    const [newEventDescription, setNewEventDescription] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [patientName, setPatientName] = useState('');

    const handleSelectSlot = (slotInfo) => {
        setSelectedDate(slotInfo.start);
        setSelectedEvent(null);
        setModalState(true);
    };

    const handleSelectedEvent = (event) => {
        setSelectedEvent(event);
        setModalState(true);
    };

    const closeModal = () => {
        setModalState(false);
        setSelectedEvent(null);
        setNewEventTitle('');
        setNewEventDescription('');
        setSelectedDate(null);
        setSelectedDoctor('');
        setPatientName('');
    };

    const handleAddEvent = () => {
        const newEvent = {
            title: newEventTitle,
            description: newEventDescription,
            start: dayjs(selectedDate).toDate(),
            end: dayjs(selectedDate).add(1, 'hour').toDate(),
        };
        setEvents([...events, newEvent]);
        closeModal();
    };

    const handleCancelEvent = () => {
        const updatedEvents = events.map(event =>
            event === selectedEvent ? { ...event, title: `${event.title} (Cancelado)` } : event
        );
        setEvents(updatedEvents);
        closeModal();
    };

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
                    <h2 className="text-xl font-semibold mb-4">Detalles de la cita</h2>
                    <p className="mb-4">Título: {selectedEvent.title}</p>
                    <p className="mb-4">Descripción: {selectedEvent.description}</p>
                    <p className="mb-4">Fecha: {dayjs(selectedEvent.start).format('YYYY-MM-DD HH:mm')}</p>
                    <button onClick={handleCancelEvent} className="w-full bg-red-500 text-white py-2 rounded mt-4 hover:bg-red-600">
                        Cancelar Cita
                    </button>
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
                                value={newEventTitle}
                                onChange={(e) => setNewEventTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="block text-gray-700 w-1/3">Médico</label>
                            <select
                                className="w-2/3 px-4 py-2 bg-transparent border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={selectedDoctor}
                                onChange={(e) => setSelectedDoctor(e.target.value)}
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
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="block text-gray-700 w-1/3">Descripción</label>
                            <textarea
                                className="w-2/3 h-1/2 border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Escribe la descripción aquí..."
                                rows={3}
                                value={newEventDescription}
                                onChange={(e) => setNewEventDescription(e.target.value)}
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
                                type="button"
                                onClick={handleAddEvent}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Agregar Evento
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    ), [selectedEvent, newEventTitle, newEventDescription, selectedDate, selectedDoctor, patientName]);

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
