package com.amal.smartclinic.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.amal.smartclinic.dto.LoginDTO;
import com.amal.smartclinic.model.Patient;
import com.amal.smartclinic.repository.PatientRepository;
import com.amal.smartclinic.service.TokenService;

@RestController
@RequestMapping("/patient")
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private TokenService tokenService;

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @GetMapping("/{id}")
    public Patient getPatientById(@PathVariable Long id) {
        return patientRepository.findById(id).orElse(null);
    }

    @PostMapping
    public ResponseEntity<?> addPatient(
            @RequestBody Patient patient) {

        Patient existingPatient =
                patientRepository.findByEmail(
                        patient.getEmail()
                );

        if (existingPatient != null) {
            return ResponseEntity.badRequest()
                    .body("Email already exists");
        }

        Patient savedPatient =
                patientRepository.save(patient);

        return ResponseEntity.ok(savedPatient);
    }

    @PostMapping("/login")
    public ResponseEntity<?> patientLogin(
            @RequestBody LoginDTO loginDTO) {

        Patient patient = patientRepository.findByEmail(
                loginDTO.getIdentifier()
        );

        if (patient == null) {
            return ResponseEntity.status(401)
                    .body("Patient not found");
        }

        if (!patient.getPassword().equals(
                loginDTO.getPassword())) {

            return ResponseEntity.status(401)
                    .body("Invalid password");
        }

        String token = tokenService.generateToken(
                "patient",
                patient.getEmail()
        );

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("patientId", patient.getId());
        response.put("patientName", patient.getName());

        return ResponseEntity.ok(response);
    }

    // NEW: Update patient
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePatient(
            @PathVariable Long id,
            @RequestBody Patient updatedPatient) {

        Patient existingPatient =
                patientRepository.findById(id).orElse(null);

        if (existingPatient == null) {
            return ResponseEntity.badRequest()
                    .body("Patient not found");
        }

        Patient emailOwner =
                patientRepository.findByEmail(
                        updatedPatient.getEmail()
                );

        if (emailOwner != null &&
                !emailOwner.getId().equals(id)) {

            return ResponseEntity.badRequest()
                    .body("Email already exists");
        }

        existingPatient.setName(updatedPatient.getName());
        existingPatient.setEmail(updatedPatient.getEmail());
        existingPatient.setPhone(updatedPatient.getPhone());
        existingPatient.setPassword(updatedPatient.getPassword());

        Patient savedPatient =
                patientRepository.save(existingPatient);

        return ResponseEntity.ok(savedPatient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePatient(
            @PathVariable Long id) {

        Patient patient =
                patientRepository.findById(id).orElse(null);

        if (patient == null) {
            return ResponseEntity.badRequest()
                    .body("Patient not found");
        }

        patientRepository.deleteById(id);

        return ResponseEntity.ok(
                "Patient deleted successfully"
        );
    }
}