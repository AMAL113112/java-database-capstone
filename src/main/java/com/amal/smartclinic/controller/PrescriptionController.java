package com.amal.smartclinic.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.amal.smartclinic.model.Prescription;
import com.amal.smartclinic.repository.PrescriptionRepository;

import jakarta.validation.Valid;

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
            Map<String, String> response = new HashMap<>();
            response.put("message", "Prescription not found");
            return ResponseEntity.badRequest().body(response);
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
            Map<String, String> response = new HashMap<>();
            response.put("message", "Prescription not found");
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(prescription);
    }

    @PostMapping
    public ResponseEntity<?> addPrescription(
            @Valid @RequestBody Prescription prescription) {

        Prescription existing =
                prescriptionRepository.findByAppointmentId(
                        prescription.getAppointmentId()
                );

        if (existing != null) {
            Map<String, String> response = new HashMap<>();
            response.put("message",
                    "Prescription already exists for this appointment");
            return ResponseEntity.badRequest().body(response);
        }

        prescriptionRepository.save(prescription);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Prescription saved successfully");

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePrescription(
            @PathVariable String id) {

        Prescription prescription =
                prescriptionRepository.findById(id).orElse(null);

        if (prescription == null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Prescription not found");
            return ResponseEntity.badRequest().body(response);
        }

        prescriptionRepository.deleteById(id);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Prescription deleted successfully");

        return ResponseEntity.ok(response);
    }
}
