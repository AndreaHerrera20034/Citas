import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import Modal from 'react-modal';
import Navbar from '../components/Navbar/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import { useState } from 'react';
import '../App.css';

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
        <div className="p-4 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
            {selectedEvent ? (
                <>
                    <h2 className="text-xl font-semibold mb-4">Detalles de la cita</h2>
                    <p className="mb-4">Título: {selectedEvent.title}</p>
                    <p className="mb-4">Descripción: {selectedEvent.description}</p>
                    <p className="mb-4">Fecha: {dayjs(selectedEvent.start).format('YYYY-MM-DD HH:mm')}</p>
                </>
            ) : (
                <>
                    <h2 className="text-xl font-semibold mb-4">Agregar Cita</h2>
                    <form>
                        {/* <div className="mb-2 flex items-center justify-between">
                            <label className="block text-gray-700 w-1/3">Medico</label>
                            <select
                                name="doctor" required
                                className="w-2/3 px-4 py-2 bg-transparent border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option selected>Elige el nutriologo</option>
                                <option>Gaspar Gonzalez Mooh</option>
                                <option>Ana Polanco Rodriguez</option>
                                <option>William Flores Chuc</option>
                            </select>
                        </div> */}
                        <div className="mb-2 flex items-center justify-between">
                            <label className="block text-gray-700 w-1/3">Titulo</label>
                            <input
                                className="w-2/3 border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type='text' value={newEventTitle} name="eventTitle" onChange={(e) => setNewEventTitle(e.target.value)} required
                            />
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="block text-gray-700 w-1/3">Nombre del paciente</label>
                            <input
                                className="w-2/3 border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type='text' name="patientName"
                            />
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="block text-gray-700 w-1/3">Descripción</label>
                            <textarea
                                className="w-2/3 h-1/2 border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Escribe la descripción aquí..."
                                rows={3} value={newEventDescription} name="description" onChange={(e) => setNewEventDescription(e.target.value)} required
                            />
                        </div>

                        <div className='mb-2 flex items-center'>
                            <label className="block text-gray-700 w-1/3">Hora inicial</label>
                            <div className="flex">
                                <input
                                    type="time"
                                    id="start-time"
                                    className="rounded-none rounded-s-xl bg-gray-50 w-auto border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="09:00"
                                    max="18:00"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    required
                                />
                                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-s-0 border-s-0 border-gray-300 rounded-e-md dark:bg-gray-200 dark:text-gray-400 dark:border-gray-300">
                                    <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div className='mb-2 flex items-center'>
                            <label className="block text-gray-700 w-1/3">Hora Terminal</label>
                            <div className="flex">
                                <input
                                    type="time"
                                    id="end-time"
                                    className="rounded-none rounded-s-xl bg-gray-50 w-auto border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="09:00"
                                    max="18:00"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    required
                                />
                                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-s-0 border-s-0 border-gray-300 rounded-e-md dark:bg-gray-200 dark:text-gray-400 dark:border-gray-300">
                                    <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div className="mb-2 flex items-center justify-between">
                            <label className="block text-gray-700 w-1/3">Sucursal</label>
                            {/* mapa */}
                        </div>
                        <button onClick={handleAddEvent} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                            Agregar Evento
                        </button>
                    </form>
                </>
            )}
            <button onClick={closeModal} className="w-full bg-gray-300 text-gray-700 py-2 rounded mt-4 hover:bg-gray-400">
                Cerrar
            </button>
        </div>
    );

    return (
        <> <Navbar />
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