'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface DrivingSchoolCardProps {
    id: string;
    name: string;
    rating: number;
    maxRating?: number;
    reviewCount: number;
    address: string;
    city: string;
    image?: string;
    onViewDetails?: (id: string) => void;
}

export default function DrivingSchoolCard({
    id,
    name,
    rating,
    maxRating = 5,
    reviewCount,
    address,
    city,
    image = "/images/default-driving-school.jpg",
    onViewDetails,
}: DrivingSchoolCardProps) {
    const router = useRouter();
    // Génére les étoiles pour l'affichage du rating
    const renderStars = () => {
      const stars = [];
      for (let i = 1; i <= maxRating; i++) {
        if (i <= Math.floor(rating)) {
          // Étoile pleine
          stars.push(
            <svg 
              key={i} 
              className="h-5 w-5 text-yellow-400" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        } else if (i - rating < 1) {
          // Étoile partielle pour les demi-étoiles
          stars.push(
            <div key={i} className="relative">
              {/* Contour de l'étoile */}
              <svg 
                className="h-5 w-5 text-gray-300" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {/* Partie remplie de l'étoile */}
              <div 
                className="absolute top-0 left-0 overflow-hidden" 
                style={{ width: `${(rating - Math.floor(rating)) * 100}%` }}
              >
                <svg 
                  className="h-5 w-5 text-yellow-400" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          );
        } else {
          // Étoile vide
          stars.push(
            <svg 
              key={i} 
              className="h-5 w-5 text-gray-300" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        }
      }
      return stars;
    };

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
        {/* Image (optionnelle) */}
        {image && (
          <div className="w-full h-40 overflow-hidden relative">
            <Image 
              src={image} 
              alt={name} 
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        
        {/* Contenu */}
        <div className="p-5 flex-grow flex flex-col">
          <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">{name}</h3>
          
          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex">{renderStars()}</div>
            <span className="ml-2 text-sm text-gray-600">
              {rating.toFixed(1)} ({reviewCount} avis)
            </span>
          </div>
          
          {/* Adresse */}
          <div className="text-gray-600 mb-4 flex-grow">
            <p className="line-clamp-2">{address}, {city}</p>
          </div>
          
          {/* Boutons d'action */}
          <div className="flex space-x-2">
            <button
              onClick={() => onViewDetails ? onViewDetails(id) : router.push(`/driving-school/${id}`)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md transition-colors text-center text-sm"
            >
              Voir les détails
            </button>
            <button
              onClick={() => router.push(`/register?school=${id}`)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-md transition-colors text-center text-sm"
            >
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    );
}