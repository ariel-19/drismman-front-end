package com.autoecole.backend.repository;

import com.autoecole.backend.model.Moniteur;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MoniteurRepository extends CassandraRepository<Moniteur, UUID> {
    
    // Méthodes de recherche personnalisées
    List<Moniteur> findByNom(String nom);
    
    List<Moniteur> findByNomAndPrenom(String nom, String prenom);
    
    List<Moniteur> findByNumeroAgrement(String numeroAgrement);
}
