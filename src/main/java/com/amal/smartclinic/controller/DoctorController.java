package com.amal.smartclinic.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.amal.smartclinic.dto.LoginDTO;
import com.amal.smartclinic.model.Doctor;
import com.amal.smartclinic.service.DoctorService;
import com.amal.smartclinic.service.TokenService;

@RestController
@RequestMapping("/doctor")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private TokenService tokenService;

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @GetMapping("/filter")
    public List<Doctor> filterDoctors(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String time,
            @RequestParam(required = false) String specialty) {

        return doctorService.filterDoctors(name, time, specialty);
    }

    @GetMapping("/{id}")
    public Doctor getDoctorById(@PathVariable Long id) {
        return doctorService.getDoctorById(id);
    }

    @GetMapping("/availability")
    public ResponseEntity<?> getDoctorAvailability(
            @RequestParam String role,
            @RequestParam Long doctorId,
            @RequestParam String date,
            @RequestHeader("Authorization") String token) {

        if (!tokenService.validateToken(token, role)) {
            return ResponseEntity.status(401)
                    .body("Invalid or expired token");
        }

        Doctor doctor = doctorService.getDoctorById(doctorId);

        if (doctor == null) {
            return ResponseEntity.status(404)
                    .body("Doctor not found");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("doctorId", doctor.getId());
        response.put("doctorName", doctor.getName());
        response.put("date", date);
        response.put("availableTimes", doctor.getAvailableTimes());

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public Doctor addDoctor(@RequestBody Doctor doctor) {
        return doctorService.saveDoctor(doctor);
    }

    @PostMapping("/login")
    public ResponseEntity<?> doctorLogin(@RequestBody LoginDTO loginDTO) {

        Doctor doctor = doctorService.login(
                loginDTO.getIdentifier()
        );

        if (doctor == null) {
            return ResponseEntity.status(401)
                    .body("Doctor not found");
        }

        if (!doctor.getPassword().equals(loginDTO.getPassword())) {
            return ResponseEntity.status(401)
                    .body("Invalid password");
        }

        String token = tokenService.generateToken(
                "doctor",
                doctor.getEmail()
        );

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("doctorId", doctor.getId());

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public String deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
        return "Doctor deleted successfully";
    }
}
