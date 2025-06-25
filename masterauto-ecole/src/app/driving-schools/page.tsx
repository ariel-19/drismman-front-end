'use client';

import { useState } from 'react';
import DrivingSchoolCard2 from '../components/DrivingSchoolCard2';

// Données d'exemple pour les auto-écoles (les mêmes que sur la page d'accueil pour la cohérence)
const drivingSchools = [
  {
    id: '1',
    name: 'École de Conduite Sécurité',
    rating: 4.5,
    reviewCount: 87,
    address: '23 rue des Lilas',
    city: 'Bordeaux',
    image: '/images/driving-school-1.jpg',
  },
  {
    id: '2',
    name: 'Auto-École du Centre',
    rating: 4.9,
    reviewCount: 203,
    address: '56 place de la Mairie',
    city: 'Toulouse',
    image: '/images/auto1.jpg',
  },
  {
    id: '3',
    name: 'Conduite Zen',
    rating: 4.4,
    reviewCount: 74,
    address: '17 avenue Jean Jaurès',
    city: 'Nice',
    image: '/images/driving-school-3.jpg',
  },
  {
    id: '4',
    name: 'Permis Express',
    rating: 4.7,
    reviewCount: 125,
    address: '8 boulevard Gambetta',
    city: 'Lyon',
    image: '/images/auto2.jpg',
  },
  {
    id: '5',
    name: 'Auto-École Moderne',
    rating: 4.2,
    reviewCount: 56,
    address: '12 rue de la République',
    city: 'Marseille',
    image: '/images/driving-school-5.jpg',
  },
];

export default function DrivingSchoolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Extraire toutes les villes uniques pour le filtre
  const cities = Array.from(new Set(drivingSchools.map(school => school.city))).sort();

  // Filtrer les auto-écoles en fonction de la recherche et de la ville sélectionnée
  const filteredSchools = drivingSchools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         school.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         school.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = !selectedCity || school.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête de la page */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Trouvez votre auto-école idéale</h1>
          <p className="mt-2 text-gray-600">
            Comparez et choisissez parmi {drivingSchools.length} auto-écoles
          </p>
        </div>
      </div>

      {/* Filtres et barre de recherche */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher une auto-école..."
              className="w-full px-4 py-2 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="md:w-64">
            <select
              className="w-full px-4 py-2 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-white"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">Toutes les villes</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grille des auto-écoles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map((school) => (
            <DrivingSchoolCard2
              key={school.id}
              {...school}
            />
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredSchools.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Aucune auto-école trouvée</h3>
            <p className="mt-2 text-gray-600">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
