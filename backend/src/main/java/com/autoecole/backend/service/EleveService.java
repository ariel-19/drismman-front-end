package com.autoecole.backend.service;

import com.autoecole.backend.model.Eleve;
import com.autoecole.backend.repository.EleveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class EleveService {

    private final EleveRepository eleveRepository;

    @Autowired
    public EleveService(EleveRepository eleveRepository) {
        this.eleveRepository = eleveRepository;
    }

    public List<Eleve> getAllEleves() {
        return eleveRepository.findAll();
    }

    public Optional<Eleve> getEleveById(UUID id) {
        return eleveRepository.findById(id);
    }

    public List<Eleve> getElevesByNom(String nom) {
        return eleveRepository.findByNom(nom);
    }

    public List<Eleve> getElevesByNomAndPrenom(String nom, String prenom) {
        return eleveRepository.findByNomAndPrenom(nom, prenom);
    }

    public Eleve saveEleve(Eleve eleve) {
        return eleveRepository.save(eleve);
    }

    public void deleteEleve(UUID id) {
        eleveRepository.deleteById(id);
    }
}
