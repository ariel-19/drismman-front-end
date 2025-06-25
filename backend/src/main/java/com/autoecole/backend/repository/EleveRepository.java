package com.autoecole.backend.repository;

import com.autoecole.backend.model.Eleve;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EleveRepository extends CassandraRepository<Eleve, UUID> {
    
    // Méthodes de recherche personnalisées
    List<Eleve> findByNom(String nom);
    
    List<Eleve> findByNomAndPrenom(String nom, String prenom);
    
    List<Eleve> findByEmailContaining(String email);
}
