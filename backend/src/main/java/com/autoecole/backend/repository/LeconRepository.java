package com.autoecole.backend.repository;

import com.autoecole.backend.model.Lecon;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface LeconRepository extends CassandraRepository<Lecon, UUID> {
    
    // Méthodes de recherche personnalisées
    List<Lecon> findByEleveId(UUID eleveId);
    
    List<Lecon> findByMoniteurId(UUID moniteurId);
    
    List<Lecon> findByEleveIdAndStatut(UUID eleveId, String statut);
    
    List<Lecon> findByMoniteurIdAndStatut(UUID moniteurId, String statut);
    
    List<Lecon> findByDateDebutBetween(LocalDateTime debut, LocalDateTime fin);
    
    List<Lecon> findByTypeLecon(String typeLecon);
}
