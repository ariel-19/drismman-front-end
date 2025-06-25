'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Données d'exemple pour les auto-écoles
const drivingSchools = [
  {
    id: '1',
    name: 'Auto-École Excellence',
    description: 'Notre auto-école située au cœur de Douala offre une formation de qualité avec des instructeurs expérimentés. Nous proposons des cours théoriques et pratiques adaptés à tous les niveaux, avec un accent particulier sur la sécurité routière et les spécificités de la conduite au Cameroun.',
    address: '45 Boulevard de la Liberté',
    city: 'Douala',
    phone: '+237 233 42 56 78',
    email: 'contact@auto-ecole-excellence.cm',
    website: 'www.auto-ecole-excellence.cm',
    openingHours: 'Lun-Ven: 8h-18h, Sam: 9h-15h',
    images: [
      '/images/driving-school-1.jpg',
      '/images/auto1.jpg',
      '/images/auto2.jpg',
    ],
    licenses: [
      {
        type: 'Permis A',
        price: 75000,
        duration: '2 mois',
        description: 'Formation complète pour la conduite de moto',
        popularity: 65
      },
      {
        type: 'Permis B',
        price: 150000,
        duration: '3 mois',
        description: 'Formation complète pour la conduite de voiture',
        popularity: 85
      },
      {
        type: 'Permis C',
        price: 200000,
        duration: '4 mois',
        description: 'Formation pour la conduite de poids lourds',
        popularity: 45
      },
      {
        type: 'Permis D',
        price: 250000,
        duration: '4 mois',
        description: 'Formation pour le transport en commun',
        popularity: 35
      }
    ],
    rating: 4.5,
    reviewCount: 87,
    reviews: [
      {
        id: 1,
        user: 'Mbarga Jean',
        rating: 5,
        comment: 'Excellente formation avec des instructeurs patients et professionnels. J\'ai obtenu mon permis du premier coup !',
        date: '2023-04-20',
      },
      {
        id: 2,
        user: 'Ngo Basse Marie',
        rating: 4,
        comment: 'Très bonne expérience d\'apprentissage. Les instructeurs sont compétents et le matériel pédagogique est de qualité.',
        date: '2023-03-15',
      },
      {
        id: 3,
        user: 'Kamdem Paul',
        rating: 5,
        comment: 'Je recommande vivement cette auto-école. Ils sont très professionnels et les prix sont raisonnables.',
        date: '2023-02-28',
      },
    ],
    registrationNumber: 'AE-MINFOP-2018-328',
    legalRepresentative: 'Nkoulou Samuel',
    foundedYear: 2010,
    instructors: 8,
    vehicles: 12,
    stats: {
      students: 1250,
      successRate: 87,
      coursesCompleted: 3200
    },
    facilities: ['Salle de code climatisée', 'Simulateurs de conduite', 'Véhicules récents', 'Parking privé']
  },
  {
    id: '2',
    name: 'Centre de Formation Routière Biyem-Assi',
    description: 'Le Centre de Formation Routière Biyem-Assi est un établissement de référence à Yaoundé. Nous offrons des formations complètes pour tous types de permis, avec une pédagogie adaptée aux réalités camerounaises. Notre équipe d\'instructeurs qualifiés vous accompagne tout au long de votre apprentissage.',
    address: '78 Avenue Kennedy',
    city: 'Yaoundé',
    phone: '+237 222 31 45 67',
    email: 'info@cfr-biyemassi.cm',
    website: 'www.cfr-biyemassi.cm',
    openingHours: 'Lun-Sam: 7h30-19h',
    images: [
      '/images/auto1.jpg',
      '/images/driving-school-3.jpg',
      '/images/driving-school-5.jpg',
    ],
    licenses: [
      {
        type: 'Permis A',
        price: 80000,
        duration: '2 mois',
        description: 'Formation pour la conduite de moto',
        popularity: 60
      },
      {
        type: 'Permis B',
        price: 160000,
        duration: '3 mois',
        description: 'Formation pour la conduite de voiture',
        popularity: 90
      },
      {
        type: 'Permis C',
        price: 210000,
        duration: '3.5 mois',
        description: 'Formation pour la conduite de poids lourds',
        popularity: 40
      }
    ],
    rating: 4.9,
    reviewCount: 203,
    reviews: [
      {
        id: 1,
        user: 'Atangana Robert',
        rating: 5,
        comment: 'Formation de qualité supérieure. Je recommande vivement ce centre à tous ceux qui veulent apprendre à conduire.',
        date: '2023-05-12',
      },
      {
        id: 2,
        user: 'Essomba Claire',
        rating: 5,
        comment: 'Excellent centre de formation avec des instructeurs patients et pédagogues.',
        date: '2023-04-28',
      }
    ],
    registrationNumber: 'AE-MINFOP-2015-156',
    legalRepresentative: 'Mvondo Joseph',
    foundedYear: 2015,
    instructors: 12,
    vehicles: 18,
    stats: {
      students: 1850,
      successRate: 92,
      coursesCompleted: 4200
    },
    facilities: ['Salle multimédia', 'Simulateurs de conduite', 'Véhicules récents', 'Cafétéria']
  }
];

