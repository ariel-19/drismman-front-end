package com.autoecole.backend.controller;

import com.autoecole.backend.model.Eleve;
import com.autoecole.backend.service.EleveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/eleves")
@CrossOrigin(origins = "*") // Pour permettre les requêtes depuis le frontend
public class EleveController {

    private final EleveService eleveService;

    @Autowired
    public EleveController(EleveService eleveService) {
        this.eleveService = eleveService;
    }

    @GetMapping
    public ResponseEntity<List<Eleve>> getAllEleves() {
        List<Eleve> eleves = eleveService.getAllEleves();
        return new ResponseEntity<>(eleves, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Eleve> getEleveById(@PathVariable UUID id) {
        Optional<Eleve> eleve = eleveService.getEleveById(id);
        return eleve.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Eleve>> searchEleves(
            @RequestParam(required = false) String nom,
            @RequestParam(required = false) String prenom) {
        
        List<Eleve> eleves;
        if (nom != null && prenom != null) {
            eleves = eleveService.getElevesByNomAndPrenom(nom, prenom);
        } else if (nom != null) {
            eleves = eleveService.getElevesByNom(nom);
        } else {
            eleves = eleveService.getAllEleves();
        }
        
        return new ResponseEntity<>(eleves, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Eleve> createEleve(@RequestBody Eleve eleve) {
        Eleve savedEleve = eleveService.saveEleve(eleve);
        return new ResponseEntity<>(savedEleve, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Eleve> updateEleve(@PathVariable UUID id, @RequestBody Eleve eleve) {
        Optional<Eleve> existingEleve = eleveService.getEleveById(id);
        if (existingEleve.isPresent()) {
            eleve.setId(id);
            Eleve updatedEleve = eleveService.saveEleve(eleve);
            return new ResponseEntity<>(updatedEleve, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEleve(@PathVariable UUID id) {
        Optional<Eleve> existingEleve = eleveService.getEleveById(id);
        if (existingEleve.isPresent()) {
            eleveService.deleteEleve(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
