package com.autoecole.backend.model;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;
import org.springframework.data.cassandra.core.mapping.Column;

import java.time.LocalDate;
import java.util.UUID;

@Table("eleves")
public class Eleve {
    
    @PrimaryKey
    private UUID id;
    
    @Column("nom")
    private String nom;
    
    @Column("prenom")
    private String prenom;
    
    @Column("date_naissance")
    private LocalDate dateNaissance;
    
    @Column("email")
    private String email;
    
    @Column("telephone")
    private String telephone;
    
    @Column("adresse")
    private String adresse;
    
    @Column("date_inscription")
    private LocalDate dateInscription;
    
    // Constructeurs
    public Eleve() {
        this.id = UUID.randomUUID();
        this.dateInscription = LocalDate.now();
    }
    
    public Eleve(String nom, String prenom, LocalDate dateNaissance, String email, String telephone, String adresse) {
        this();
        this.nom = nom;
        this.prenom = prenom;
        this.dateNaissance = dateNaissance;
        this.email = email;
        this.telephone = telephone;
        this.adresse = adresse;
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

    public LocalDate getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
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

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public LocalDate getDateInscription() {
        return dateInscription;
    }

    public void setDateInscription(LocalDate dateInscription) {
        this.dateInscription = dateInscription;
    }
    
    @Override
    public String toString() {
        return "Eleve{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", dateNaissance=" + dateNaissance +
                ", email='" + email + '\'' +
                ", telephone='" + telephone + '\'' +
                ", adresse='" + adresse + '\'' +
                ", dateInscription=" + dateInscription +
                '}';
    }
}
