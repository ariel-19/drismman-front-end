'use client';

import { useRouter } from 'next/navigation';

import Hero from './components/Hero';
import DrivingSchoolsCarousel from './components/DrivingSchoolCarousel';

// Données d'exemple pour les auto-écoles
const drivingSchools = [
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
];

// Caractéristiques pour le hero
const heroFeatures = [
  {
    icon: "fas fa-search",
    title: "Comparaison facile",
    description: "Comparez les tarifs et services de toutes les auto-écoles près de chez vous."
  },
  {
    icon: "fas fa-star",
    title: "Avis vérifiés",
    description: "Consultez les avis d'anciens élèves pour faire le bon choix."
  },
  {
    icon: "fas fa-percentage",
    title: "Meilleurs prix",
    description: "Trouvez les meilleures offres et promotions pour votre permis."
  }
];

export default function HomePage() {
  const router = useRouter();

  
  

  

  const handleViewDetails = (schoolId: string) => {
    router.push(`/driving-school/${schoolId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barre de navigation avec barre de recherche intégrée */}
      
      
      {/* Section Hero */}
      <Hero 
        slogan="La route vers votre permis commence ici" 
        imageUrl="/images/Auto.PNG"
        subTitle="Trouvez la meilleure auto-école près de chez vous et comparez les tarifs, avis et services en quelques clics."
        features={heroFeatures}
      />
      
      {/* Section des meilleures auto-écoles avec défilement automatique */}
      <DrivingSchoolsCarousel 
        schools={drivingSchools} 
        onSchoolClick={(schoolId) => handleViewDetails(schoolId)}
        title="Les meilleures auto-écoles" 
        autoScrollInterval={6000} 
      />
      
      {/* Section des auto-écoles à proximité */}
      <DrivingSchoolsCarousel 
        schools={drivingSchools.slice().sort(() => Math.random() - 0.5)} 
        title="Auto-écoles près de chez vous" 
        autoScrollInterval={7000} 
      />
      
      {/* Section des avantages */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-12">
            Pourquoi choisir Drisman ?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg 
                  className="h-8 w-8 text-blue-600" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Trouvez facilement</h3>
              <p className="text-gray-600">
                Plus de 200 auto-écoles référencées partout au Cameroun. Utilisez nos filtres pour trouver celle qui répond à vos besoins.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg 
                  className="h-8 w-8 text-blue-600" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Avis vérifiés</h3>
              <p className="text-gray-600">
                Tous nos avis sont laissés par des personnes ayant réellement fréquenté les auto-écoles pour une transparence totale.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg 
                  className="h-8 w-8 text-blue-600" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Économisez</h3>
              <p className="text-gray-600">
                Comparez les tarifs et les formules pour trouver l&apos;auto-école qui correspond à votre budget et à vos besoins.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section CTA pour les propriétaires d'auto-écoles */}
      <div className="bg-blue-600 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0 text-white">
              <h2 className="text-2xl font-bold mb-2">Propriétaire d&apos;une auto-école ?</h2>
              <p className="text-blue-100">
                Rejoignez notre plateforme et développez votre visibilité. Plus de 10 000 élèves potentiels consultent notre site chaque jour.
              </p>
            </div>
            <div>
              <button className="bg-white text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-lg font-medium transition-colors shadow-lg">
                S&apos;inscrire maintenant
              </button>
            </div>
          </div>
        </div>
      </div>
      
    
    </div>
  );
}