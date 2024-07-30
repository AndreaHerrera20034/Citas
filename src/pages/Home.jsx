import React from 'react';
import Navbar from '../components/Navbar/Navbar';

function Home() {
  return (
    <><Navbar></Navbar>
    <div className="w-full min-h-screen flex flex-col pt-4">
          <div className="flex-1 bg-gradient-to-r from-green-500 to-[#ffffff] p-6 rounded-lg shadow-md text-white">
              <div className="max-w-2xl">
                  <h2 className="text-4xl font-extrabold mb-2 font-sans pb-3">¡Bienvenido nuevamente!</h2>
                  <p className="text-xl font-semibold">¿Qué te gustaría hacer el dia de hoy?</p>
              </div>
              <div className="mt-4 flex justify-end">
                  <button
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
                              <th className="text-left p-2">Paciente</th>
                              <th className="text-left p-2">Fecha/Hora</th>
                              <th className="text-left p-2">Detalles</th>
                          </tr>
                      </thead>
                      <tbody>
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
                                      <span className="inline-block align-middle">Discuss diet plan</span>
                                  </div>
                                  <div>
                                      <span className="inline-block align-middle">60 minutes</span>
                                  </div>
                              </td>
                          </tr>
                          <tr className="border-t">
                              <td className="p-2">
                                  <div className="flex items-center gap-2">
                                      
                                      <div>
                                          <div className="font-medium">Jane Appleseed</div>
                                          <div className="text-sm text-gray-500">Weight Management</div>
                                      </div>
                                  </div>
                              </td>
                              <td className="p-2">
                                  <div className="font-medium">June 22, 2023</div>
                                  <div className="text-sm text-gray-500">2:00 PM</div>
                              </td>
                              <td className="p-2">
                                  <div>
                                      <span className="inline-block align-middle">Review progress</span>
                                  </div>
                                  <div>
                                      <span className="inline-block align-middle">45 minutes</span>
                                  </div>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      </div></>
  );
}

export default Home;
