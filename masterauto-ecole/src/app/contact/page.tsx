import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* En-tête de la page */}
        <div className="bg-blue-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Contactez-nous</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions
            </p>
          </div>
        </div>
        
        {/* Section Formulaire de contact et Informations */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Formulaire de contact */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Envoyez-nous un message</h2>
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Sujet de votre message"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Votre message..."
                        required
                      ></textarea>
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                      >
                        Envoyer le message
                      </button>
                    </div>
                  </form>
                </div>
                
                {/* Informations de contact */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Nos coordonnées</h2>
                  
                  <div className="space-y-8">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">Adresse</h3>
                        <p className="text-gray-600">
                          45 Boulevard de la Liberté<br />
                          Akwa, Douala, Cameroun
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">Téléphone</h3>
                        <p className="text-gray-600">+237 233 42 56 78</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                        <p className="text-gray-600">contact@drisman.cm</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">Heures d&apos;ouverture</h3>
                        <p className="text-gray-600">
                          Lundi - Vendredi: 9h00 - 18h00<br />
                          Samedi: 10h00 - 15h00<br />
                          Dimanche: Fermé
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Section Carte */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Nous trouver</h2>
              <div className="w-full h-96 bg-gray-300 rounded-lg overflow-hidden">
                {/* Ici, vous pouvez intégrer une carte Google Maps ou une autre carte */}
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-600">Carte interactive à intégrer ici</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Section FAQ */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Questions fréquentes</h2>
              
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="font-bold text-gray-800 mb-2">Comment puis-je obtenir une démo de Drisman ?</h3>
                  <p className="text-gray-600">
                    Vous pouvez demander une démo en remplissant le formulaire de contact ci-dessus ou en nous appelant directement. 
                    Un membre de notre équipe vous contactera pour organiser une présentation personnalisée de notre plateforme.
                  </p>
                </div>
                
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="font-bold text-gray-800 mb-2">Quels sont les tarifs de Drisman ?</h3>
                  <p className="text-gray-600">
                    Nous proposons différentes formules d&apos;abonnement adaptées à la taille et aux besoins de votre auto-école. 
                    Contactez-nous pour obtenir un devis personnalisé.
                  </p>
                </div>
                
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="font-bold text-gray-800 mb-2">Proposez-vous une formation pour utiliser votre plateforme ?</h3>
                  <p className="text-gray-600">
                    Oui, nous offrons une formation complète à tous nos nouveaux clients. Notre équipe vous accompagne 
                    dans la prise en main de la plateforme et reste disponible pour répondre à vos questions.
                  </p>
                </div>
                
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="font-bold text-gray-800 mb-2">Est-ce que Drisman est compatible avec les autres logiciels que j&apos;utilise ?</h3>
                  <p className="text-gray-600">
                    Drisman dispose d&apos;API ouvertes permettant l&apos;intégration avec de nombreux logiciels tiers. 
                    Contactez-nous pour discuter de vos besoins spécifiques d&apos;intégration.
                  </p>
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
