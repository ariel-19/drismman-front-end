package com.autoecole.backend.controller;

import com.autoecole.backend.model.Moniteur;
import com.autoecole.backend.service.MoniteurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/moniteurs")
@CrossOrigin(origins = "*") // Pour permettre les requêtes depuis le frontend
public class MoniteurController {

    private final MoniteurService moniteurService;

    @Autowired
    public MoniteurController(MoniteurService moniteurService) {
        this.moniteurService = moniteurService;
    }

    @GetMapping
    public ResponseEntity<List<Moniteur>> getAllMoniteurs() {
        List<Moniteur> moniteurs = moniteurService.getAllMoniteurs();
        return new ResponseEntity<>(moniteurs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Moniteur> getMoniteurById(@PathVariable UUID id) {
        Optional<Moniteur> moniteur = moniteurService.getMoniteurById(id);
        return moniteur.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Moniteur>> searchMoniteurs(
            @RequestParam(required = false) String nom,
            @RequestParam(required = false) String prenom,
            @RequestParam(required = false) String numeroAgrement) {
        
        List<Moniteur> moniteurs;
        if (numeroAgrement != null) {
            moniteurs = moniteurService.getMoniteursByNumeroAgrement(numeroAgrement);
        } else if (nom != null && prenom != null) {
            moniteurs = moniteurService.getMoniteursByNomAndPrenom(nom, prenom);
        } else if (nom != null) {
            moniteurs = moniteurService.getMoniteursByNom(nom);
        } else {
            moniteurs = moniteurService.getAllMoniteurs();
        }
        
        return new ResponseEntity<>(moniteurs, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Moniteur> createMoniteur(@RequestBody Moniteur moniteur) {
        Moniteur savedMoniteur = moniteurService.saveMoniteur(moniteur);
        return new ResponseEntity<>(savedMoniteur, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Moniteur> updateMoniteur(@PathVariable UUID id, @RequestBody Moniteur moniteur) {
        Optional<Moniteur> existingMoniteur = moniteurService.getMoniteurById(id);
        if (existingMoniteur.isPresent()) {
            moniteur.setId(id);
            Moniteur updatedMoniteur = moniteurService.saveMoniteur(moniteur);
            return new ResponseEntity<>(updatedMoniteur, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMoniteur(@PathVariable UUID id) {
        Optional<Moniteur> existingMoniteur = moniteurService.getMoniteurById(id);
        if (existingMoniteur.isPresent()) {
            moniteurService.deleteMoniteur(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
