import { API_URL, BACKEND_URL } from '../config/api';

export interface DrivingSchoolRegistration {
  name: string;
  address: string;
  city: string;
  taxNumber: string;
  managerName: string;
  email: string;
  phone: string;
  password: string;
  // Informations supplémentaires
  licenses: {
    type: string;
    price: number;
    duration: string;
    description: string;
  }[];
  images: string[];
  successRate?: number;
  students?: number;
}

// Interface pour les utilisateurs enregistrés
export interface RegisteredUser {
  email: string;
  password: string;
  schoolId: string;
  schoolName: string;
}

// Stockage local des utilisateurs inscrits (dans une application réelle, cela serait dans une base de données)
let registeredUsers: RegisteredUser[] = [];

export const authService = {
  registerDrivingSchool: async (data: DrivingSchoolRegistration) => {
    try {
      // Charger les utilisateurs existants depuis le localStorage
      const storedUsers = localStorage.getItem('registeredUsers');
      if (storedUsers) {
        registeredUsers = JSON.parse(storedUsers);
      }
      
      // Vérifier si l'utilisateur existe déjà
      const existingUser = registeredUsers.find(user => user.email === data.email);
      if (existingUser) {
        throw new Error('Un compte avec cet email existe déjà');
      }

      // Générer un ID unique pour l'auto-école
      const schoolId = crypto.randomUUID();
      
      let result;
      
      try {
        // Essayer d'envoyer les données au backend via l'API Gateway
        const response = await fetch(`${API_URL}/api/autoecoles`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: schoolId, // Utiliser l'ID généré côté client
            nom: data.name,
            description: `Auto-école gérée par ${data.managerName}`,
            adresse: data.address,
            ville: data.city || data.address.split(',').pop()?.trim() || '',
            telephone: data.phone,
            email: data.email,
            images: [],
            note: 0,
            nombreAvis: 0,
            numeroFiscal: data.taxNumber,
            nomGerant: data.managerName,
            password: data.password, // Note: Dans une application réelle, le mot de passe devrait être hashé côté serveur
            permis: data.licenses.map(license => ({
              type: license.type,
              prix: license.price,
              duree: license.duration,
              description: license.description
            })) || [],
            nombreEleves: data.students || 0,
            tauxReussite: data.successRate || 0
          }),
        });

        if (response.ok) {
          result = await response.json();
        } else {
          // Si l'API renvoie une erreur, utiliser les données locales
          console.warn('Erreur API, utilisation des données locales');
          result = {
            id: schoolId,
            name: data.name,
            // autres propriétés...
          };
        }
      } catch (error) {
        // Si l'API n'est pas disponible du tout, utiliser les données locales
        console.warn('API non disponible, création d\'un ID local', error);
        result = {
          id: schoolId,
          name: data.name,
          // autres propriétés...
        };
      }
      
      // Enregistrer l'utilisateur localement (dans une application réelle, cela serait fait côté serveur)
      const newUser = {
        email: data.email,
        password: data.password,
        schoolId: result.id,
        schoolName: data.name
      };
      
      registeredUsers.push(newUser);
      
      // Sauvegarder dans le localStorage pour persister entre les rechargements de page
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      
      return result;
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw error;
    }
  },

  login: async (email: string, password: string) => {
    try {
      // Tenter de se connecter via l'API Gateway
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // Stocker le token JWT et les informations utilisateur
        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }
        
        // Stocker l'utilisateur courant dans le localStorage
        localStorage.setItem('currentUser', JSON.stringify({
          email: email,
          userId: data.userId || data.id,
          schoolId: data.schoolId || data.autoEcoleId,
          schoolName: data.schoolName || data.nomAutoEcole || 'Auto-école',
          role: data.role || 'ADMIN'
        }));
        
        return {
          success: true,
          userId: data.userId || data.id,
          schoolId: data.schoolId || data.autoEcoleId,
          schoolName: data.schoolName || data.nomAutoEcole || 'Auto-école',
          token: data.token
        };
      } else {
        // Fallback au mode local si l'API renvoie une erreur
        console.warn('Erreur d\'authentification API, tentative en mode local');
        return await authService.loginLocal(email, password);
      }
    } catch (error) {
      console.error('Erreur de connexion à l\'API:', error);
      // Fallback au mode local si l'API n'est pas disponible
      return await authService.loginLocal(email, password);
    }
  },
  
  loginLocal: async (email: string, password: string) => {
    // Charger les utilisateurs depuis le localStorage
    const storedUsers = localStorage.getItem('registeredUsers');
    if (storedUsers) {
      registeredUsers = JSON.parse(storedUsers);
    }
    
    // Vérifier si l'utilisateur existe et si le mot de passe correspond
    const user = registeredUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Email ou mot de passe incorrect');
    }
    
    // Stocker l'utilisateur courant dans le localStorage
    localStorage.setItem('currentUser', JSON.stringify({
      email: user.email,
      schoolId: user.schoolId,
      schoolName: user.schoolName || 'Auto-école',
      role: 'ADMIN'
    }));
    
    // Simuler une réponse d'API
    return { 
      success: true, 
      userId: user.schoolId,
      schoolId: user.schoolId,
      schoolName: user.schoolName || 'Auto-école'
    };
  },
  
  getCurrentUser: () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      return JSON.parse(currentUser);
    }
    return null;
  },
  
  logout: async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        // Tenter de se déconnecter via l'API Gateway
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        
        // Supprimer le token JWT
        localStorage.removeItem('authToken');
      }
    } catch (error) {
      console.warn('Erreur lors de la déconnexion API:', error);
    } finally {
      // Toujours supprimer les données utilisateur locales
      localStorage.removeItem('currentUser');
    }
  }
};
