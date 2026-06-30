package com.amal.smartclinic.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.amal.smartclinic.model.Prescription;

public interface PrescriptionRepository
        extends MongoRepository<Prescription, String> {

    List<Prescription> findByPatientName(String patientName);

    List<Prescription> findByDoctorName(String doctorName);

    Prescription findByAppointmentId(Long appointmentId);
}