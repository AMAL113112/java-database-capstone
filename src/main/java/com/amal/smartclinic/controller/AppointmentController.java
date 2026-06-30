package com.amal.smartclinic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.amal.smartclinic.dto.AppointmentDTO;
import com.amal.smartclinic.dto.UpdateAppointmentDTO;
import com.amal.smartclinic.model.Appointment;
import com.amal.smartclinic.service.AppointmentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getDoctorAppointments(
            @PathVariable Long doctorId) {

        return appointmentService.getDoctorAppointments(doctorId);
    }

    @GetMapping("/patient/{patientId}")
    public List<Appointment> getPatientAppointments(
            @PathVariable Long patientId) {

        return appointmentService.getPatientAppointments(patientId);
    }

    @GetMapping("/{id}")
    public Appointment getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id);
    }

    @PostMapping
    public Appointment addAppointment(
            @Valid @RequestBody AppointmentDTO appointmentDTO) {

        return appointmentService.saveAppointment(appointmentDTO);
    }

    // UPDATE APPOINTMENT
    @PutMapping("/update/{id}")
    public Appointment updateAppointment(
            @PathVariable Long id,
            @Valid @RequestBody UpdateAppointmentDTO updateAppointmentDTO) {

        return appointmentService.updateAppointment(
                id,
                updateAppointmentDTO
        );
    }

    @PutMapping("/cancel/{id}")
    public String cancelAppointment(@PathVariable Long id) {
        appointmentService.cancelAppointment(id);
        return "Appointment cancelled successfully";
    }

    @PutMapping("/complete/{id}")
    public String completeAppointment(@PathVariable Long id) {
        appointmentService.completeAppointment(id);
        return "Appointment completed successfully";
    }

    @PutMapping("/no-show/{id}")
    public String markNoShow(@PathVariable Long id) {
        appointmentService.markNoShow(id);
        return "Appointment marked as no-show";
    }

    @DeleteMapping("/{id}")
    public String deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return "Appointment deleted successfully";
    }
}