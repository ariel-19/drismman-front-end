package com.autoecole.backend.model;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.util.UUID;

@Table("licenses")
public class License {
    
    @PrimaryKey
    private UUID id;
    private UUID drivingSchoolId;
    private String type;
    private double price;
    private String duration;
    private String description;
    private int popularity;
    
    // Constructeurs
    public License() {
    }
    
    public License(UUID id, UUID drivingSchoolId, String type, double price, String duration, 
                  String description, int popularity) {
        this.id = id;
        this.drivingSchoolId = drivingSchoolId;
        this.type = type;
        this.price = price;
        this.duration = duration;
        this.description = description;
        this.popularity = popularity;
    }
    
    // Getters et Setters
    public UUID getId() {
        return id;
    }
    
    public void setId(UUID id) {
        this.id = id;
    }
    
    public UUID getDrivingSchoolId() {
        return drivingSchoolId;
    }
    
    public void setDrivingSchoolId(UUID drivingSchoolId) {
        this.drivingSchoolId = drivingSchoolId;
    }
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public double getPrice() {
        return price;
    }
    
    public void setPrice(double price) {
        this.price = price;
    }
    
    public String getDuration() {
        return duration;
    }
    
    public void setDuration(String duration) {
        this.duration = duration;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public int getPopularity() {
        return popularity;
    }
    
    public void setPopularity(int popularity) {
        this.popularity = popularity;
    }
}
