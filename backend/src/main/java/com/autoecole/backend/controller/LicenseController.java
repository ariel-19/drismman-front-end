package com.autoecole.backend.controller;

import com.autoecole.backend.model.License;
import com.autoecole.backend.service.LicenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/licenses")
public class LicenseController {

    private final LicenseService licenseService;

    @Autowired
    public LicenseController(LicenseService licenseService) {
        this.licenseService = licenseService;
    }

    @GetMapping
    public ResponseEntity<List<License>> getAllLicenses() {
        List<License> licenses = licenseService.getAllLicenses();
        return new ResponseEntity<>(licenses, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<License> getLicenseById(@PathVariable UUID id) {
        Optional<License> license = licenseService.getLicenseById(id);
        return license.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/driving-school/{drivingSchoolId}")
    public ResponseEntity<List<License>> getLicensesByDrivingSchoolId(@PathVariable UUID drivingSchoolId) {
        List<License> licenses = licenseService.getLicensesByDrivingSchoolId(drivingSchoolId);
        return new ResponseEntity<>(licenses, HttpStatus.OK);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<License>> getLicensesByType(@PathVariable String type) {
        List<License> licenses = licenseService.getLicensesByType(type);
        return new ResponseEntity<>(licenses, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<License> createLicense(@RequestBody License license) {
        License createdLicense = licenseService.createLicense(license);
        return new ResponseEntity<>(createdLicense, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<License> updateLicense(@PathVariable UUID id, @RequestBody License license) {
        Optional<License> existingLicense = licenseService.getLicenseById(id);
        if (existingLicense.isPresent()) {
            License updatedLicense = licenseService.updateLicense(id, license);
            return new ResponseEntity<>(updatedLicense, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLicense(@PathVariable UUID id) {
        Optional<License> existingLicense = licenseService.getLicenseById(id);
        if (existingLicense.isPresent()) {
            licenseService.deleteLicense(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
