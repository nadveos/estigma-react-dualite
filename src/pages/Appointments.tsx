import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface AppointmentForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  condition: string;
  urgency: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

const Appointments: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AppointmentForm>();

  const urgencyLevels = [
    { value: 'low', label: 'Baja - Consulta de rutina', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Media - Necesito atención pronto', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'Alta - Requiere atención urgente', color: 'bg-red-100 text-red-800' }
  ];

  const conditions = [
    'Úlcera Venosa',
    'Úlcera Arterial',
    'Úlcera Diabética',
    'Úlcera por Presión',
    'Herida Quirúrgica',
    'Quemadura',
    'Consulta Preventiva',
    'Otra'
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const onSubmit = (data: AppointmentForm) => {
    console.log('Appointment data:', data);
    setIsSubmitted(true);
    reset();
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md mx-4"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¡Solicitud Enviada!
          </h2>
          <p className="text-gray-600 mb-6">
            Hemos recibido tu solicitud de turno. Nos pondremos en contacto contigo 
            dentro de las próximas 24 horas para confirmar la cita.
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>📧 Revisá tu email para más detalles</p>
            <p>📱 Te llamaremos al número proporcionado</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Solicitar Turno
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Completá el formulario y nos pondremos en contacto para confirmar tu cita
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    Información Personal
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre *
                      </label>
                      <input
                        {...register('firstName', { required: 'El nombre es requerido' })}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Apellido *
                      </label>
                      <input
                        {...register('lastName', { required: 'El apellido es requerido' })}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        {...register('email', { 
                          required: 'El email es requerido',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email inválido'
                          }
                        })}
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono *
                      </label>
                      <input
                        {...register('phone', { required: 'El teléfono es requerido' })}
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Edad *
                      </label>
                      <input
                        {...register('age', { 
                          required: 'La edad es requerida',
                          min: { value: 18, message: 'Debe ser mayor de 18 años' },
                          max: { value: 120, message: 'Edad inválida' }
                        })}
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.age && (
                        <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Información Médica
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo de Consulta *
                      </label>
                      <select
                        {...register('condition', { required: 'Selecciona el tipo de consulta' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Seleccionar...</option>
                        {conditions.map(condition => (
                          <option key={condition} value={condition}>
                            {condition}
                          </option>
                        ))}
                      </select>
                      {errors.condition && (
                        <p className="text-red-500 text-sm mt-1">{errors.condition.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nivel de Urgencia *
                      </label>
                      <div className="space-y-2">
                        {urgencyLevels.map(level => (
                          <label key={level.value} className="flex items-center">
                            <input
                              {...register('urgency', { required: 'Selecciona el nivel de urgencia' })}
                              type="radio"
                              value={level.value}
                              className="text-blue-600 focus:ring-blue-500"
                            />
                            <span className={`ml-3 px-3 py-1 rounded-full text-sm ${level.color}`}>
                              {level.label}
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.urgency && (
                        <p className="text-red-500 text-sm mt-1">{errors.urgency.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Appointment Preferences */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    Preferencias de Horario
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha Preferida *
                      </label>
                      <input
                        {...register('preferredDate', { required: 'Selecciona una fecha' })}
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.preferredDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.preferredDate.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Horario Preferido *
                      </label>
                      <select
                        {...register('preferredTime', { required: 'Selecciona un horario' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Seleccionar...</option>
                        {timeSlots.map(time => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      {errors.preferredTime && (
                        <p className="text-red-500 text-sm mt-1">{errors.preferredTime.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notas Adicionales
                  </label>
                  <textarea
                    {...register('notes')}
                    rows={4}
                    placeholder="Describí brevemente tu situación o cualquier información adicional que consideres importante..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Solicitar Turno</span>
                </button>
              </form>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Información de Contacto
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Teléfono</p>
                    <p className="text-gray-600">+54 11 2345-6789</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">turnos@curavital.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Dirección</p>
                    <p className="text-gray-600">Av. Corrientes 1234<br />CABA, Argentina</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Office Hours */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Horarios de Atención
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Lunes - Viernes</span>
                  <span className="font-medium">8:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sábados</span>
                  <span className="font-medium">9:00 - 13:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Domingos</span>
                  <span className="font-medium">Solo Emergencias</span>
                </div>
              </div>
            </motion.div>

            {/* Emergency Contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-red-50 border border-red-200 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                ¿Es una Emergencia?
              </h3>
              <p className="text-red-700 text-sm mb-4">
                Si tenés una herida que sangra activamente, signos de infección severa, 
                o necesitás atención inmediata, llamanos ahora.
              </p>
              <a
                href="tel:+5411234567890"
                className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition-colors block text-center"
              >
                Llamar Emergencias
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
