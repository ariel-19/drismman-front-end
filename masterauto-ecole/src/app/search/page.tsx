'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DrivingSchoolCard from '../components/DrivingSchoolCard2';

// Type pour les auto-écoles
interface DrivingSchool {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  address: string;
  city: string;
  image?: string;
}

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
  
  const [schools, setSchools] = useState<DrivingSchool[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredSchools, setFilteredSchools] = useState<DrivingSchool[]>([]);
  const [cityFilter, setCityFilter] = useState<string>('');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  
  // Simuler le chargement des auto-écoles (à remplacer par un appel API réel)
  useEffect(() => {
    // Données d'exemple pour les auto-écoles
    const drivingSchoolsData = [
      {
        id: '1',
        name: 'Auto-École Excellence',
        rating: 4.5,
        reviewCount: 87,
        address: '45 Boulevard de la Liberté',
        city: 'Douala',
        image: '/images/driving-school-1.jpg',
      },
      {
        id: '2',
        name: 'Centre de Formation Routière Biyem-Assi',
        rating: 4.9,
        reviewCount: 203,
        address: '78 Avenue Kennedy',
        city: 'Yaoundé',
        image: '/images/auto1.jpg',
      },
      {
        id: '3',
        name: 'Auto-École Sécurité Routière',
        rating: 4.4,
        reviewCount: 74,
        address: '12 Rue Ahmadou Ahidjo',
        city: 'Bafoussam',
        image: '/images/driving-school-3.jpg',
      },
      {
        id: '4',
        name: 'Permis Express Cameroun',
        rating: 4.7,
        reviewCount: 125,
        address: '32 Boulevard des Nations',
        city: 'Limbé',
        image: '/images/auto2.jpg',
      },
      {
        id: '5',
        name: 'Auto-École Moderne Kribi',
        rating: 4.2,
        reviewCount: 56,
        address: '17 Avenue du Port',
        city: 'Kribi',
        image: '/images/driving-school-5.jpg',
      },
      {
        id: '6',
        name: 'École de Conduite Professionnelle',
        rating: 4.8,
        reviewCount: 97,
        address: '5 Rue Principale',
        city: 'Garoua',
        image: '/images/driving-school-6.jpg',
      },
      {
        id: '7',
        name: 'Auto-École Bamenda',
        rating: 4.3,
        reviewCount: 62,
        address: '25 Commercial Avenue',
        city: 'Bamenda',
        image: '/images/driving-school-1.jpg',
      },
      {
        id: '8',
        name: 'Centre de Formation Routière Buea',
        rating: 4.6,
        reviewCount: 89,
        address: '10 University Road',
        city: 'Buea',
        image: '/images/auto2.jpg',
      },
      {
        id: '9',
        name: 'Auto-École Ngaoundéré',
        rating: 4.1,
        reviewCount: 45,
        address: '8 Avenue Centrale',
        city: 'Ngaoundéré',
        image: '/images/driving-school-3.jpg',
      },
      {
        id: '10',
        name: 'Permis Facile Maroua',
        rating: 4.0,
        reviewCount: 38,
        address: '15 Rue du Marché',
        city: 'Maroua',
        image: '/images/driving-school-5.jpg',
      },
    ];
    
    setSchools(drivingSchoolsData);
    setLoading(false);
  }, []);
  
  // Filtrer les auto-écoles en fonction de la recherche
  useEffect(() => {
    if (schools.length > 0 && query) {
      const filtered = schools.filter(school => {
        const matchesQuery = query 
          ? (school.name.toLowerCase().includes(query.toLowerCase()) || 
             school.city.toLowerCase().includes(query.toLowerCase()) ||
             school.address.toLowerCase().includes(query.toLowerCase()))
          : true;
          
        const matchesCity = cityFilter 
          ? school.city.toLowerCase() === cityFilter.toLowerCase()
          : true;
          
        const matchesRating = ratingFilter 
          ? school.rating >= ratingFilter
          : true;
          
        return matchesQuery && matchesCity && matchesRating;
      });
      
      setFilteredSchools(filtered);
    } else {
      setFilteredSchools(schools);
    }
  }, [query, schools, cityFilter, ratingFilter]);
  
  // Obtenir les villes uniques pour le filtre
  const uniqueCities = [...new Set(schools.map(school => school.city))].sort();
  
  const handleViewDetails = (schoolId: string) => {
    router.push(`/driving-school/${schoolId}`);
  };
  
  const handleCityFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCityFilter(e.target.value);
  };
  
  const handleRatingFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setRatingFilter(value ? Number(value) : null);
  };
  
  const resetFilters = () => {
    setCityFilter('');
    setRatingFilter(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {query 
                ? `Résultats de recherche pour "${query}"`
                : 'Toutes les auto-écoles'}
            </h1>
            <p className="text-gray-600">
              {filteredSchools.length} auto-école{filteredSchools.length !== 1 ? 's' : ''} trouvée{filteredSchools.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          {/* Filtres */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Filtres</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="cityFilter" className="block text-sm font-medium text-gray-700 mb-1">
                  Ville
                </label>
                <select
                  id="cityFilter"
                  value={cityFilter}
                  onChange={handleCityFilterChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Toutes les villes</option>
                  {uniqueCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="ratingFilter" className="block text-sm font-medium text-gray-700 mb-1">
                  Note minimale
                </label>
                <select
                  id="ratingFilter"
                  value={ratingFilter || ''}
                  onChange={handleRatingFilterChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Toutes les notes</option>
                  <option value="4.5">4.5 étoiles et plus</option>
                  <option value="4">4 étoiles et plus</option>
                  <option value="3.5">3.5 étoiles et plus</option>
                  <option value="3">3 étoiles et plus</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredSchools.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Aucun résultat trouvé</h2>
              <p className="text-gray-600 mb-6">
                Nous n&apos;avons pas trouvé d&apos;auto-écoles correspondant à votre recherche.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Voir toutes les auto-écoles
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSchools.map(school => (
                <DrivingSchoolCard
                  key={school.id}
                  id={school.id}
                  name={school.name}
                  rating={school.rating}
                  reviewCount={school.reviewCount}
                  address={school.address}
                  city={school.city}
                  image={school.image}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
