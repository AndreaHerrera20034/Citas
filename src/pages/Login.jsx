import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [formData, setFormData] = useState({
    UserNameOrEmail: '',
    Password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.UserNameOrEmail) errors.usernameOrEmail = 'El nombre de usuario o email es requerido';
    if (!formData.Password) errors.password = 'La contraseña es requerida';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5156/api/Login', formData);
      console.log('Registro exitoso:', response.data);
      // Aquí asumimos que la respuesta es exitosa si el estado de la respuesta es 200
      if (response.status === 200) {
        // Redirige al home si el inicio de sesión es exitoso
        const { token } = response.data;
      localStorage.setItem('Token', token);
        navigate('/');
      }
    } catch (error) {
      // Aquí puedes manejar errores específicos del inicio de sesión, como credenciales incorrectas
      setErrors({ general: 'Credenciales incorrectas' });
      console.error('Error en el registro:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex justify-center overflow-hidden w-full">
        <div className="p-8">
          <div className="mb-1 text-center">
            <img src="src/assets/logo.png" alt="Logo" className="h-32 w-auto mx-auto" />
          </div>
          {/* Formulario */}
          <div className="">
            <h2 className="text-5xl text-center font-bold text-gray-800 mb-2">Inicia sesión</h2>
            <p className="text-gray-600 text-2xl mb-3 text-center">Por favor ingrese sus credenciales.</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="relative h-10 w-full min-w-[200px]">
                  <input
                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" " 
                    type="text" 
                    name="UserNameOrEmail" 
                    value={formData.UserNameOrEmail} 
                    onChange={handleChange} 
                    required
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-400 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-gray-400">
                    Usuario o email
                  </label>
                </div>
                {errors.usernameOrEmail && <p className="text-red-500 text-xs italic">{errors.usernameOrEmail}</p>}
              </div>
              <div className="mb-4 relative">
                <div className="relative h-10 w-full min-w-[200px]">
                  <input
                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" " 
                    type="password" 
                    name="Password" 
                    value={formData.Password} 
                    onChange={handleChange} 
                    required
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-400 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-gray-400">
                    Contraseña
                  </label>
                </div>
                {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
              </div>
              {errors.general && <p className="text-red-500 text-xs italic">{errors.general}</p>}
              <button
                type="submit"
                className="w-full bg-VerdeLink text-white text-lg px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                Iniciar sesión
              </button>
            </form>
            <p className="mt-4 text-center text-lg text-gray-600">
              ¿No tienes cuenta? <a href="/Registro" className="text-VerdeLink hover:underline">Crea una cuenta</a>
            </p>
          </div>
        </div>
        <div className="flex justify-end pr-12">
          <img src="src/assets/login.png" alt="Nutrious Date" className="py-2 px-6 h-auto w-auto rounded-3xl object-cover" />
        </div>
      </div>
    </div>
  );
}
