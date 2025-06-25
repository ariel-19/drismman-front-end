'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaUsers, FaStar, FaMoneyBillWave, FaIdCard, FaCar, FaCalendarAlt } from 'react-icons/fa';
import { API_URL } from '../../config/api';

interface DrivingSchool {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  images: string[];
  licenses: {
    type: string;
    price: number;
    duration: string;
    description: string;
    popularity?: number;
  }[];
  rating: number;
  reviewCount: number;
  stats?: {
    students: number;
    successRate: number;
    revenue: number;
  };
}

export default function GestionPage() {
  const params = useParams();
  const router = useRouter();
  const [school, setSchool] = useState<DrivingSchool | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        // Dans une application réelle, vous feriez un appel API ici
        // Pour l'instant, nous utilisons les données stockées dans localStorage
        const storedUsers = localStorage.getItem('registeredUsers');
        if (storedUsers) {
          const users = JSON.parse(storedUsers);
          const currentUser = users.find((user: any) => user.schoolId === params.id);
          
          if (!currentUser) {
            router.push('/auth');
            return;
          }
          
          // Simuler un appel API pour récupérer les données de l'auto-école
          const response = await fetch(`${API_URL}/driving-schools/${params.id}`).catch(() => {
            // Si l'API n'est pas disponible, utiliser des données fictives
            return {
              ok: false,
              json: async () => null
            };
          });
          
          let schoolData;
          if (response.ok) {
            schoolData = await response.json();
          } else {
            // Données fictives pour la démo
            schoolData = {
              id: params.id,
              name: "Auto-école Polytech Yaoundé",
              description: "Centre de formation à la conduite automobile à Yaoundé",
              address: "Quartier Ngoa-Ekelle, Yaoundé",
              city: "Yaoundé",
              phone: "+237 6XX XXX XXX",
              email: currentUser.email,
              images: ['/images/auto1.jpg', '/images/auto2.jpg'],
              licenses: [
                {
                  type: 'Permis A',
                  price: 590000,
                  duration: '2 mois',
                  description: 'Formation complète pour la conduite de moto',
                  popularity: 65
                },
                {
                  type: 'Permis B',
                  price: 787000,
                  duration: '3 mois',
                  description: 'Formation complète pour la conduite de voiture',
                  popularity: 85
                }
              ],
              rating: 4.5,
              reviewCount: 27,
              stats: {
                students: 42,
                successRate: 87,
                revenue: 3500000
              }
            };
          }
          
          setSchool(schoolData);
        } else {
          router.push('/auth');
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchSchoolData();
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de votre espace de gestion...</p>
        </div>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Accès non autorisé</h1>
          <p className="text-gray-600 mb-6">Vous n'avez pas accès à cette auto-école ou elle n'existe pas.</p>
          <button 
            onClick={() => router.push('/auth')}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            Retour à la page de connexion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
              {school.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{school.name}</h1>
              <p className="text-gray-500">{school.city}</p>
            </div>
          </div>
          <button 
            onClick={() => {
              localStorage.removeItem('currentUser');
              router.push('/auth');
            }}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-t border-gray-200">
        <div className="container mx-auto px-4">
          <ul className="flex overflow-x-auto">
            <li className={`py-4 px-6 font-medium cursor-pointer border-b-2 ${activeTab === 'dashboard' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('dashboard')}>
              Tableau de bord
            </li>
            <li className={`py-4 px-6 font-medium cursor-pointer border-b-2 ${activeTab === 'students' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('students')}>
              Élèves
            </li>
            <li className={`py-4 px-6 font-medium cursor-pointer border-b-2 ${activeTab === 'instructors' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('instructors')}>
              Moniteurs
            </li>
            <li className={`py-4 px-6 font-medium cursor-pointer border-b-2 ${activeTab === 'lessons' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('lessons')}>
              Leçons
            </li>
            <li className={`py-4 px-6 font-medium cursor-pointer border-b-2 ${activeTab === 'settings' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('settings')}>
              Paramètres
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FaUsers className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Étudiants actifs</p>
                    <h3 className="text-2xl font-bold">{school.stats?.students || 0}</h3>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <span className="text-green-500 font-medium">+12%</span> depuis le mois dernier
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <FaStar className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Taux de réussite</p>
                    <h3 className="text-2xl font-bold">{school.stats?.successRate || 0}%</h3>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <span className="text-green-500 font-medium">+5%</span> depuis le mois dernier
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <FaMoneyBillWave className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Revenus</p>
                    <h3 className="text-2xl font-bold">{school.stats?.revenue?.toLocaleString() || 0} FCFA</h3>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <span className="text-green-500 font-medium">+18%</span> depuis le mois dernier
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4">
                    <FaIdCard className="text-yellow-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Permis délivrés</p>
                    <h3 className="text-2xl font-bold">32</h3>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <span className="text-green-500 font-medium">+8%</span> depuis le mois dernier
                </div>
              </div>
            </div>
            
            {/* Licenses Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Permis proposés</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {school.licenses.map((license, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <FaCar className="text-blue-600 mr-2" />
                        <h4 className="font-bold text-gray-800">{license.type}</h4>
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">
                        {license.price.toLocaleString()} FCFA
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{license.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>
                        <FaCalendarAlt className="inline mr-1" />
                        {license.duration}
                      </span>
                      <span>{license.popularity || 0}% de popularité</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Activité récente</h3>
              <div className="space-y-4">
                <div className="flex items-start p-3 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                  <div className="mr-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <FaUsers className="text-green-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Nouvel élève inscrit</p>
                    <p className="text-gray-600">Jean Dupont s'est inscrit pour le Permis B</p>
                    <p className="text-sm text-gray-500 mt-1">Il y a 2 heures</p>
                  </div>
                </div>
                
                <div className="flex items-start p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                  <div className="mr-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaCalendarAlt className="text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Nouvelle leçon programmée</p>
                    <p className="text-gray-600">Leçon de conduite avec Marie Lefebvre</p>
                    <p className="text-sm text-gray-500 mt-1">Il y a 5 heures</p>
                  </div>
                </div>
                
                <div className="flex items-start p-3 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
                  <div className="mr-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <FaStar className="text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Nouvel avis client</p>
                    <p className="text-gray-600">Pierre Martin a laissé un avis 5 étoiles</p>
                    <p className="text-sm text-gray-500 mt-1">Il y a 1 jour</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'students' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestion des élèves</h2>
            <p className="text-gray-600">Cette section est en cours de développement.</p>
          </div>
        )}
        
        {activeTab === 'instructors' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestion des moniteurs</h2>
            <p className="text-gray-600">Cette section est en cours de développement.</p>
          </div>
        )}
        
        {activeTab === 'lessons' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestion des leçons</h2>
            <p className="text-gray-600">Cette section est en cours de développement.</p>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Paramètres de l'auto-école</h2>
            <p className="text-gray-600">Cette section est en cours de développement.</p>
          </div>
        )}
      </main>
    </div>
  );
}
