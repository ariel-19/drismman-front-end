package com.autoecole.backend.service;

import com.autoecole.backend.model.Lecon;
import com.autoecole.backend.repository.LeconRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class LeconService {

    private final LeconRepository leconRepository;

    @Autowired
    public LeconService(LeconRepository leconRepository) {
        this.leconRepository = leconRepository;
    }

    public List<Lecon> getAllLecons() {
        return leconRepository.findAll();
    }

    public Optional<Lecon> getLeconById(UUID id) {
        return leconRepository.findById(id);
    }

    public List<Lecon> getLeconsByEleveId(UUID eleveId) {
        return leconRepository.findByEleveId(eleveId);
    }

    public List<Lecon> getLeconsByMoniteurId(UUID moniteurId) {
        return leconRepository.findByMoniteurId(moniteurId);
    }

    public List<Lecon> getLeconsByEleveIdAndStatut(UUID eleveId, String statut) {
        return leconRepository.findByEleveIdAndStatut(eleveId, statut);
    }

    public List<Lecon> getLeconsByDateRange(LocalDateTime debut, LocalDateTime fin) {
        return leconRepository.findByDateDebutBetween(debut, fin);
    }

    public Lecon saveLecon(Lecon lecon) {
        return leconRepository.save(lecon);
    }

    public void deleteLecon(UUID id) {
        leconRepository.deleteById(id);
    }
    
    public Lecon updateLeconStatus(UUID id, String statut) {
        Optional<Lecon> leconOpt = leconRepository.findById(id);
        if (leconOpt.isPresent()) {
            Lecon lecon = leconOpt.get();
            lecon.setStatut(statut);
            return leconRepository.save(lecon);
        }
        return null;
    }
    
    public Lecon addCommentToLecon(UUID id, String commentaire) {
        Optional<Lecon> leconOpt = leconRepository.findById(id);
        if (leconOpt.isPresent()) {
            Lecon lecon = leconOpt.get();
            lecon.setCommentaire(commentaire);
            return leconRepository.save(lecon);
        }
        return null;
    }
}
