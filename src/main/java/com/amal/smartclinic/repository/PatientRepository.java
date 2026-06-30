package com.amal.smartclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.amal.smartclinic.model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    Patient findByEmail(String email);
}