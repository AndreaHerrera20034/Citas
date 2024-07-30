import React, { useState } from 'react';
import Modal from 'react-modal';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import Modal from 'react-modal';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import '../App.css'; // Asegúrate de que esta ruta es correcta

// Configura el elemento de la aplicación para Modal
Modal.setAppElement('#root');

const Calendario = () => {
    const localizer = dayjsLocalizer(dayjs);
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('10:00');
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
        setStartTime('09:00');
        setEndTime('10:00');
    };

    const handleAddEvent = () => {
        console.log('Adding Event:', newEventTitle, newEventDescription, selectedDate);
        const newEvent = {
            title: newEventTitle,
            description: newEventDescription,
            start: dayjs(selectedDate).set('hour', parseInt(startTime.split(':')[0])).set('minute', parseInt(startTime.split(':')[1])).toDate(),
            end: dayjs(selectedDate).set('hour', parseInt(endTime.split(':')[0])).set('minute', parseInt(endTime.split(':')[1])).toDate(),
        };
        setEvents([...events, newEvent]);
        closeModal();
    };

    const ModalContent = () => (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4">Agregar Cita</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Título</label>
                    <input
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        value={newEventTitle}
                        onChange={(e) => setNewEventTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Descripción</label>
                    <textarea
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Escribe la descripción aquí..."
                        rows="4"
                        value={newEventDescription}
                        onChange={(e) => setNewEventDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Hora Inicial</label>
                    <input
                        type="time"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="09:00"
                        max="18:00"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Hora Final</label>
                    <input
                        type="time"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="09:00"
                        max="18:00"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="button"
                    onClick={handleAddEvent}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Agregar Evento
                </button>
            </form>
            <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-[#ff2323] p-2 text-2xl font-bold"
            >
                x
            </button>
        </div>
    );

    return (
        <>
        <div className='flex flex-col items-center justify-center min-h-screen'>

            <div className='w-full max-w-4xl bg-white border-4 border-gray-100 rounded-lg shadow-lg p-6'>
                <Calendar
                    localizer={localizer}
                    events={events}
                    style={{ height: 500 }}
                    selectable
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectedEvent} />
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
        </div></>
    );
};

export default Calendario;
