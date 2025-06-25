import Image from 'next/image';

interface HeroProps {
  slogan: string;
  imageUrl: string;
  subTitle?: string;
  features?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export default function Hero({ slogan, imageUrl, subTitle, features = [] }: HeroProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-16">
        {/* Section principale */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
              {slogan}
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              {subTitle || "Comparez les auto-écoles, consultez les avis et trouvez celle qui vous correspond."}
            </p>

            {/* Bouton d'action */}
            <div className="mt-8">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg">
                Commencer ma recherche
              </button>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="relative w-full h-80">
              <Image
                src={imageUrl}
                alt="Auto-école"
                fill
                className="rounded-lg shadow-xl object-cover"
              />
            </div>
          </div>
        </div>

        {/* Caractéristiques / Avantages */}
        {features && features.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <i className={`${feature.icon} text-blue-600`}></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
