import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* En-tête de la page */}
        <div className="bg-blue-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">À propos de Drisman</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Votre partenaire de confiance pour la gestion professionnelle d&apos;auto-écoles
            </p>
          </div>
        </div>
        
        {/* Section Notre Histoire */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Notre Histoire</h2>
              <p className="text-gray-600 mb-6">
                Fondée en 2023 à Yaoundé, Drisman est née de la vision de simplifier et d&apos;optimiser la gestion des auto-écoles au Cameroun. 
                Notre équipe, composée d&apos;experts en développement logiciel et de professionnels du secteur de l&apos;enseignement 
                de la conduite, a identifié les défis quotidiens auxquels sont confrontées les auto-écoles camerounaises.
              </p>
              <p className="text-gray-600 mb-6">
                Après des mois de recherche et de développement, nous avons lancé une plateforme complète qui répond 
                aux besoins spécifiques des auto-écoles, des moniteurs et des apprenants. Notre solution intégrée permet 
                de gérer efficacement les inscriptions, les plannings, les leçons et le suivi pédagogique, adaptée aux réalités locales.
              </p>
              <p className="text-gray-600">
                Aujourd&apos;hui, Drisman est fière de servir des dizaines d&apos;auto-écoles à travers le Cameroun, de Douala à Garoua, 
                contribuant à la formation de milliers de conducteurs chaque année et à l&apos;amélioration de la sécurité routière.
              </p>
            </div>
          </div>
        </div>
        
        {/* Section Notre Mission */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Notre Mission</h2>
              <p className="text-gray-600 mb-6">
                Chez Drisman, notre mission est de transformer la gestion des auto-écoles grâce à la technologie, 
                en offrant des outils innovants qui simplifient les tâches administratives et améliorent l&apos;expérience 
                d&apos;apprentissage des élèves.
              </p>
              <p className="text-gray-600 mb-6">
                Nous nous engageons à :
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                <li>Simplifier la gestion quotidienne des auto-écoles</li>
                <li>Améliorer la communication entre les auto-écoles, les moniteurs et les élèves</li>
                <li>Optimiser la planification des leçons et la gestion des ressources</li>
                <li>Fournir des analyses détaillées pour aider à la prise de décision</li>
                <li>Garantir la sécurité et la confidentialité des données</li>
              </ul>
              <p className="text-gray-600">
                Notre objectif ultime est de contribuer à la formation de conducteurs responsables et compétents, 
                tout en aidant les auto-écoles à prospérer dans un environnement de plus en plus concurrentiel.
              </p>
            </div>
          </div>
        </div>
        
        {/* Section Notre Équipe */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Notre Équipe</h2>
              <p className="text-gray-600 mb-10">
                Drisman est portée par une équipe passionnée et expérimentée, dédiée à l&apos;innovation et à l&apos;excellence.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Membre 1 */}
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4 overflow-hidden">
                    <img src="/images/team/placeholder.jpg" alt="Membre de l'équipe" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-gray-800">Esther Ngo Mbog</h3>
                  <p className="text-blue-600">Fondatrice & CEO</p>
                </div>
                
                {/* Membre 2 */}
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4 overflow-hidden">
                    <img src="/images/team/placeholder.jpg" alt="Membre de l'équipe" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-gray-800">Paul Biya Atangana</h3>
                  <p className="text-blue-600">Directeur Technique</p>
                </div>
                
                {/* Membre 3 */}
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4 overflow-hidden">
                    <img src="/images/team/placeholder.jpg" alt="Membre de l'équipe" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-gray-800">Chantal Kameni</h3>
                  <p className="text-blue-600">Responsable Produit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Section Nos Valeurs */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Nos Valeurs</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Valeur 1 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-bold text-gray-800 mb-3">Innovation</h3>
                  <p className="text-gray-600">
                    Nous cherchons constamment à innover et à améliorer nos solutions pour répondre aux besoins évolutifs du secteur.
                  </p>
                </div>
                
                {/* Valeur 2 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-bold text-gray-800 mb-3">Excellence</h3>
                  <p className="text-gray-600">
                    Nous nous engageons à fournir des produits et services de la plus haute qualité, sans compromis.
                  </p>
                </div>
                
                {/* Valeur 3 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-bold text-gray-800 mb-3">Collaboration</h3>
                  <p className="text-gray-600">
                    Nous croyons en la puissance de la collaboration, tant au sein de notre équipe qu&apos;avec nos clients.
                  </p>
                </div>
                
                {/* Valeur 4 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-bold text-gray-800 mb-3">Intégrité</h3>
                  <p className="text-gray-600">
                    Nous agissons avec honnêteté, transparence et respect dans toutes nos interactions.
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
