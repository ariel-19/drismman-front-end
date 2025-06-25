package com.autoecole.backend.model;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;
import org.springframework.data.cassandra.core.mapping.Column;

import java.time.LocalDate;
import java.util.UUID;

@Table("moniteurs")
public class Moniteur {
    
    @PrimaryKey
    private UUID id;
    
    @Column("nom")
    private String nom;
    
    @Column("prenom")
    private String prenom;
    
    @Column("email")
    private String email;
    
    @Column("telephone")
    private String telephone;
    
    @Column("date_embauche")
    private LocalDate dateEmbauche;
    
    @Column("numero_agrement")
    private String numeroAgrement;
    
    // Constructeurs
    public Moniteur() {
        this.id = UUID.randomUUID();
    }
    
    public Moniteur(String nom, String prenom, String email, String telephone, LocalDate dateEmbauche, String numeroAgrement) {
        this();
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.telephone = telephone;
        this.dateEmbauche = dateEmbauche;
        this.numeroAgrement = numeroAgrement;
    }
    
    // Getters et Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public LocalDate getDateEmbauche() {
        return dateEmbauche;
    }

    public void setDateEmbauche(LocalDate dateEmbauche) {
        this.dateEmbauche = dateEmbauche;
    }

    public String getNumeroAgrement() {
        return numeroAgrement;
    }

    public void setNumeroAgrement(String numeroAgrement) {
        this.numeroAgrement = numeroAgrement;
    }
    
    @Override
    public String toString() {
        return "Moniteur{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", email='" + email + '\'' +
                ", telephone='" + telephone + '\'' +
                ", dateEmbauche=" + dateEmbauche +
                ", numeroAgrement='" + numeroAgrement + '\'' +
                '}';
    }
}
