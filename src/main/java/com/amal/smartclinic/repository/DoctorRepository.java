package com.amal.smartclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.amal.smartclinic.model.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    Doctor findByEmail(String email);
}