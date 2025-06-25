'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  FiEdit, 
  FiSave, 
  FiStar, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiShield, 
  FiCreditCard, 
  FiUsers, 
  FiAward, 
  FiImage, 
  FiTrash2, 
  FiPlus 
} from 'react-icons/fi';

type Permis = {
  id: string;
  type: string;
  prix: number;
  duree: string;
  description: string;
  popularite: number;
};

type Avis = {
  id: string;
  utilisateur: string;
  note: number;
  commentaire: string;
  date: string;
};

const PermisCard = ({ data, onEdit }: { data: Permis, onEdit: () => void }) => (
  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
    <div className="flex justify-between items-start">
      <h3 className="text-xl font-bold text-royal-blue">{data.type}</h3>
      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
        {data.prix} €
      </div>
    </div>
    <p className="text-gray-600 mt-2">{data.description}</p>
    <div className="mt-4 flex justify-between items-center">
      <span className="text-gray-500">{data.duree}</span>
      <div className="flex items-center">
        <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
          <div 
            className="bg-green-500 h-2.5 rounded-full" 
            style={{ width: `${data.popularite}%` }}
          ></div>
        </div>
        <span className="text-sm text-gray-500">{data.popularite}%</span>
      </div>
    </div>
    <button 
      onClick={onEdit}
      className="mt-4 text-royal-blue hover:text-blue-700 flex items-center"
    >
      <FiEdit className="mr-1" /> Modifier
    </button>
  </div>
);

const AvisItem = ({ avis, onReply }: { avis: Avis, onReply: (id: string, reply: string) => void }) => {
  const [replyText, setReplyText] = useState('');

  return (
    <div className="border border-gray-200 rounded-lg p-6 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{avis.utilisateur}</h3>
          <p className="text-gray-500 text-sm">{new Date(avis.date).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              className={`${i < avis.note ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} ml-1`}
            />
          ))}
        </div>
      </div>
      <p className="mt-3 text-gray-600">{avis.commentaire}</p>
      
      <div className="mt-4">
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Répondre à cet avis..."
        />
        <button 
          onClick={() => {
            onReply(avis.id, replyText);
            setReplyText('');
          }}
          className="mt-2 bg-royal-blue text-white px-4 py-1 rounded"
        >
          Publier la réponse
        </button>
      </div>
    </div>
  );
};

