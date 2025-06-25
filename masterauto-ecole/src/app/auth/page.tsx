"use client";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { authService, DrivingSchoolRegistration } from "../services/auth-service";

// Composant principal qui sera enveloppé dans Suspense
export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <AuthContent />
    </Suspense>
  );
}

// Composant qui utilise useSearchParams
function AuthContent() {
  const [form, setForm] = useState<'none' | 'signup' | 'login'>('none');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [registrationData, setRegistrationData] = useState<DrivingSchoolRegistration>({
    name: '',
    address: '',
    city: '',
    taxNumber: '',
    managerName: '',
    email: '',
    phone: '',
    password: '',
    licenses: [
      {
        type: 'Permis A',
        price: 590000,
        duration: '2 mois',
        description: 'Formation complète pour la conduite de moto'
      }
    ],
    images: [],
    successRate: 0,
    students: 0
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  
  useEffect(() => {
    const formParam = searchParams.get('form');
    if (formParam === 'login') {
      setForm('login');
    } else if (formParam === 'signup') {
      setForm('signup');
    }
  }, [searchParams]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Fonction pour gérer les changements dans les champs numériques
  const handleNumberChange = (name: string, value: number) => {
    setRegistrationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-100 to-blue-600 p-4">
      {/* Header / Logo */}
      <div className="flex flex-col items-center mb-8">
        <Image src="/car-logo.png" alt="Logo Auto-école" width={80} height={80} className="mb-2 drop-shadow-lg" />
        <h1 className="text-4xl font-extrabold text-blue-900 mb-2 tracking-tight">Bienvenue sur la plateforme nationale des auto-écoles</h1>
        <p className="text-blue-800 text-center max-w-xl bg-white/70 rounded-lg px-4 py-1 shadow-sm">Référencez votre auto-école ou connectez-vous pour gérer vos informations et vos élèves.</p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 mb-8">
        <button
          className={`px-6 py-2 rounded-full font-semibold border border-blue-700 text-white bg-blue-700 hover:bg-blue-800 shadow transition-all duration-200 ${form === 'signup' ? 'ring-2 ring-blue-400' : ''}`}
          onClick={() => setForm('signup')}
        >
          S&apos;inscrire
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold border border-blue-700 text-blue-700 bg-white hover:bg-blue-50 shadow transition-all duration-200 ${form === 'login' ? 'ring-2 ring-blue-400' : ''}`}
          onClick={() => setForm('login')}
        >
          Se connecter
        </button>
      </div>

      {/* Forms */}
      <div className="w-full max-w-md">
        {showSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 shadow-md animate-fade-in">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="font-bold">Inscription réussie !</p>
            </div>
            <p className="text-sm mt-1">Votre auto-école a été référencée avec succès. Vous allez être redirigé vers la page d'accueil dans quelques secondes...</p>
          </div>
        )}
        
        {form === 'signup' && !showSuccess && (
          <form 
            className="bg-white/90 p-8 rounded-2xl shadow-2xl flex flex-col gap-4 animate-fade-in border border-blue-100"
            onSubmit={async (e) => {
              e.preventDefault();
              setIsLoading(true);
              try {
                // S'assurer que toutes les données requises sont présentes
                if (!registrationData.name || !registrationData.address || !registrationData.city) {
                  throw new Error('Veuillez remplir tous les champs obligatoires');
                }
                
                // Vérifier que l'utilisateur a sélectionné au moins un type de permis
                if (registrationData.licenses.length === 0) {
                  throw new Error('Veuillez sélectionner au moins un type de permis');
                }
                
                const result = await authService.registerDrivingSchool(registrationData);
                console.log('Inscription réussie:', result);
                
                setShowSuccess(true);
                setIsLoading(false);
                
                // Rediriger vers la page d'accueil après 3 secondes
                setTimeout(() => {
                  router.push('/');
                }, 3000);
              } catch (error: any) {
                console.error('Erreur lors de l\'inscription:', error);
                setIsLoading(false);
                alert(error.message || 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
              }
            }}
          >
            <h2 className="text-2xl font-bold text-blue-800 mb-2">Inscription d&apos;une auto-école</h2>
            
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Informations générales</h3>
              <input 
                className="border border-blue-200 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 w-full mb-3" 
                type="text" 
                name="name"
                value={registrationData.name}
                onChange={handleInputChange}
                placeholder="Nom de l&apos;auto-école" 
                required 
              />
              <input 
                className="border border-blue-200 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 w-full mb-3" 
                type="text" 
                name="address"
                value={registrationData.address}
                onChange={handleInputChange}
                placeholder="Adresse complète" 
                required 
              />
              <input 
                className="border border-blue-200 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 w-full mb-3" 
                type="text" 
                name="city"
                value={registrationData.city}
                onChange={handleInputChange}
                placeholder="Ville" 
                required 
              />
            </div>
            
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Informations légales</h3>
              <input 
                className="border border-blue-200 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 w-full mb-3" 
                type="text" 
                name="taxNumber"
                value={registrationData.taxNumber}
                onChange={handleInputChange}
                placeholder="Numéro de contribuable" 
                required 
              />
              <input 
                className="border border-blue-200 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 w-full mb-3" 
                type="text" 
                name="managerName"
                value={registrationData.managerName}
                onChange={handleInputChange}
                placeholder="Nom du responsable" 
                required 
              />
            </div>
            
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Permis proposés</h3>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="permisA" 
                    className="mr-2"
                    checked={registrationData.licenses.some(l => l.type === 'Permis A')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setRegistrationData({
                          ...registrationData,
                          licenses: [...registrationData.licenses, {
                            type: 'Permis A',
                            price: 590000,
                            duration: '2 mois',
                            description: 'Formation complète pour la conduite de moto'
                          }]
                        });
                      } else {
                        setRegistrationData({
                          ...registrationData,
                          licenses: registrationData.licenses.filter(l => l.type !== 'Permis A')
                        });
                      }
                    }}
                  />
                  <label htmlFor="permisA">Permis A (Moto)</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="permisB" 
                    className="mr-2"
                    checked={registrationData.licenses.some(l => l.type === 'Permis B')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setRegistrationData({
                          ...registrationData,
                          licenses: [...registrationData.licenses, {
                            type: 'Permis B',
                            price: 787000,
                            duration: '3 mois',
                            description: 'Formation complète pour la conduite de voiture'
                          }]
                        });
                      } else {
                        setRegistrationData({
                          ...registrationData,
                          licenses: registrationData.licenses.filter(l => l.type !== 'Permis B')
                        });
                      }
                    }}
                  />
                  <label htmlFor="permisB">Permis B (Voiture)</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="permisC" 
                    className="mr-2"
                    checked={registrationData.licenses.some(l => l.type === 'Permis C')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setRegistrationData({
                          ...registrationData,
                          licenses: [...registrationData.licenses, {
                            type: 'Permis C',
                            price: 985000,
                            duration: '4 mois',
                            description: 'Formation pour la conduite de poids lourds'
                          }]
                        });
                      } else {
                        setRegistrationData({
                          ...registrationData,
                          licenses: registrationData.licenses.filter(l => l.type !== 'Permis C')
                        });
                      }
                    }}
                  />
                  <label htmlFor="permisC">Permis C (Poids lourds)</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="permisD" 
                    className="mr-2"
                    checked={registrationData.licenses.some(l => l.type === 'Permis D')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setRegistrationData({
                          ...registrationData,
                          licenses: [...registrationData.licenses, {
                            type: 'Permis D',
                            price: 1180000,
                            duration: '4 mois',
                            description: 'Formation pour le transport en commun'
                          }]
                        });
                      } else {
                        setRegistrationData({
                          ...registrationData,
                          licenses: registrationData.licenses.filter(l => l.type !== 'Permis D')
                        });
                      }
                    }}
                  />
                  <label htmlFor="permisD">Permis D (Transport en commun)</label>
                </div>
              </div>
            </div>
            
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Statistiques</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Nombre d'étudiants actifs</label>
                  <input 
                    className="border border-blue-200 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 w-full" 
                    type="number" 
                    name="students"
                    value={registrationData.students}
                    onChange={(e) => setRegistrationData({
                      ...registrationData,
                      students: parseInt(e.target.value) || 0
                    })}
                    placeholder="0" 
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Taux de réussite (%)</label>
                  <input 
                    className="border border-blue-200 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 w-full" 
                    type="number" 
                    name="successRate"
                    value={registrationData.successRate}
                    onChange={(e) => setRegistrationData({
                      ...registrationData,
                      successRate: parseInt(e.target.value) || 0
                    })}
                    placeholder="0" 
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>
            
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Informations de contact</h3>
              <input 
                className="border border-blue-200 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 w-full mb-3" 
                type="email" 
                name="email"
                value={registrationData.email}
                onChange={handleInputChange}
                placeholder="Email de contact" 
                required 
              />
              <input 
                className="border border-blue-200 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 w-full mb-3" 
                type="tel" 
                name="phone"
                value={registrationData.phone}
                onChange={handleInputChange}
                placeholder="Téléphone de contact" 
                required 
              />
              <input 
                className="border border-blue-200 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 w-full" 
                type="password" 
                name="password"
                value={registrationData.password}
                onChange={handleInputChange}
                placeholder="Mot de passe" 
                required 
              />
            </div>
            
            <button 
              type="submit" 
              className={`mt-2 bg-blue-700 text-white font-semibold rounded-full py-2 hover:bg-blue-800 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Inscription en cours...' : 'Référencer mon auto-école'}
            </button>
          </form>
        )}
        {form === 'login' && (
          <form 
            className="bg-white/90 p-8 rounded-2xl shadow-2xl flex flex-col gap-4 animate-fade-in border border-blue-100"
            onSubmit={async (e) => {
              e.preventDefault();
              setIsLoading(true);
              try {
                // Connexion réelle qui vérifie les identifiants
                const result = await authService.login(registrationData.email, registrationData.password);
                // Rediriger vers la page de gestion spécifique de l'auto-école
                router.push(`/gestion/${result.userId}`);
              } catch (error) {
                console.error('Erreur de connexion:', error);
                setIsLoading(false);
                alert('Erreur de connexion. Vérifiez vos identifiants.');
              }
            }}
          >
            <h2 className="text-2xl font-bold text-blue-800 mb-2">Connexion à l&apos;espace auto-école</h2>
            <input 
              className="border border-blue-200 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400" 
              type="email" 
              name="email"
              value={registrationData.email}
              onChange={handleInputChange}
              placeholder="Email de contact" 
              required 
            />
            <input 
              className="border border-blue-200 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400" 
              type="password" 
              name="password"
              value={registrationData.password}
              onChange={handleInputChange}
              placeholder="Mot de passe" 
              required 
            />
            <button 
              type="submit" 
              className={`mt-2 bg-blue-700 text-white font-semibold rounded-full py-2 hover:bg-blue-800 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
