import { Input, Textarea } from '../components/index'
import { useState } from 'react'

export default function CrearCita() {
    const [time, setTime] = useState('09:00');
    return (
        <div className="flex justify-center items-center mt-11 h-3/5">
            <div className="bg-white rounded-lg shadow-lg p-8 h-full w-3/5">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Cita en línea</h2>
                <form>
                    <div className="mb-2 flex items-center justify-between">
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
                    </div>
                    <div className="mb-2 flex items-center justify-between">
                        <label className="block text-gray-700 w-1/3">Nombre del paciente</label>
                        <Input type='text' name="patientName" required />
                    </div>
                    <div className="mb-2 flex items-center justify-between">
                        <label className="block text-gray-700 w-1/3">Descripción</label>
                        <Textarea rows={3} name="description" required />
                    </div>
                    <div className="mb-2 flex items-center justify-between">
                        <label className="block text-gray-700 w-1/3">Fecha de la cita</label>
                        <div className="flex space-x-2 w-2/3">
                            <select
                                name="day" required
                                className="w-2/3 px-4 py-2 bg-transparent border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option selected>Día</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                            <select
                                name="month"
                                className="w-2/3 px-4 py-2 bg-transparent border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option selected>Mes</option>
                                <option>Enero</option>
                                <option>Febrero</option>
                                <option>Agosto</option>
                            </select>
                            <select
                                name="year"
                                className="w-2/3 px-4 py-2 bg-transparent border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option selected>Año</option>
                                <option>2024</option>
                                <option>2023</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-2 flex items-center justify-between">
                        <label className="block text-gray-700 w-1/3">Hora</label>
                        <div className="flex space-x-2 w-2/3">
                            <div className="w-2/3">
                                <div className="flex">
                                    <input
                                        type="time"
                                        id="time"
                                        className="rounded-none rounded-s-xl bg-gray-50 w-auto border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        min="09:00"
                                        max="18:00"
                                        // value="00:00"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
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
                        </div>
                    </div>
                    <div className="mb-2 flex items-center justify-between">
                        <label className="block text-gray-700 w-1/3">Sucursal</label>
                        <select
                            name="location"
                            className="w-2/3 px-4 py-2 bg-transparent border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option selected>Dirección de la Sucursal</option>
                            <option>Calle 103.502E x 60 y 62, Delio Moreno Cantón</option>
                            <option>Calle 81 477Q, Centro</option>
                            <option>Calle 18 195, Miraflores</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-64 ml-60 mt-4 justify-center items-center bg-AzulButton text-white px-4 py-2 rounded-md hover:bg-AzulButton focus:outline-none focus:ring-2 focus:ring-AzulButton"
                    >
                        Crear cita
                    </button>
                </form>
            </div>
        </div>
    )
}

