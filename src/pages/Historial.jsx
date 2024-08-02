import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import '../App.css';

const citas = [
    { id: 1, titulo: 'Cita 4', fecha: '30 jul', hora: '23:59', categoria: 'activas' },
    { id: 2, titulo: 'Cita 5', fecha: '31 jul', hora: '16:00', categoria: 'activas' },
    { id: 3, titulo: 'Citas 3', fecha: '23 jul', hora: '16:00', categoria: 'inactivas' },
    { id: 4, titulo: 'Cita 2', fecha: '19 jul', hora: '16:00', categoria: 'canceladas' },
    { id: 5, titulo: 'Cita 1', fecha: '17 jul', hora: '16:00', categoria: 'atendidas' },
];

const Historial = () => {
    const [activeTab, setActiveTab] = useState('activas');

    const renderCitas = (categoria) => {
        return citas.filter(cita => cita.categoria === categoria).map(cita => (
            <div key={cita.id} className="bg-white p-4 rounded-lg mb-4 shadow-md">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center text-black font-bold">
                            {cita.titulo.charAt(0)}
                        </div>
                        <div className="ml-3">
                            <h3 className="text-xl text-black font-semibold">{cita.titulo}</h3>
                            <p className="text-gray-500">{cita.fecha} - {cita.hora}</p>
                        </div>
                    </div>
                    {/* <div className="text-gray-400">
                        {cita.status && <span className="text-blue-400 mr-2">{cita.status}</span>}
                        <span className="text-green-400">{cita.puntos}</span>
                    </div> */}
                </div>
            </div>
        ));
    };

    return (
        <> <Navbar />
        <div className="p-6">
            <div className="flex space-x-4 mb-4">
                <button
                    className={`py-2 px-4 ${activeTab === 'activas' ? 'text-VerdeLink border-b-2 border-VerdeLink' : 'text-gray-400'}`}
                    onClick={() => setActiveTab('activas')}
                >
                    Activas
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'inactivas' ? 'text-VerdeLink border-b-2 border-VerdeLink' : 'text-gray-400'}`}
                    onClick={() => setActiveTab('inactivas')}
                >
                    Inactivas
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'canceladas' ? 'text-VerdeLink border-b-2 border-VerdeLink' : 'text-gray-400'}`}
                    onClick={() => setActiveTab('canceladas')}
                >
                    Canceladas
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'atendidas' ? 'text-VerdeLink border-b-2 border-VerdeLink' : 'text-gray-400'}`}
                    onClick={() => setActiveTab('atendidas')}
                >
                    Atendidas
                </button>
            </div>
            <div>
                {activeTab === 'activas' && renderCitas('activas')}
                {activeTab === 'inactivas' && renderCitas('inactivas')}
                {activeTab === 'canceladas' && renderCitas('canceladas')}
                {activeTab === 'atendidas' && renderCitas('atendidas')}
            </div>
        </div></>
    );
};

export default Historial;