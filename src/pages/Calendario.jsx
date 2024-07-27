import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import Modal from 'react-modal';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import { useState } from 'react';
import '../App.css';

Modal.setAppElement('#root');

const Calendario = () => {
    const localizer = dayjsLocalizer(dayjs);
    const [events, setEvents] = useState([
        {
            start: dayjs('2024-07-28T04:00:00').toDate(),
            end: dayjs('2024-07-28T05:40:00').toDate(),
            title: "Cita 1"
        }
    ]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalState, setModalState] = useState(false);
    const [newEventTitle, setNewEventTitle] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const handleSelectSlot = (slotInfo) => {
        console.log('Selected Slot:', slotInfo);
        setSelectedDate(slotInfo.start);
        setSelectedEvent(null);
        setModalState(true);
    };

    const handleSelectedEvent = (event) => {
        console.log('Selected Event:', event);
        setSelectedEvent(event);
        setModalState(true);
    };

    const closeModal = () => {
        setModalState(false);
        setSelectedEvent(null);
        setNewEventTitle('');
        setSelectedDate(null);
    };

    const handleAddEvent = () => {
        console.log('Adding Event:', newEventTitle, selectedDate);
        const newEvent = {
            title: newEventTitle,
            start: selectedDate,
            end: selectedDate,
        };
        setEvents([...events, newEvent]);
        closeModal();
    };

    const ModalContent = () => (
        <div className="p-4 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
            {selectedEvent ? (
                <>
                    <h2 className="text-xl font-semibold mb-4">Detalles del Evento</h2>
                    <p className="mb-4">Título: {selectedEvent.title}</p>
                    <p className="mb-4">Fecha: {dayjs(selectedEvent.start).format('YYYY-MM-DD HH:mm')}</p>
                </>
            ) : (
                <>
                    <h2 className="text-xl font-semibold mb-4">Agregar Evento</h2>
                    <input
                        type="text"
                        placeholder="Título del evento"
                        value={newEventTitle}
                        onChange={(e) => setNewEventTitle(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <button onClick={handleAddEvent} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Agregar Evento
                    </button>
                </>
            )}
            <button onClick={closeModal} className="w-full bg-gray-300 text-gray-700 py-2 rounded mt-4 hover:bg-gray-400">
                Cerrar
            </button>
        </div>
    );

    return (
        <div className='flex flex-col items-center justify-center min-h-screen p-4'>
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
    );
};

export default Calendario;