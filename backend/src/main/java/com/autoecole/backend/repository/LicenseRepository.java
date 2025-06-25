package com.autoecole.backend.repository;

import com.autoecole.backend.model.License;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LicenseRepository extends CassandraRepository<License, UUID> {
    List<License> findByDrivingSchoolId(UUID drivingSchoolId);
    List<License> findByType(String type);
}
