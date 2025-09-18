import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Eye, EyeOff, AlertTriangle, Loader } from 'lucide-react';
import { testimonialService } from '../services/testimonialService';
import { Testimonial } from '../types/database';

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSensitiveContent, setShowSensitiveContent] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await testimonialService.getApprovedTestimonials();
      setTestimonials(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al cargar testimonios');
      console.error('Error loading testimonials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSensitiveContent = (id: string) => {
    setShowSensitiveContent(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  // Fallback testimonials for demo when PocketBase is not connected
  const fallbackTestimonials: Testimonial[] = [
    {
      id: '1',
      patientName: 'María Elena R.',
      patientAge: 68,
      condition: 'Úlcera Venosa',
      testimonialText: 'Después de meses de dolor y preocupación, el equipo de CuraVital me devolvió la esperanza. Su tratamiento especializado y el cuidado humano que recibí fueron excepcionales. Hoy puedo caminar sin dolor y he recuperado mi calidad de vida.',
      rating: 5,
      treatmentDuration: '3 meses',
      patientImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      caseImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      isApproved: true
    },
    {
      id: '2',
      patientName: 'Carlos M.',
      patientAge: 55,
      condition: 'Úlcera Diabética',
      testimonialText: 'Como diabético, siempre tuve miedo de las complicaciones en mis pies. Cuando desarrollé una úlcera, pensé lo peor. Pero gracias al profesionalismo y dedicación del equipo, no solo sanó completamente, sino que aprendí a cuidarme mejor.',
      rating: 5,
      treatmentDuration: '4 meses',
      patientImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      caseImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
      isApproved: true
    },
    {
      id: '3',
      patientName: 'Ana Patricia L.',
      patientAge: 72,
      condition: 'Úlcera por Presión',
      testimonialText: 'Mi familia y yo estábamos muy preocupados por mi herida. El equipo de CuraVital no solo curó mi úlcera, sino que nos enseñó cómo prevenir futuras complicaciones. Su paciencia y conocimiento fueron invaluables.',
      rating: 5,
      treatmentDuration: '2 meses',
      patientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      caseImage: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=400&h=300&fit=crop',
      isApproved: true
    },
    {
      id: '4',
      patientName: 'Roberto S.',
      patientAge: 61,
      condition: 'Úlcera Arterial',
      testimonialText: 'Había perdido la esperanza después de varios tratamientos fallidos. CuraVital me demostró que con el enfoque correcto y el cuidado adecuado, la recuperación es posible. Estoy infinitamente agradecido.',
      rating: 5,
      treatmentDuration: '5 meses',
      patientImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      caseImage: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop',
      isApproved: true
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando testimonios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Testimonios y Casos Reales
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Historias reales de pacientes que han recuperado su calidad de vida con nuestro tratamiento especializado
          </motion.p>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8"
          >
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <p className="text-yellow-700">
                Mostrando testimonios de demostración. {error}
              </p>
            </div>
          </motion.div>
        )}

        {/* Content Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800 mb-1">
                Advertencia sobre Contenido Sensible
              </h3>
              <p className="text-sm text-yellow-700">
                Esta sección contiene imágenes médicas que pueden resultar sensibles para algunos usuarios. 
                Las imágenes están ocultas por defecto y pueden visualizarse voluntariamente.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {displayTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              {/* Patient Info */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.patientImage || `https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face`}
                    alt={testimonial.patientName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {testimonial.patientName}
                    </h3>
                    <p className="text-gray-600">
                      {testimonial.patientAge} años • {testimonial.condition}
                    </p>
                    <p className="text-sm text-blue-600">
                      Duración del tratamiento: {testimonial.treatmentDuration}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>

              {/* Case Image */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  {!showSensitiveContent[testimonial.id!] ? (
                    <motion.div
                      key="blurred"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative"
                    >
                      <img
                        src={testimonial.caseImage || 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop'}
                        alt="Caso clínico"
                        className="w-full h-48 object-cover filter blur-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <button
                          onClick={() => toggleSensitiveContent(testimonial.id!)}
                          className="bg-white text-gray-800 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-100 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Ver Caso Clínico</span>
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="visible"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative"
                    >
                      <img
                        src={testimonial.caseImage || 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop'}
                        alt="Caso clínico"
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => toggleSensitiveContent(testimonial.id!)}
                        className="absolute top-4 right-4 bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <EyeOff className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Testimonial */}
              <div className="p-6">
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-200" />
                  <p className="text-gray-700 leading-relaxed pl-6">
                    {testimonial.testimonialText}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No testimonials message */}
        {displayTestimonials.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Quote className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No hay testimonios disponibles
            </h3>
            <p className="text-gray-600">
              Los testimonios aparecerán aquí una vez que sean aprobados.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Querés ser parte de nuestras historias de éxito?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Cada paciente es único y merece un tratamiento personalizado. 
            Dejanos ayudarte a recuperar tu calidad de vida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/turnos"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Solicitar Consulta
            </a>
            <a
              href="tel:+5411234567890"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
            >
              Llamar Ahora
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
