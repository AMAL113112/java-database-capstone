package com.amal.smartclinic.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amal.smartclinic.dto.AppointmentDTO;
import com.amal.smartclinic.dto.UpdateAppointmentDTO;
import com.amal.smartclinic.model.Appointment;
import com.amal.smartclinic.model.Doctor;
import com.amal.smartclinic.model.Patient;
import com.amal.smartclinic.repository.AppointmentRepository;
import com.amal.smartclinic.repository.DoctorRepository;
import com.amal.smartclinic.repository.PatientRepository;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    public List<Appointment> getAllAppointments() {

        List<Appointment> appointments = appointmentRepository.findAll();

        for (Appointment appointment : appointments) {

            if (appointment.getStatus() == 0 &&
                appointment.getEndTime() != null &&
                LocalDateTime.now().isAfter(appointment.getEndTime())) {

                appointment.setStatus(1);
                appointmentRepository.save(appointment);
            }
        }

        return appointmentRepository.findAll();
    }

    public List<Appointment> getDoctorAppointments(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    public List<Appointment> getPatientAppointments(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    public Appointment saveAppointment(AppointmentDTO appointmentDTO) {

        Doctor doctor = doctorRepository
                .findById(appointmentDTO.getDoctorId())
                .orElse(null);

        Patient patient = patientRepository
                .findById(appointmentDTO.getPatientId())
                .orElse(null);

        if (doctor == null || patient == null) {
            throw new RuntimeException("Doctor or Patient not found");
        }

        Appointment appointment = new Appointment();
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setAppointmentTime(
                appointmentDTO.getAppointmentTime()
        );
        appointment.setStatus(0);

        return appointmentRepository.save(appointment);
    }

    // UPDATE APPOINTMENT
    public Appointment updateAppointment(
            Long id,
            UpdateAppointmentDTO updateAppointmentDTO) {

        Appointment appointment =
                appointmentRepository.findById(id).orElse(null);

        if (appointment == null) {
            throw new RuntimeException("Appointment not found");
        }

        appointment.setAppointmentTime(
                updateAppointmentDTO.getAppointmentTime()
        );

        return appointmentRepository.save(appointment);
    }

    public Appointment getAppointmentById(Long id) {

        Appointment appointment =
                appointmentRepository.findById(id).orElse(null);

        if (appointment == null) {
            return null;
        }

        if (appointment.getStatus() == 0 &&
            appointment.getEndTime() != null &&
            LocalDateTime.now().isAfter(appointment.getEndTime())) {

            appointment.setStatus(1);
            appointmentRepository.save(appointment);
        }

        return appointment;
    }

    public void cancelAppointment(Long id) {

        Appointment appointment =
                appointmentRepository.findById(id).orElse(null);

        if (appointment != null) {
            appointment.setStatus(2);
            appointmentRepository.save(appointment);
        }
    }

    public void completeAppointment(Long id) {
        Appointment appointment =
                appointmentRepository.findById(id).orElse(null);

        if (appointment != null) {
            appointment.setStatus(1);
            appointmentRepository.save(appointment);
        }
    }

    public void markNoShow(Long id) {
        Appointment appointment =
                appointmentRepository.findById(id).orElse(null);

        if (appointment != null) {
            appointment.setStatus(3);
            appointmentRepository.save(appointment);
        }
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }
}