package com.autoecole.backend.service;

import com.autoecole.backend.model.Moniteur;
import com.autoecole.backend.repository.MoniteurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MoniteurService {

    private final MoniteurRepository moniteurRepository;

    @Autowired
    public MoniteurService(MoniteurRepository moniteurRepository) {
        this.moniteurRepository = moniteurRepository;
    }

    public List<Moniteur> getAllMoniteurs() {
        return moniteurRepository.findAll();
    }

    public Optional<Moniteur> getMoniteurById(UUID id) {
        return moniteurRepository.findById(id);
    }

    public List<Moniteur> getMoniteursByNom(String nom) {
        return moniteurRepository.findByNom(nom);
    }

    public List<Moniteur> getMoniteursByNomAndPrenom(String nom, String prenom) {
        return moniteurRepository.findByNomAndPrenom(nom, prenom);
    }
    
    public List<Moniteur> getMoniteursByNumeroAgrement(String numeroAgrement) {
        return moniteurRepository.findByNumeroAgrement(numeroAgrement);
    }

    public Moniteur saveMoniteur(Moniteur moniteur) {
        return moniteurRepository.save(moniteur);
    }

    public void deleteMoniteur(UUID id) {
        moniteurRepository.deleteById(id);
    }
}
