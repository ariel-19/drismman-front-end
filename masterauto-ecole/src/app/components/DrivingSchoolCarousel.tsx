import { useState, useEffect, useRef } from 'react';
import DrivingSchoolCard from './DrivingSchoolCard2';

interface DrivingSchool {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  address: string;
  city: string;
  image?: string;
}

interface DrivingSchoolsCarouselProps {
  schools: DrivingSchool[];
  title?: string;
  autoScrollInterval?: number; // en millisecondes
  onSchoolClick?: (id: string) => void;
}

export default function DrivingSchoolsCarousel({ 
  schools, 
  title = "Les meilleures auto-écoles", 
  autoScrollInterval = 5000,
  onSchoolClick,
}: DrivingSchoolsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Nombre d'éléments à afficher selon la taille de l'écran
  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 4; // xl
      if (window.innerWidth >= 1024) return 3; // lg
      if (window.innerWidth >= 768) return 2; // md
      return 1; // sm et xs
    }
    return 3; // Valeur par défaut pour SSR
  };
  
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  
  // Mettre à jour le nombre d'éléments visibles lors du redimensionnement
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Auto-scroll
  useEffect(() => {
    if (!isAutoScrolling) return;
    
    const interval = setInterval(() => {
      // Avancer au prochain groupe
      setCurrentIndex((prevIndex) => 
        prevIndex + visibleCount >= schools.length ? 0 : prevIndex + visibleCount
      );
    }, autoScrollInterval);
    
    return () => clearInterval(interval);
  }, [currentIndex, isAutoScrolling, autoScrollInterval, schools.length, visibleCount]);
  
  // Navigation
  const scrollPrev = () => {
    setCurrentIndex((prevIndex) => 
      Math.max(0, prevIndex - visibleCount)
    );
    setIsAutoScrolling(false);
  };
  
  const scrollNext = () => {
    setCurrentIndex((prevIndex) => 
      Math.min(schools.length - visibleCount, prevIndex + visibleCount)
    );
    setIsAutoScrolling(false);
  };
  
  // Scroll vers un groupe spécifique
  const scrollToGroup = (index: number) => {
    setCurrentIndex(index * visibleCount);
    setIsAutoScrolling(false);
  };
  
  // Calculer le nombre de groupes
  const groupCount = Math.ceil(schools.length / visibleCount);
  const currentGroup = Math.floor(currentIndex / visibleCount);
  
  // Gérer le survol
  const handleMouseEnter = () => setIsAutoScrolling(false);
  const handleMouseLeave = () => setIsAutoScrolling(true);
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Titre et navigation */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          
          {/* Boutons de navigation */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={scrollPrev}
              disabled={currentIndex === 0}
              className={`p-2 rounded-full ${
                currentIndex === 0 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7" 
                />
              </svg>
            </button>
            
            <button 
              onClick={scrollNext}
              disabled={currentIndex >= schools.length - visibleCount}
              className={`p-2 rounded-full ${
                currentIndex >= schools.length - visibleCount
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Carrousel */}
        <div 
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            ref={scrollContainerRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
          >
            {schools.map((school) => (
              <div 
                key={school.id} 
                className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 p-3"
              >
                <DrivingSchoolCard
                  key={school.id}
                  id={school.id}
                  name={school.name}
                  rating={school.rating}
                  reviewCount={school.reviewCount}
                  address={school.address}
                  city={school.city}
                  image={school.image}
                  onViewDetails={onSchoolClick}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Indicateurs de page */}
        {groupCount > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: groupCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToGroup(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentGroup ? 'w-6 bg-blue-600' : 'w-2 bg-gray-300'
                }`}
                aria-label={`Groupe ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}