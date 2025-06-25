package com.autoecole.backend.repository;

import com.autoecole.backend.model.DrivingSchool;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DrivingSchoolRepository extends CassandraRepository<DrivingSchool, UUID> {
    List<DrivingSchool> findByCity(String city);
    List<DrivingSchool> findByName(String name);
}
