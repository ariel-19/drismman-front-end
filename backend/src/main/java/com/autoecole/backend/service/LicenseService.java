package com.autoecole.backend.service;

import com.autoecole.backend.model.License;
import com.autoecole.backend.repository.LicenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class LicenseService {

    private final LicenseRepository licenseRepository;

    @Autowired
    public LicenseService(LicenseRepository licenseRepository) {
        this.licenseRepository = licenseRepository;
    }

    public List<License> getAllLicenses() {
        return licenseRepository.findAll();
    }

    public Optional<License> getLicenseById(UUID id) {
        return licenseRepository.findById(id);
    }

    public List<License> getLicensesByDrivingSchoolId(UUID drivingSchoolId) {
        return licenseRepository.findByDrivingSchoolId(drivingSchoolId);
    }

    public List<License> getLicensesByType(String type) {
        return licenseRepository.findByType(type);
    }

    public License createLicense(License license) {
        if (license.getId() == null) {
            license.setId(UUID.randomUUID());
        }
        return licenseRepository.save(license);
    }

    public License updateLicense(UUID id, License license) {
        license.setId(id);
        return licenseRepository.save(license);
    }

    public void deleteLicense(UUID id) {
        licenseRepository.deleteById(id);
    }
}
