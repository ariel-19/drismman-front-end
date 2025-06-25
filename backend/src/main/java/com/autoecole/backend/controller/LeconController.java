package com.autoecole.backend.controller;

import com.autoecole.backend.model.Lecon;
import com.autoecole.backend.service.LeconService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/lecons")
@CrossOrigin(origins = "*") // Pour permettre les requêtes depuis le frontend
public class LeconController {

    private final LeconService leconService;

    @Autowired
    public LeconController(LeconService leconService) {
        this.leconService = leconService;
    }

    @GetMapping
    public ResponseEntity<List<Lecon>> getAllLecons() {
        List<Lecon> lecons = leconService.getAllLecons();
        return new ResponseEntity<>(lecons, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lecon> getLeconById(@PathVariable UUID id) {
        Optional<Lecon> lecon = leconService.getLeconById(id);
        return lecon.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/eleve/{eleveId}")
    public ResponseEntity<List<Lecon>> getLeconsByEleveId(@PathVariable UUID eleveId) {
        List<Lecon> lecons = leconService.getLeconsByEleveId(eleveId);
        return new ResponseEntity<>(lecons, HttpStatus.OK);
    }

    @GetMapping("/moniteur/{moniteurId}")
    public ResponseEntity<List<Lecon>> getLeconsByMoniteurId(@PathVariable UUID moniteurId) {
        List<Lecon> lecons = leconService.getLeconsByMoniteurId(moniteurId);
        return new ResponseEntity<>(lecons, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Lecon>> searchLecons(
            @RequestParam(required = false) UUID eleveId,
            @RequestParam(required = false) UUID moniteurId,
            @RequestParam(required = false) String statut,
            @RequestParam(required = false) String typeLecon,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime debut,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fin) {
        
        List<Lecon> lecons;
        
        if (eleveId != null && statut != null) {
            lecons = leconService.getLeconsByEleveIdAndStatut(eleveId, statut);
        } else if (eleveId != null) {
            lecons = leconService.getLeconsByEleveId(eleveId);
        } else if (moniteurId != null) {
            lecons = leconService.getLeconsByMoniteurId(moniteurId);
        } else if (debut != null && fin != null) {
            lecons = leconService.getLeconsByDateRange(debut, fin);
        } else {
            lecons = leconService.getAllLecons();
        }
        
        return new ResponseEntity<>(lecons, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Lecon> createLecon(@RequestBody Lecon lecon) {
        Lecon savedLecon = leconService.saveLecon(lecon);
        return new ResponseEntity<>(savedLecon, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Lecon> updateLecon(@PathVariable UUID id, @RequestBody Lecon lecon) {
        Optional<Lecon> existingLecon = leconService.getLeconById(id);
        if (existingLecon.isPresent()) {
            lecon.setId(id);
            Lecon updatedLecon = leconService.saveLecon(lecon);
            return new ResponseEntity<>(updatedLecon, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/statut")
    public ResponseEntity<Lecon> updateLeconStatus(@PathVariable UUID id, @RequestParam String statut) {
        Lecon updatedLecon = leconService.updateLeconStatus(id, statut);
        if (updatedLecon != null) {
            return new ResponseEntity<>(updatedLecon, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/commentaire")
    public ResponseEntity<Lecon> addCommentToLecon(@PathVariable UUID id, @RequestParam String commentaire) {
        Lecon updatedLecon = leconService.addCommentToLecon(id, commentaire);
        if (updatedLecon != null) {
            return new ResponseEntity<>(updatedLecon, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLecon(@PathVariable UUID id) {
        Optional<Lecon> existingLecon = leconService.getLeconById(id);
        if (existingLecon.isPresent()) {
            leconService.deleteLecon(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
