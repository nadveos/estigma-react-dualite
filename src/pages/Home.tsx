import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, BookOpen, Calendar, Shield, Award, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Artículos Especializados',
      description: 'Consejos y guías profesionales clasificadas por tipo de úlcera',
    },
    {
      icon: Users,
      title: 'Testimonios Reales',
      description: 'Experiencias de pacientes que han mejorado su calidad de vida',
    },
    {
      icon: Calendar,
      title: 'Sistema de Turnos',
      description: 'Agenda tu consulta de forma rápida y sencilla',
    },
    {
      icon: Heart,
      title: 'Atención Personalizada',
      description: 'Tratamiento especializado adaptado a cada paciente',
    },
  ];

  const stats = [
    { number: '500+', label: 'Pacientes Atendidos' },
    { number: '15+', label: 'Años de Experiencia' },
    { number: '95%', label: 'Satisfacción del Paciente' },
    { number: '24/7', label: 'Soporte de Emergencias' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Cuidamos tus heridas,
              <br />
              <span className="text-blue-200">cuidamos tu vida</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto"
            >
              Especialistas en el tratamiento de heridas ulcerosas con más de 15 años de experiencia. 
              Te acompañamos en cada paso hacia tu recuperación.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/turnos"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Solicitar Turno
              </Link>
              <Link
                to="/articulos"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Ver Artículos
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir CuraVital?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ofrecemos una atención integral y personalizada para el tratamiento de heridas ulcerosas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Experiencia y Compromiso en el Cuidado de Heridas
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                En CuraVital, entendemos el impacto que las heridas ulcerosas pueden tener en tu vida diaria. 
                Nuestro equipo de enfermeros especializados cuenta con la experiencia y los conocimientos 
                necesarios para brindarte el mejor cuidado posible.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Evaluación especializada y personalizada',
                  'Tratamientos basados en evidencia científica',
                  'Seguimiento continuo durante todo el proceso',
                  'Educación para el autocuidado',
                  'Apoyo emocional y familiar'
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/testimonios"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  Ver Testimonios
                </Link>
                <a
                  href="tel:+5411234567890"
                  className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors text-center"
                >
                  Contactar Ahora
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="bg-blue-100 rounded-2xl p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                  Certificados y Acreditados
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Nuestro equipo cuenta con las certificaciones más importantes en cuidado de heridas
                </p>
                <div className="flex justify-center">
                  <Award className="w-16 h-16 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Necesitás ayuda con el cuidado de heridas?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            No esperes más. Nuestro equipo está listo para ayudarte a recuperar tu calidad de vida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/turnos"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Solicitar Turno Online
            </Link>
            <a
              href="tel:+5411234567890"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Llamar Ahora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
