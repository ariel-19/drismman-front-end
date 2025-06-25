package com.autoecole.backend.service;

import com.autoecole.backend.model.DrivingSchool;
import com.autoecole.backend.repository.DrivingSchoolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DrivingSchoolService {

    private final DrivingSchoolRepository drivingSchoolRepository;

    @Autowired
    public DrivingSchoolService(DrivingSchoolRepository drivingSchoolRepository) {
        this.drivingSchoolRepository = drivingSchoolRepository;
    }

    public List<DrivingSchool> getAllDrivingSchools() {
        return drivingSchoolRepository.findAll();
    }

    public Optional<DrivingSchool> getDrivingSchoolById(UUID id) {
        return drivingSchoolRepository.findById(id);
    }

    public List<DrivingSchool> getDrivingSchoolsByCity(String city) {
        return drivingSchoolRepository.findByCity(city);
    }

    public List<DrivingSchool> getDrivingSchoolsByName(String name) {
        return drivingSchoolRepository.findByName(name);
    }

    public DrivingSchool createDrivingSchool(DrivingSchool drivingSchool) {
        if (drivingSchool.getId() == null) {
            drivingSchool.setId(UUID.randomUUID());
        }
        return drivingSchoolRepository.save(drivingSchool);
    }

    public DrivingSchool updateDrivingSchool(UUID id, DrivingSchool drivingSchool) {
        drivingSchool.setId(id);
        return drivingSchoolRepository.save(drivingSchool);
    }

    public void deleteDrivingSchool(UUID id) {
        drivingSchoolRepository.deleteById(id);
    }
}
