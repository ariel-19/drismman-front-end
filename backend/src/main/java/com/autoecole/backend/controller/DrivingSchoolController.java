package com.autoecole.backend.controller;

import com.autoecole.backend.model.DrivingSchool;
import com.autoecole.backend.service.DrivingSchoolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/driving-schools")
public class DrivingSchoolController {

    private final DrivingSchoolService drivingSchoolService;

    @Autowired
    public DrivingSchoolController(DrivingSchoolService drivingSchoolService) {
        this.drivingSchoolService = drivingSchoolService;
    }

    @GetMapping
    public ResponseEntity<List<DrivingSchool>> getAllDrivingSchools() {
        List<DrivingSchool> drivingSchools = drivingSchoolService.getAllDrivingSchools();
        return new ResponseEntity<>(drivingSchools, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DrivingSchool> getDrivingSchoolById(@PathVariable UUID id) {
        Optional<DrivingSchool> drivingSchool = drivingSchoolService.getDrivingSchoolById(id);
        return drivingSchool.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<DrivingSchool>> getDrivingSchoolsByCity(@PathVariable String city) {
        List<DrivingSchool> drivingSchools = drivingSchoolService.getDrivingSchoolsByCity(city);
        return new ResponseEntity<>(drivingSchools, HttpStatus.OK);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<List<DrivingSchool>> getDrivingSchoolsByName(@PathVariable String name) {
        List<DrivingSchool> drivingSchools = drivingSchoolService.getDrivingSchoolsByName(name);
        return new ResponseEntity<>(drivingSchools, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<DrivingSchool> createDrivingSchool(@RequestBody DrivingSchool drivingSchool) {
        DrivingSchool createdDrivingSchool = drivingSchoolService.createDrivingSchool(drivingSchool);
        return new ResponseEntity<>(createdDrivingSchool, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DrivingSchool> updateDrivingSchool(@PathVariable UUID id, @RequestBody DrivingSchool drivingSchool) {
        Optional<DrivingSchool> existingDrivingSchool = drivingSchoolService.getDrivingSchoolById(id);
        if (existingDrivingSchool.isPresent()) {
            DrivingSchool updatedDrivingSchool = drivingSchoolService.updateDrivingSchool(id, drivingSchool);
            return new ResponseEntity<>(updatedDrivingSchool, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDrivingSchool(@PathVariable UUID id) {
        Optional<DrivingSchool> existingDrivingSchool = drivingSchoolService.getDrivingSchoolById(id);
        if (existingDrivingSchool.isPresent()) {
            drivingSchoolService.deleteDrivingSchool(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
