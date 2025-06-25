'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const schoolId = searchParams?.get('school');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    address: '',
    city: '',
    isParent: false,
    childFirstName: '',
    childLastName: '',
    childBirthDate: '',
    licenseType: 'B', // Permis B par défaut
    schoolId: schoolId || '',
  });
  
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Simuler le chargement des auto-écoles (à remplacer par un appel API réel)
  useEffect(() => {
    // Données d'exemple pour les auto-écoles
    const drivingSchools = [
      { id: '1', name: 'Auto-École Excellence', city: 'Douala' },
      { id: '2', name: 'Centre de Formation Routière Biyem-Assi', city: 'Yaoundé' },
      { id: '3', name: 'Auto-École Sécurité Routière', city: 'Bafoussam' },
      { id: '4', name: 'Permis Express Cameroun', city: 'Limbé' },
      { id: '5', name: 'Auto-École Moderne Kribi', city: 'Kribi' },
      { id: '6', name: 'École de Conduite Professionnelle', city: 'Garoua' },
    ];
    
    setSchools(drivingSchools);
    
    if (schoolId) {
      setFormData(prev => ({ ...prev, schoolId }));
    }
  }, [schoolId]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Simulation d'un appel API pour l'inscription
      // À remplacer par un vrai appel API vers votre backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Données d\'inscription:', formData);
      
      // Simuler une réponse réussie
      setSuccess(true);
      setLoading(false);
      
      // Rediriger vers une page de confirmation après 2 secondes
      setTimeout(() => {
        router.push('/register/success');
      }, 2000);
      
    } catch (err) {
      setError('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Inscription à l&apos;auto-école</h1>
            
            {success ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                <p>Votre inscription a été enregistrée avec succès ! Vous allez être redirigé...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Sélection de l'auto-école */}
                <div>
                  <label htmlFor="schoolId" className="block text-sm font-medium text-gray-700 mb-1">
                    Auto-école <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="schoolId"
                    name="schoolId"
                    value={formData.schoolId}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Sélectionnez une auto-école</option>
                    {schools.map(school => (
                      <option key={school.id} value={school.id}>
                        {school.name} ({school.city})
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Type de permis */}
                <div>
                  <label htmlFor="licenseType" className="block text-sm font-medium text-gray-700 mb-1">
                    Type de permis <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="licenseType"
                    name="licenseType"
                    value={formData.licenseType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="A">Permis A (Moto)</option>
                    <option value="B">Permis B (Voiture)</option>
                    <option value="C">Permis C (Poids lourd)</option>
                    <option value="D">Permis D (Transport en commun)</option>
                    <option value="E">Permis E (Remorque)</option>
                  </select>
                </div>
                
                {/* Inscription pour soi-même ou pour un enfant */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isParent"
                    name="isParent"
                    checked={formData.isParent}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isParent" className="ml-2 block text-sm text-gray-700">
                    Je suis un parent qui inscrit son enfant
                  </label>
                </div>
                
                {/* Section pour les informations personnelles */}
                <div className="border-t border-gray-200 pt-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    {formData.isParent ? "Informations du parent" : "Vos informations personnelles"}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        Prénom <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nom <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Téléphone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    {!formData.isParent && (
                      <div>
                        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Date de naissance <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          id="birthDate"
                          name="birthDate"
                          value={formData.birthDate}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required={!formData.isParent}
                        />
                      </div>
                    )}
                    
                    <div className={formData.isParent ? "md:col-span-2" : ""}>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Adresse <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        Ville <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Section pour les informations de l'enfant (conditionnelle) */}
                {formData.isParent && (
                  <div className="border-t border-gray-200 pt-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Informations de l&apos;enfant</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="childFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                          Prénom de l&apos;enfant <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="childFirstName"
                          name="childFirstName"
                          value={formData.childFirstName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required={formData.isParent}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="childLastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Nom de l&apos;enfant <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="childLastName"
                          name="childLastName"
                          value={formData.childLastName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required={formData.isParent}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="childBirthDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Date de naissance de l&apos;enfant <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          id="childBirthDate"
                          name="childBirthDate"
                          value={formData.childBirthDate}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required={formData.isParent}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Message d'erreur */}
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p>{error}</p>
                  </div>
                )}
                
                {/* Bouton de soumission */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors ${
                      loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? 'Inscription en cours...' : 'S\'inscrire'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
