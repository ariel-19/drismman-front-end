'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCar, FaChevronLeft, FaChevronRight, FaUsers, FaCalendar } from 'react-icons/fa';

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface DrivingSchool {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  images: string[];
  licenses: {
    type: string;
    price: number;
    duration: string;
    description: string;
    popularity: number;
  }[];
  rating: number;
  reviews: Review[];
  registrationNumber?: string;
  legalRepresentative?: string;
  cinRepresentative?: string;
  city?: string;
  stats?: {
    students: number;
    successRate: number;
    revenue: number;
  };
}

const DrivingSchoolCard = ({ school }: { school: DrivingSchool }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
  });
  const [reviews, setReviews] = useState(school.reviews || []);

  // Défilement automatique
  useEffect(() => {
    if (!isAutoScrolling) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex + 1 >= school.images.length ? 0 : prevIndex + 1
      );
    }, 5000); // Change d'image toutes les 5 secondes
    
    return () => clearInterval(interval);
  }, [isAutoScrolling, school.images.length]);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % school.images.length);
    setIsAutoScrolling(false);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + school.images.length) % school.images.length);
    setIsAutoScrolling(false);
  };

  const handleSubmitReview = () => {
    if (newReview.rating === 0 || !newReview.comment.trim()) {
      alert('Veuillez donner une note et écrire un commentaire');
      return;
    }

    // Créer un nouvel avis
    const newReviewData = {
      id: reviews.length + 1,
      user: 'Utilisateur', // À remplacer par l'utilisateur connecté
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString('fr-FR')
    };

    // Ajouter le nouvel avis à la liste
    setReviews([...reviews, newReviewData]);

    // Réinitialiser le formulaire
    setNewReview({ rating: 0, comment: '' });
    setShowReviewForm(false);
  };

  return (
    <div className="w-full p-4">
      <div className="bg-white rounded-t-2xl shadow-xl overflow-hidden max-w-[2000px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="lg:border-r lg:border-gray-100">
            {/* Header Section with Carousel */}
            <div 
              className="relative h-[32rem] overflow-hidden group"
              onMouseEnter={() => setIsAutoScrolling(false)}
              onMouseLeave={() => setIsAutoScrolling(true)}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ 
                  transform: `translateX(-${currentImageIndex * 100}%)`,
                }}
              >
                {school.images.map((image, index) => (
                  <div key={index} className="relative w-full h-full flex-shrink-0">
                    <Image
                      src={image}
                      alt={`${school.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={index === 0}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
              {/* Navigation Arrows */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-white transition-all duration-300 shadow-lg"
                aria-label="Image précédente"
              >
                <FaChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-white transition-all duration-300 shadow-lg"
                aria-label="Image suivante"
              >
                <FaChevronRight className="w-6 h-6" />
              </button>
              {/* Dots Navigation */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                {school.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentImageIndex === index
                      ? 'bg-white scale-110'
                      : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Aller à l&apos;image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Stats Section */}
            {school.stats && (
              <div className="grid grid-cols-3 gap-4 p-6">
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <div className="flex items-center">
                    <FaUsers className="w-6 h-6 text-royal-blue mr-2" />
                    <div>
                      <p className="text-gray-500">Étudiants</p>
                      <p className="text-2xl font-bold text-royal-blue">{school.stats.students}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <div className="flex items-center">
                    <FaStar className="w-6 h-6 text-royal-blue mr-2" />
                    <div>
                      <p className="text-gray-600">Taux de réussite</p>
                      <p className="text-2xl font-bold text-royal-blue">{school.stats.successRate}%</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <div className="flex items-center">
                    <FaCar className="w-6 h-6 text-royal-blue mr-2" />
                    <div>
                      <p className="text-gray-500">Revenus</p>
                      <p className="text-2xl font-bold text-royal-blue">{school.stats.revenue.toLocaleString()} FCFA</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="p-6 lg:shadow-sm lg:rounded-r-lg lg:bg-white/50">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{school.name}</h1>
              <p className="text-gray-600 mt-2">{school.description}</p>
              <div className="flex items-center mb-2">
                {renderStars(school.rating)}
                <span className="ml-2 text-gray-600">
                  ({reviews.length} reviews)
                </span>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="w-5 h-5 mr-3 text-royal-blue" />
                <span>{school.address}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaPhone className="w-5 h-5 mr-3 text-royal-blue" />
                <span>{school.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaEnvelope className="w-5 h-5 mr-3 text-royal-blue" />
                <span>{school.email}</span>
              </div>
            </div>

            {/* Legal Information */}
            {(school.registrationNumber || school.legalRepresentative || school.cinRepresentative || school.city) && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Informations légales
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {school.registrationNumber && (
                    <p className="text-gray-600">
                      <span className="font-medium block">Numéro d&apos;enregistrement</span>
                      {school.registrationNumber}
                    </p>
                  )}
                  {school.legalRepresentative && (
                    <p className="text-gray-600">
                      <span className="font-medium block">Représentant légal</span>
                      {school.legalRepresentative}
                    </p>
                  )}
                  {school.cinRepresentative && (
                    <p className="text-gray-600">
                      <span className="font-medium block">CIN représentant</span>
                      {school.cinRepresentative}
                    </p>
                  )}
                  {school.city && (
                    <p className="text-gray-600">
                      <span className="font-medium block">Ville</span>
                      {school.city}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section - Licenses */}
        <div className="p-6 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Permis disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {school.licenses.map((license, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-royal-blue">{license.type}</h3>
                  <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-base font-semibold">
                    {license.price.toLocaleString()} FCFA
                  </span>
                </div>
                <p className="text-gray-700 text-base mb-4">{license.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">
                    <FaCalendar className="inline mr-2" />
                    Durée: {license.duration}
                  </span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
                      <div 
                        className="bg-green-500 h-2.5 rounded-full" 
                        style={{ width: `${license.popularity}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600">{license.popularity}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Avis des élèves</h2>
            <button 
              className="bg-royal-blue text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              {showReviewForm ? 'Annuler' : 'Ajouter un avis'}
            </button>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">Écrire un avis</h3>
              <div className="flex mb-4">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`w-6 h-6 cursor-pointer ${
                      index < newReview.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    onClick={() => setNewReview({ ...newReview, rating: index + 1 })}
                  />
                ))}
              </div>
              <textarea
                className="w-full p-4 border rounded-lg mb-4"
                rows={4}
                placeholder="Partagez votre expérience..."
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              />
              <button 
                className="bg-royal-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={handleSubmitReview}
              >
                Publier l&apos;avis
              </button>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{review.user}</h3>
                    <p className="text-gray-500 text-sm">{review.date}</p>
                  </div>
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="mt-2 text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrivingSchoolCard;
