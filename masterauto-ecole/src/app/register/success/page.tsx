'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function RegisterSuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      router.push('/');
    }
  }, [countdown, router]);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg 
                className="h-10 w-10 text-green-600" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Inscription réussie !</h1>
            
            <p className="text-gray-600 mb-6">
              Merci pour votre inscription à notre auto-école. Nous avons bien reçu votre demande et vous serez contacté très prochainement par notre équipe.
            </p>
            
            <p className="text-gray-600 mb-8">
              Un email de confirmation a été envoyé à l&apos;adresse que vous avez fournie avec tous les détails de votre inscription.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
              <button
                onClick={() => router.push('/')}
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
              >
                Retour à l&apos;accueil
              </button>
              
              <button
                onClick={() => router.push('/contact')}
                className="bg-white text-blue-600 border border-blue-600 py-2 px-6 rounded-md hover:bg-blue-50 transition-colors"
              >
                Nous contacter
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mt-8">
              Vous serez redirigé vers la page d&apos;accueil dans {countdown} seconde{countdown !== 1 ? 's' : ''}...
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
