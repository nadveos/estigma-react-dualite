# CuraVital - Plataforma de Cuidado de Heridas Ulcerosas

Una plataforma completa para el cuidado especializado de heridas ulcerosas, desarrollada con React, TypeScript, Tailwind CSS y PocketBase.

## 🚀 Características

### ✅ **Implementadas**
- **Sistema de Turnos**: Formulario completo con validaciones y gestión de disponibilidad
- **Artículos Educativos**: Base de conocimiento con filtros y búsqueda
- **Testimonios de Pacientes**: Con sistema de blur para contenido sensible
- **Chatbot Inteligente**: Respuestas automáticas sobre cuidado de heridas
- **Diseño Responsive**: Optimizado para móvil, tablet y desktop
- **Integración PocketBase**: Backend completo con servicios CRUD

### 🎯 **Funcionalidades Principales**
- Gestión de turnos con verificación de disponibilidad
- Sistema de artículos categorizados por tipo de úlcera
- Testimonios con imágenes médicas (con advertencia y blur)
- Chatbot con respuestas contextuales
- Diseño empático y profesional
- Formularios con validación completa

## 🛠️ **Stack Tecnológico**

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Yup
- **Backend**: PocketBase
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📋 **Configuración del Proyecto**

### 1. **Variables de Entorno**
Configurá el archivo `.env` con tus credenciales:

```env
# PocketBase Configuration
VITE_POCKETBASE_URL="http://127.0.0.1:8090"

# Gemini AI Configuration (Opcional)
VITE_GEMINI_API_KEY="tu_api_key_de_gemini"

# Firebase Configuration (Opcional)
VITE_FIREBASE_API_KEY="tu_firebase_api_key"
VITE_FIREBASE_AUTH_DOMAIN="tu_firebase_auth_domain"
VITE_FIREBASE_PROJECT_ID="tu_firebase_project_id"
```

### 2. **Configuración de PocketBase**

Necesitás configurar las siguientes colecciones en PocketBase:

#### **Colección: appointments**
```javascript
{
  "firstName": "text",
  "lastName": "text", 
  "email": "email",
  "phone": "text",
  "age": "number",
  "condition": "select", // Options: Úlcera Venosa, Úlcera Arterial, etc.
  "urgency": "select", // Options: low, medium, high
  "preferredDate": "date",
  "preferredTime": "text",
  "notes": "text",
  "status": "select", // Options: pending, confirmed, completed, cancelled
  "assignedNurse": "text"
}
```

#### **Colección: testimonials**
```javascript
{
  "patientName": "text",
  "patientAge": "number",
  "condition": "text",
  "testimonialText": "text",
  "rating": "number",
  "treatmentDuration": "text",
  "patientImage": "file",
  "caseImage": "file",
  "isApproved": "bool"
}
```

#### **Colección: articles**
```javascript
{
  "title": "text",
  "excerpt": "text",
  "content": "text",
  "category": "select", // Options: Úlceras Venosas, Úlceras Arteriales, etc.
  "author": "text",
  "readTime": "text",
  "image": "file",
  "isPublished": "bool",
  "tags": "text" // JSON array
}
```

### 3. **Instalación y Desarrollo**

```bash
# Instalar dependencias
yarn install

# Iniciar servidor de desarrollo
yarn dev

# Construir para producción
yarn build
```

## 🏥 **Funcionalidades del Sistema**

### **Sistema de Turnos**
- Formulario con validaciones completas
- Verificación de disponibilidad en tiempo real
- Gestión de urgencias (baja, media, alta)
- Confirmación automática por email

### **Artículos Educativos**
- Clasificación por tipo de úlcera
- Sistema de búsqueda avanzada
- Filtros por categoría
- Contenido profesional actualizado

### **Testimonios de Pacientes**
- Sistema de blur para imágenes médicas
- Advertencias sobre contenido sensible
- Calificaciones con estrellas
- Aprobación manual por administradores

### **Chatbot Inteligente**
- Respuestas contextuales sobre heridas
- Información sobre tipos de úlceras
- Ayuda para solicitar turnos
- Preparado para integración con Gemini AI

## 🎨 **Diseño y UX**

- **Paleta de colores empática**: Azules calmantes
- **Responsive design**: Optimizado para todos los dispositivos
- **Animaciones suaves**: Transiciones con Framer Motion
- **Accesibilidad**: Consideraciones WCAG
- **Feedback visual**: Estados de carga y confirmación

## 🔧 **Servicios Implementados**

- `appointmentService`: CRUD completo para turnos
- `testimonialService`: Gestión de testimonios
- `articleService`: Manejo de artículos
- Verificación de disponibilidad de horarios
- Upload de imágenes
- Filtros y búsquedas

## 📱 **Responsive Design**

La aplicación está optimizada para:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

## 🚀 **Próximos Pasos**

1. **Conectar PocketBase**: Configurar tu instancia de PocketBase
2. **Integrar Gemini AI**: Para el chatbot inteligente
3. **Deploy a producción**: Netlify, Vercel o similar
4. **Configurar autenticación**: Para panel de administración

## 📞 **Soporte**

Para consultas técnicas o configuración:
- Email: soporte@curavital.com
- Teléfono: +54 11 2345-6789

---

**CuraVital** - Cuidamos tus heridas, cuidamos tu vida 💙