export default function GestionAutoEcole() {
  const [autoEcole, setAutoEcole] = useState({
    nom: "Auto-École Excellence",
    numeroEnregistrement: "AE-123456",
    representantLegal: "Jean Dupont",
    cinRepresentant: "AB123456",
    adresse: "123 Avenue de la Conduite",
    ville: "Paris",
    telephone: "01 23 45 67 89",
    email: "contact@autoecole-excellence.fr",
    description: "Notre auto-école offre des formations de qualité depuis 15 ans."
  });

  const [permis, setPermis] = useState<Permis[]>([
    {
      id: '1',
      type: 'Permis B',
      prix: 1200,
      duree: '3 mois',
      description: 'Formation complète pour voiture',
      popularite: 85
    },
    {
      id: '2',
      type: 'Permis A',
      prix: 900,
      duree: '2 mois',
      description: 'Formation pour moto',
      popularite: 65
    }
  ]);

  const [avis] = useState<Avis[]>([
    {
      id: '1',
      utilisateur: 'Marie Lambert',
      note: 5,
      commentaire: 'Excellente formation, moniteur très patient !',
      date: '2023-05-15'
    },
    {
      id: '2',
      utilisateur: 'Thomas Durand',
      note: 4,
      commentaire: 'Bon rapport qualité-prix, mais un peu long pour obtenir une date d&apos;examen',
      date: '2023-04-22'
    }
  ]);

  const [, setReplies] = useState<Record<string, string[]>>({});
  const [editingInfo, setEditingInfo] = useState(false);
  const [editingPermisId, setEditingPermisId] = useState<string | null>(null);
  const [newPermis, setNewPermis] = useState<Omit<Permis, 'id'>>({ 
    type: '', 
    prix: 0, 
    duree: '', 
    description: '', 
    popularite: 0 
  });
  const [formData, setFormData] = useState({ ...autoEcole });
  const [stats, setStats] = useState({
    students: 150,
    successRate: 85,
    revenue: 5000000
  });
  const [tempStats, setTempStats] = useState({
    students: 150,
    successRate: 85,
    revenue: 5000000
  });
  const [isEditingStats, setIsEditingStats] = useState({
    students: false,
    successRate: false,
    revenue: false
  });
  const [images, setImages] = useState<string[]>([
    '/images/school-1.jpg',
    '/images/school-2.jpg',
    '/images/school-3.jpg',
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImages([...images, imageUrl]);
    }
  };

  const handleDeleteImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        students: 142,
        successRate: 87,
        revenue: 12500
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleEditInfo = () => {
    setFormData({ ...autoEcole });
    setEditingInfo(true);
  };

  const handleSaveInfo = () => {
    setAutoEcole({ ...formData });
    setEditingInfo(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePermisChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPermis(prev => ({ 
      ...prev, 
      [name]: name === 'prix' || name === 'popularite' ? Number(value) : value 
    }));
  };

  const handleAddPermis = () => {
    setPermis(prev => [...prev, { ...newPermis, id: Date.now().toString() }]);
    setNewPermis({ type: '', prix: 0, duree: '', description: '', popularite: 0 });
  };

  const handleUpdatePermis = (updatedPermis: Permis) => {
    setPermis(prev => prev.map(p => p.id === updatedPermis.id ? updatedPermis : p));
    setEditingPermisId(null);
  };

  // Les fonctions handleCancelEdit et handleDeletePermis ont été supprimées car non utilisées

  const handleReply = (avisId: string, reply: string) => {
    setReplies(prev => ({
      ...prev,
      [avisId]: [...(prev[avisId] || []), reply]
    }));
  };

  const handleEditStat = (stat: 'students' | 'successRate' | 'revenue') => {
    setIsEditingStats(prev => ({ ...prev, [stat]: true }));
    setTempStats(prev => ({ ...prev, [stat]: stats[stat] }));
  };

  const handleSaveStat = (stat: 'students' | 'successRate' | 'revenue') => {
    setStats(prev => ({ ...prev, [stat]: tempStats[stat] }));
    setIsEditingStats(prev => ({ ...prev, [stat]: false }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-royal-blue mb-8">{autoEcole.nom}</h1>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Étudiants actifs</h3>
              {isEditingStats.students ? (
                <button
                  onClick={() => handleSaveStat('students')}
                  className="text-green-600 hover:text-green-700"
                  title="Sauvegarder"
                >
                  <FiSave className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() => handleEditStat('students')}
                  className="text-gray-600 hover:text-gray-700"
                  title="Modifier"
                >
                  <FiEdit className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="flex items-center">
              <FiUsers className="w-8 h-8 text-royal-blue mr-3" />
              {isEditingStats.students ? (
                <input
                  type="number"
                  value={tempStats.students}
                  onChange={(e) => setTempStats(prev => ({ ...prev, students: parseInt(e.target.value) || 0 }))}
                  className="text-3xl font-bold text-gray-800 w-24 border rounded px-2"
                />
              ) : (
                <span className="text-3xl font-bold text-gray-800">{stats.students}</span>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Taux de réussite</h3>
              {isEditingStats.successRate ? (
                <button
                  onClick={() => handleSaveStat('successRate')}
                  className="text-green-600 hover:text-green-700"
                  title="Sauvegarder"
                >
                  <FiSave className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() => handleEditStat('successRate')}
                  className="text-gray-600 hover:text-gray-700"
                  title="Modifier"
                >
                  <FiEdit className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="flex items-center">
              <FiAward className="w-8 h-8 text-royal-blue mr-3" />
              {isEditingStats.successRate ? (
                <div className="flex items-center">
                  <input
                    type="number"
                    value={tempStats.successRate}
                    onChange={(e) => setTempStats(prev => ({ ...prev, successRate: Math.min(100, parseInt(e.target.value) || 0) }))}
                    className="text-3xl font-bold text-gray-800 w-20 border rounded px-2"
                  />
                  <span className="text-3xl font-bold text-gray-800 ml-1">%</span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-800">{stats.successRate}%</span>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Revenus</h3>
              {isEditingStats.revenue ? (
                <button
                  onClick={() => handleSaveStat('revenue')}
                  className="text-green-600 hover:text-green-700"
                  title="Sauvegarder"
                >
                  <FiSave className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() => handleEditStat('revenue')}
                  className="text-gray-600 hover:text-gray-700"
                  title="Modifier"
                >
                  <FiEdit className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="flex items-center">
              <FiCreditCard className="w-8 h-8 text-royal-blue mr-3" />
              {isEditingStats.revenue ? (
                <div className="flex items-center">
                  <input
                    type="number"
                    value={tempStats.revenue}
                    onChange={(e) => setTempStats(prev => ({ ...prev, revenue: parseInt(e.target.value) || 0 }))}
                    className="text-3xl font-bold text-gray-800 w-32 border rounded px-2"
                  />
                  <span className="text-3xl font-bold text-gray-800 ml-1">FCFA</span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-800">{stats.revenue.toLocaleString()} FCFA</span>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6 border-b pb-2">
            <h2 className="text-2xl font-semibold text-gray-800">Informations de l&apos;auto-école</h2>
            {!editingInfo ? (
              <button
                onClick={handleEditInfo}
                className="text-gray-600 hover:text-gray-700"
                title="Modifier"
              >
                <FiEdit className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSaveInfo}
                className="text-green-600 hover:text-green-700"
                title="Sauvegarder"
              >
                <FiSave className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {!editingInfo ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiUser className="mt-1 mr-3 text-royal-blue text-xl" />
                  <div>
                    <h3 className="font-medium text-gray-900">Représentant légal</h3>
                    <p className="text-gray-600">{autoEcole.representantLegal}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiShield className="mt-1 mr-3 text-royal-blue text-xl" />
                  <div>
                    <h3 className="font-medium text-gray-900">Numéro d&apos;enregistrement</h3>
                    <p className="text-gray-600">{autoEcole.numeroEnregistrement}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiCreditCard className="mt-1 mr-3 text-royal-blue text-xl" />
                  <div>
                    <h3 className="font-medium text-gray-900">CIN représentant</h3>
                    <p className="text-gray-600">{autoEcole.cinRepresentant}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiMapPin className="mt-1 mr-3 text-royal-blue text-xl" />
                  <div>
                    <h3 className="font-medium text-gray-900">Adresse</h3>
                    <p className="text-gray-600">{autoEcole.adresse}, {autoEcole.ville}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiPhone className="mt-1 mr-3 text-royal-blue text-xl" />
                  <div>
                    <h3 className="font-medium text-gray-900">Téléphone</h3>
                    <p className="text-gray-600">{autoEcole.telephone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiMail className="mt-1 mr-3 text-royal-blue text-xl" />
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">{autoEcole.email}</p>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-medium text-gray-900">Description</h3>
                <p className="text-gray-600 mt-1">{autoEcole.description}</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l&apos;auto-école</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Représentant légal</label>
                  <input
                    type="text"
                    name="representantLegal"
                    value={formData.representantLegal}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Numéro d&apos;enregistrement</label>
                  <input
                    type="text"
                    name="numeroEnregistrement"
                    value={formData.numeroEnregistrement}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CIN représentant</label>
                  <input
                    type="text"
                    name="cinRepresentant"
                    value={formData.cinRepresentant}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                  <input
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                  <input
                    type="text"
                    name="ville"
                    value={formData.ville}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="text"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-royal-blue"
                />
              </div>
            </div>
          )}
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FiImage className="mr-2" />
              Images de l&apos;auto-école
            </h2>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-royal-blue text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
            >
              <FiPlus className="mr-2" />
              Ajouter une image
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="w-full h-[250px] rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={image}
                    alt={`Auto-école ${index + 1}`}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handleDeleteImage(index)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    title="Supprimer l&apos;image"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white text-sm">Image {index + 1}</p>
                </div>
              </div>
            ))}
          </div>

          {images.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucune image n&apos;a été ajoutée
            </div>
          )}
        </section>

        <section className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Permis proposés</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {permis.map(permisItem => (
              <PermisCard 
                key={permisItem.id} 
                data={permisItem} 
                onEdit={() => setEditingPermisId(permisItem.id)}
              />
            ))}
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-4">
              {editingPermisId ? 'Modifier un permis' : 'Ajouter un nouveau permis'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type de permis</label>
                <input
                  type="text"
                  name="type"
                  value={editingPermisId ? permis.find(p => p.id === editingPermisId)?.type || '' : newPermis.type}
                  onChange={handlePermisChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prix (€)</label>
                <input
                  type="number"
                  name="prix"
                  value={editingPermisId ? permis.find(p => p.id === editingPermisId)?.prix || 0 : newPermis.prix}
                  onChange={handlePermisChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Durée</label>
                <input
                  type="text"
                  name="duree"
                  value={editingPermisId ? permis.find(p => p.id === editingPermisId)?.duree || '' : newPermis.duree}
                  onChange={handlePermisChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Popularité (%)</label>
                <input
                  type="number"
                  name="popularite"
                  min="0"
                  max="100"
                  value={editingPermisId ? permis.find(p => p.id === editingPermisId)?.popularite || 0 : newPermis.popularite}
                  onChange={handlePermisChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  rows={2}
                  value={editingPermisId ? permis.find(p => p.id === editingPermisId)?.description || '' : newPermis.description}
                  onChange={handlePermisChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-4 space-x-2">
              {editingPermisId && (
                <button
                  onClick={() => setEditingPermisId(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Annuler
                </button>
              )}
              <button
                onClick={() => editingPermisId 
                  ? handleUpdatePermis({ 
                      ...newPermis, 
                      id: editingPermisId 
                    }) 
                  : handleAddPermis()}
                className="px-4 py-2 bg-royal-blue text-white rounded-md"
              >
                {editingPermisId ? 'Mettre à jour' : 'Ajouter le permis'}
              </button>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Avis des utilisateurs</h2>
          
          <div className="space-y-6">
            {avis.map(avisItem => (
              <AvisItem 
                key={avisItem.id} 
                avis={avisItem} 
                onReply={handleReply} 
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}