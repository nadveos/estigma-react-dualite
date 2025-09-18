import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '¡Hola! Soy tu asistente virtual de CuraVital. ¿En qué puedo ayudarte hoy? Puedo responder preguntas sobre cuidado de heridas, tipos de úlceras, o ayudarte a solicitar un turno.',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulated responses based on keywords
  const getResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hola') || message.includes('buenos días') || message.includes('buenas tardes')) {
      return '¡Hola! ¿Cómo estás? ¿En qué puedo ayudarte con el cuidado de tus heridas?';
    }
    
    if (message.includes('turno') || message.includes('cita') || message.includes('consulta')) {
      return 'Para solicitar un turno, podés usar nuestro formulario online o llamar al +54 11 2345-6789. ¿Qué tipo de consulta necesitás?';
    }
    
    if (message.includes('úlcera venosa') || message.includes('ulcera venosa')) {
      return 'Las úlceras venosas son heridas que aparecen cuando las venas no funcionan correctamente. Es importante mantener la herida limpia, elevar las piernas cuando sea posible, y usar vendajes compresivos según lo indique tu profesional. ¿Tenés alguna pregunta específica?';
    }
    
    if (message.includes('úlcera diabética') || message.includes('ulcera diabetica') || message.includes('diabetes')) {
      return 'Las úlceras diabéticas requieren cuidado especial. Es fundamental controlar los niveles de azúcar, revisar los pies diariamente, usar calzado adecuado, y mantener la herida limpia y cubierta. ¿Necesitás más información sobre el cuidado diario?';
    }
    
    if (message.includes('dolor') || message.includes('duele')) {
      return 'El dolor en las heridas puede ser normal durante la cicatrización, pero no debe ser severo. Si experimentás dolor intenso, cambios en el color de la piel, o signos de infección, es importante que consultes inmediatamente. ¿El dolor es constante o solo al tocar la herida?';
    }
    
    if (message.includes('infección') || message.includes('infeccion') || message.includes('pus') || message.includes('rojo')) {
      return 'Los signos de infección incluyen: enrojecimiento excesivo, calor, hinchazón, pus, mal olor, o líneas rojas que se extienden desde la herida. Si presentás alguno de estos síntomas, contactá inmediatamente a un profesional. ¿Qué síntomas estás observando?';
    }
    
    if (message.includes('vendaje') || message.includes('curación') || message.includes('limpiar')) {
      return 'Para el cuidado de heridas: 1) Lavate las manos, 2) Limpiá suavemente con solución salina, 3) Aplicá el vendaje según las indicaciones, 4) Cambiá el vendaje según la frecuencia recomendada. Siempre seguí las instrucciones de tu profesional de la salud.';
    }
    
    if (message.includes('horario') || message.includes('horarios')) {
      return 'Nuestros horarios son: Lunes a Viernes de 8:00 a 18:00, Sábados de 9:00 a 13:00. Los domingos atendemos solo emergencias. ¿Necesitás algo más?';
    }
    
    if (message.includes('precio') || message.includes('costo') || message.includes('obra social')) {
      return 'Trabajamos con las principales obras sociales y prepagas. Para consultas sobre costos y cobertura, te recomiendo llamar al +54 11 2345-6789 y nuestro equipo administrativo te podrá brindar información detallada.';
    }
    
    if (message.includes('emergencia') || message.includes('urgente')) {
      return '🚨 Si tenés una emergencia médica, llamá inmediatamente al +54 11 2345-6789 o dirigite a la guardia médica más cercana. No uses el chat para emergencias.';
    }
    
    // Default response
    return 'Gracias por tu consulta. Para obtener información más específica sobre tu caso, te recomiendo agendar una consulta con nuestros especialistas. ¿Te ayudo a solicitar un turno o tenés alguna otra pregunta sobre cuidado de heridas?';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40 flex items-center justify-center ${isOpen ? 'hidden' : 'block'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Asistente CuraVital</h3>
                  <p className="text-xs text-blue-100">Online • Siempre disponible</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-blue-700 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-xs ${message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${message.isBot ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      {message.isBot ? (
                        <Bot className="w-4 h-4 text-blue-600" />
                      ) : (
                        <User className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                    <div className={`rounded-lg p-3 ${message.isBot ? 'bg-gray-100 text-gray-800' : 'bg-blue-600 text-white'}`}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.isBot ? 'text-gray-500' : 'text-blue-100'}`}>
                        {message.timestamp.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-xs">
                    <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribí tu consulta..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Este chatbot brinda información general. Para consultas específicas, agendá un turno.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