export default function DrivingSchoolPage() {
  const params = useParams();
  const router = useRouter();
  const [school, setSchool] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simuler un appel API pour récupérer les détails de l'auto-école
    const fetchSchoolDetails = () => {
      setLoading(true);
      // Recherche de l'auto-école par ID dans les données d'exemple
      const foundSchool = drivingSchools.find(s => s.id === params.id);
      
      // Simuler un délai de chargement
      setTimeout(() => {
        if (foundSchool) {
          setSchool(foundSchool);
        } else {
          // Rediriger vers la page 404 si l'auto-école n'est pas trouvée
          router.push('/404');
        }
        setLoading(false);
      }, 500);
    };
    
    if (params.id) {
      fetchSchoolDetails();
    }
  }, [params.id, router]);
  
  // Fonction pour formater les prix en FCFA
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };
  
  // Générer les étoiles pour les avis
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg 
          key={i}
          className={`w-5 h-5 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!school) {
    return null; // Géré par la redirection dans useEffect
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Bouton de retour */}
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour aux résultats
            </button>
          </div>
          
          {/* En-tête de l'auto-école */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={school.images[0]} 
                alt={school.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h1 className="text-3xl font-bold mb-2">{school.name}</h1>
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {renderStars(school.rating)}
                    </div>
                    <span className="text-white/90">{school.rating} ({school.reviewCount} avis)</span>
                  </div>
                  <p className="text-white/80">{school.address}, {school.city}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contenu principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne principale */}
            <div className="lg:col-span-2">
              {/* Onglets */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="flex border-b">
                  <button
                    className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Présentation
                  </button>
                  <button
                    className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'licenses' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('licenses')}
                  >
                    Formations
                  </button>
                  <button
                    className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('reviews')}
                  >
                    Avis
                  </button>
                </div>
                
                <div className="p-6">
                  {/* Contenu de l'onglet Présentation */}
                  {activeTab === 'overview' && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">À propos de {school.name}</h2>
                      <p className="text-gray-700 mb-6">{school.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-lg font-medium mb-3">Informations</h3>
                          <ul className="space-y-2">
                            <li className="flex">
                              <span className="font-medium w-40">Année de création:</span>
                              <span>{school.foundedYear}</span>
                            </li>
                            <li className="flex">
                              <span className="font-medium w-40">N° d'agrément:</span>
                              <span>{school.registrationNumber}</span>
                            </li>
                            <li className="flex">
                              <span className="font-medium w-40">Représentant légal:</span>
                              <span>{school.legalRepresentative}</span>
                            </li>
                            <li className="flex">
                              <span className="font-medium w-40">Instructeurs:</span>
                              <span>{school.instructors} professionnels</span>
                            </li>
                            <li className="flex">
                              <span className="font-medium w-40">Véhicules:</span>
                              <span>{school.vehicles} véhicules de formation</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-lg font-medium mb-3">Statistiques</h3>
                          <ul className="space-y-2">
                            <li className="flex">
                              <span className="font-medium w-40">Apprenants formés:</span>
                              <span>{school.stats.students}+</span>
                            </li>
                            <li className="flex">
                              <span className="font-medium w-40">Taux de réussite:</span>
                              <span>{school.stats.successRate}%</span>
                            </li>
                            <li className="flex">
                              <span className="font-medium w-40">Cours complétés:</span>
                              <span>{school.stats.coursesCompleted}+</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-medium mb-3">Installations et équipements</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {school.facilities.map((facility, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {facility}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="text-lg font-medium mb-3">Galerie photos</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {school.images.map((image, index) => (
                          <div key={index} className="h-48 rounded-lg overflow-hidden">
                            <img 
                              src={image} 
                              alt={`${school.name} - Image ${index + 1}`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Contenu de l'onglet Formations */}
                  {activeTab === 'licenses' && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Nos formations</h2>
                      <p className="text-gray-700 mb-6">
                        Nous proposons différentes formations adaptées à vos besoins. Choisissez celle qui vous convient le mieux.
                      </p>
                      
                      <div className="space-y-6">
                        {school.licenses.map((license, index) => (
                          <div key={index} className="border rounded-lg overflow-hidden">
                            <div className="bg-gray-50 p-4 border-b">
                              <h3 className="text-lg font-medium">{license.type}</h3>
                            </div>
                            <div className="p-4">
                              <p className="text-gray-700 mb-4">{license.description}</p>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-blue-50 p-3 rounded-lg text-center">
                                  <p className="text-sm text-gray-600 mb-1">Prix</p>
                                  <p className="font-semibold text-blue-700">{formatPrice(license.price)}</p>
                                </div>
                                <div className="bg-green-50 p-3 rounded-lg text-center">
                                  <p className="text-sm text-gray-600 mb-1">Durée</p>
                                  <p className="font-semibold text-green-700">{license.duration}</p>
                                </div>
                                <div className="bg-purple-50 p-3 rounded-lg text-center">
                                  <p className="text-sm text-gray-600 mb-1">Popularité</p>
                                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                    <div 
                                      className="bg-purple-600 h-2.5 rounded-full" 
                                      style={{ width: `${license.popularity}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Contenu de l'onglet Avis */}
                  {activeTab === 'reviews' && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Avis des apprenants</h2>
                      <div className="flex items-center mb-6">
                        <div className="flex mr-2">
                          {renderStars(school.rating)}
                        </div>
                        <span className="text-gray-700">{school.rating} sur 5 ({school.reviewCount} avis)</span>
                      </div>
                      
                      <div className="space-y-6">
                        {school.reviews.map((review) => (
                          <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-medium">{review.user}</h3>
                                <div className="flex text-yellow-400">
                                  {renderStars(review.rating)}
                                </div>
                              </div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Colonne latérale */}
            <div>
              {/* Carte de contact */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Contact</h2>
                  <ul className="space-y-3">
                    <li className="flex">
                      <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{school.address}, {school.city}</span>
                    </li>
                    <li className="flex">
                      <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{school.phone}</span>
                    </li>
                    <li className="flex">
                      <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{school.email}</span>
                    </li>
                    <li className="flex">
                      <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <span>{school.website}</span>
                    </li>
                    <li className="flex">
                      <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{school.openingHours}</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Carte d'action */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Intéressé(e) ?</h2>
                  <p className="text-gray-700 mb-6">
                    Inscrivez-vous dès maintenant ou contactez-nous pour plus d'informations sur nos formations.                    
                  </p>
                  <div className="space-y-3">
                    <Link 
                      href={`/register?school=${school.id}`}
                      className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      S'inscrire comme apprenant
                    </Link>
                    <a 
                      href={`tel:${school.phone}`}
                      className="block w-full bg-white text-blue-600 text-center py-3 px-4 rounded-md border border-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      Appeler
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
