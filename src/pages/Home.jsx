import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function Home() {
  const [modalState, setModalState] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');

  const openModal = () => setModalState(true);
  const closeModal = () => {
    setModalState(false);
    setNewEventTitle('');
    setNewEventDescription('');
    setStartTime('09:00');
    setEndTime('10:00');
  };

  const handleAddEvent = () => {
    console.log('Adding Event:', newEventTitle, newEventDescription);
    // Aquí puedes manejar la adición del evento
    closeModal();
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen flex flex-col pt-4">
        <div className="relative flex-1 bg-gradient-to-r from-green-500 to-white p-6 rounded-lg shadow-md text-white">
          <div className="max-w-2xl">
            <h2 className="text-6xl font-extrabold mb-4">¡Bienvenido nuevamente!</h2>
            <p className="text-2xl font-semibold mb-4">¿Qué te gustaría hacer el día de hoy?</p>
          </div>
          <div className="absolute inset-y-1/2 right-6 transform -translate-y-1/2 flex items-center">
            <button
              onClick={openModal}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded font-semibold"
            >
              <span className="font-bold text-xl">+</span> Agregar nueva cita
            </button>
          </div>
        </div>
        <div className="px-4 md:px-6 lg:px-8 py-8 flex-1">
          <h2 className="text-2xl font-bold mb-4">Próximas citas</h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">Paciente</th>
                  <th className="text-left p-2">Fecha/Hora</th>
                  <th className="text-left p-2">Detalles</th>
                </tr>
              </thead>
              <tbody>
                {/* Datos de ejemplo */}
                <tr className="border-t">
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="font-medium">John Doe</div>
                        <div className="text-sm text-gray-500">Nutrition Consultation</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="font-medium">June 15, 2023</div>
                    <div className="text-sm text-gray-500">10:00 AM</div>
                  </td>
                  <td className="p-2">
                    <div>
                      <span className="inline-block">Discuss diet plan</span>
                    </div>
                    <div>
                      <span className="inline-block">60 minutes</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modalState && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75" onClick={closeModal}></div>
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
              className="absolute top-2 right-2  text-[#ff2323] p-2 text-2xl font-bold  "
            >
              x
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
