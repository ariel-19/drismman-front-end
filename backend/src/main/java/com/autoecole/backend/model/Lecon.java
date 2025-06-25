package com.autoecole.backend.model;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;
import org.springframework.data.cassandra.core.mapping.Column;

import java.time.LocalDateTime;
import java.util.UUID;

@Table("lecons")
public class Lecon {
    
    @PrimaryKey
    private UUID id;
    
    @Column("eleve_id")
    private UUID eleveId;
    
    @Column("moniteur_id")
    private UUID moniteurId;
    
    @Column("date_debut")
    private LocalDateTime dateDebut;
    
    @Column("date_fin")
    private LocalDateTime dateFin;
    
    @Column("type_lecon")
    private String typeLecon; // "CONDUITE", "CODE", etc.
    
    @Column("statut")
    private String statut; // "PLANIFIEE", "TERMINEE", "ANNULEE"
    
    @Column("commentaire")
    private String commentaire;
    
    // Constructeurs
    public Lecon() {
        this.id = UUID.randomUUID();
    }
    
    public Lecon(UUID eleveId, UUID moniteurId, LocalDateTime dateDebut, LocalDateTime dateFin, String typeLecon) {
        this();
        this.eleveId = eleveId;
        this.moniteurId = moniteurId;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.typeLecon = typeLecon;
        this.statut = "PLANIFIEE";
    }
    
    // Getters et Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getEleveId() {
        return eleveId;
    }

    public void setEleveId(UUID eleveId) {
        this.eleveId = eleveId;
    }

    public UUID getMoniteurId() {
        return moniteurId;
    }

    public void setMoniteurId(UUID moniteurId) {
        this.moniteurId = moniteurId;
    }

    public LocalDateTime getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDateTime dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDateTime getDateFin() {
        return dateFin;
    }

    public void setDateFin(LocalDateTime dateFin) {
        this.dateFin = dateFin;
    }

    public String getTypeLecon() {
        return typeLecon;
    }

    public void setTypeLecon(String typeLecon) {
        this.typeLecon = typeLecon;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }
    
    @Override
    public String toString() {
        return "Lecon{" +
                "id=" + id +
                ", eleveId=" + eleveId +
                ", moniteurId=" + moniteurId +
                ", dateDebut=" + dateDebut +
                ", dateFin=" + dateFin +
                ", typeLecon='" + typeLecon + '\'' +
                ", statut='" + statut + '\'' +
                ", commentaire='" + commentaire + '\'' +
                '}';
    }
}
