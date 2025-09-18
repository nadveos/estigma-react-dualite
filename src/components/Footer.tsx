import React from 'react';
import { Heart, Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">CuraVital</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Especialistas en el cuidado y tratamiento de heridas ulcerosas. 
              Brindamos atención profesional, compasiva y personalizada para 
              mejorar la calidad de vida de nuestros pacientes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                WhatsApp
              </a>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">+54 11 2345-6789</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">info@curavital.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-blue-400 mt-1" />
                <span className="text-gray-300">
                  Av. Corrientes 1234<br />
                  CABA, Argentina
                </span>
              </li>
            </ul>
          </div>

          {/* Horarios */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Horarios</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <div className="text-gray-300">
                  <div>Lun - Vie: 8:00 - 18:00</div>
                  <div>Sáb: 9:00 - 13:00</div>
                  <div>Dom: Emergencias</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 CuraVital. Todos los derechos reservados. | 
            <a href="#" className="hover:text-blue-400 transition-colors ml-1">
              Política de Privacidad
            </a> | 
            <a href="#" className="hover:text-blue-400 transition-colors ml-1">
              Términos de Servicio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
