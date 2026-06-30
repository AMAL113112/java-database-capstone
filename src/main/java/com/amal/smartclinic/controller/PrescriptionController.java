package com.amal.smartclinic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.amal.smartclinic.model.Prescription;
import com.amal.smartclinic.repository.PrescriptionRepository;

@RestController
@RequestMapping("/prescription")
public class PrescriptionController {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @GetMapping
    public List<Prescription> getAllPrescriptions() {
        return prescriptionRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPrescriptionById(
            @PathVariable String id) {

        Prescription prescription =
                prescriptionRepository.findById(id).orElse(null);

        if (prescription == null) {
            return ResponseEntity.badRequest()
                    .body("Prescription not found");
        }

        return ResponseEntity.ok(prescription);
    }

    @GetMapping("/patient/{patientName}")
    public List<Prescription> getByPatientName(
            @PathVariable String patientName) {

        return prescriptionRepository
                .findByPatientName(patientName);
    }

    @GetMapping("/doctor/{doctorName}")
    public List<Prescription> getByDoctorName(
            @PathVariable String doctorName) {

        return prescriptionRepository
                .findByDoctorName(doctorName);
    }

    @GetMapping("/appointment/{appointmentId}")
    public ResponseEntity<?> getByAppointment(
            @PathVariable Long appointmentId) {

        Prescription prescription =
                prescriptionRepository
                        .findByAppointmentId(appointmentId);

        if (prescription == null) {
            return ResponseEntity.badRequest()
                    .body("Prescription not found");
        }

        return ResponseEntity.ok(prescription);
    }

    @PostMapping
    public ResponseEntity<?> addPrescription(
            @RequestBody Prescription prescription) {

        Prescription existing =
                prescriptionRepository.findByAppointmentId(
                        prescription.getAppointmentId()
                );

        if (existing != null) {
            return ResponseEntity.badRequest()
                    .body("Prescription already exists for this appointment");
        }

        Prescription saved =
                prescriptionRepository.save(prescription);

        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePrescription(
            @PathVariable String id) {

        Prescription prescription =
                prescriptionRepository.findById(id).orElse(null);

        if (prescription == null) {
            return ResponseEntity.badRequest()
                    .body("Prescription not found");
        }

        prescriptionRepository.deleteById(id);

        return ResponseEntity.ok(
                "Prescription deleted successfully"
        );
    }
}