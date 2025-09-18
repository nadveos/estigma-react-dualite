import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen, Clock, User, Loader, AlertTriangle } from 'lucide-react';
import { articleService } from '../services/articleService';
import { Article } from '../types/database';

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = [
    'Todos',
    'Úlceras Venosas',
    'Úlceras Arteriales',
    'Úlceras Diabéticas',
    'Úlceras por Presión',
    'Prevención',
    'Tratamientos'
  ];

  // Fallback articles for demo
  const fallbackArticles: Article[] = [
    {
      id: '1',
      title: 'Cuidados Esenciales para Úlceras Venosas',
      excerpt: 'Aprende los fundamentos del cuidado de úlceras venosas, incluyendo técnicas de vendaje y cuidados de la piel.',
      content: 'Contenido completo del artículo...',
      category: 'Úlceras Venosas',
      readTime: '5 min',
      author: 'Lic. María González',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
      isPublished: true,
      tags: ['úlceras', 'venosas', 'cuidados'],
      created: '2025-01-15'
    },
    {
      id: '2',
      title: 'Prevención de Úlceras Diabéticas en el Pie',
      excerpt: 'Estrategias efectivas para prevenir la aparición de úlceras en pacientes diabéticos.',
      content: 'Contenido completo del artículo...',
      category: 'Úlceras Diabéticas',
      readTime: '7 min',
      author: 'Enf. Carlos Rodríguez',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop',
      isPublished: true,
      tags: ['diabetes', 'prevención', 'pies'],
      created: '2025-01-12'
    },
    {
      id: '3',
      title: 'Manejo del Dolor en Heridas Crónicas',
      excerpt: 'Técnicas y estrategias para el manejo efectivo del dolor en pacientes con heridas crónicas.',
      content: 'Contenido completo del artículo...',
      category: 'Tratamientos',
      readTime: '6 min',
      author: 'Lic. Ana Martínez',
      image: 'https://images.unsplash.com/photo-1551601651-09e9b50e5c4a?w=400&h=250&fit=crop',
      isPublished: true,
      tags: ['dolor', 'tratamiento', 'crónicas'],
      created: '2025-01-10'
    },
    {
      id: '4',
      title: 'Úlceras por Presión: Identificación Temprana',
      excerpt: 'Guía completa para identificar los primeros signos de úlceras por presión y prevenir su progresión.',
      content: 'Contenido completo del artículo...',
      category: 'Úlceras por Presión',
      readTime: '4 min',
      author: 'Enf. Laura Fernández',
      image: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=400&h=250&fit=crop',
      isPublished: true,
      tags: ['presión', 'identificación', 'prevención'],
      created: '2025-01-08'
    },
    {
      id: '5',
      title: 'Nutrición para la Cicatrización de Heridas',
      excerpt: 'La importancia de una nutrición adecuada en el proceso de cicatrización y recuperación.',
      content: 'Contenido completo del artículo...',
      category: 'Prevención',
      readTime: '8 min',
      author: 'Nut. Patricia Silva',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=250&fit=crop',
      isPublished: true,
      tags: ['nutrición', 'cicatrización', 'recuperación'],
      created: '2025-01-05'
    },
    {
      id: '6',
      title: 'Nuevas Técnicas en el Tratamiento de Úlceras Arteriales',
      excerpt: 'Descubre las últimas innovaciones en el tratamiento de úlceras arteriales y su efectividad.',
      content: 'Contenido completo del artículo...',
      category: 'Úlceras Arteriales',
      readTime: '6 min',
      author: 'Dr. Roberto Paz',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop',
      isPublished: true,
      tags: ['arteriales', 'técnicas', 'innovación'],
      created: '2025-01-03'
    }
  ];

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [articles, searchTerm, selectedCategory]);

  const loadArticles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await articleService.getPublishedArticles();
      setArticles(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al cargar artículos');
      setArticles(fallbackArticles); // Use fallback articles
      console.error('Error loading articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterArticles = () => {
    let filtered = articles.length > 0 ? articles : fallbackArticles;

    // Filter by category
    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando artículos...</p>
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
            Artículos y Consejos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Información profesional y actualizada sobre el cuidado de heridas ulcerosas
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
                Mostrando artículos de demostración. {error}
              </p>
            </div>
          </motion.div>
        )}

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[200px]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            {filteredArticles.length} {filteredArticles.length === 1 ? 'artículo encontrado' : 'artículos encontrados'}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden group cursor-pointer"
            >
              <div className="relative">
                <img
                  src={article.image || 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop'}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 group-hover:shadow-md">
                  <BookOpen className="w-4 h-4" />
                  <span>Leer Artículo</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* No results */}
        {filteredArticles.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron artículos
            </h3>
            <p className="text-gray-600 mb-4">
              Intenta cambiar los filtros o términos de búsqueda
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Todos');
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Limpiar Filtros
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Necesitás información más específica?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Nuestro equipo de especialistas está disponible para responder tus consultas 
            y brindarte información personalizada sobre tu situación.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/turnos"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Consultar Especialista
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

export default Articles;
