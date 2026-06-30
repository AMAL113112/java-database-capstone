package com.amal.smartclinic.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amal.smartclinic.model.Doctor;
import com.amal.smartclinic.repository.DoctorRepository;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor saveDoctor(Doctor doctor) {

        if (doctor.getAvailableTimes() != null &&
                !doctor.getAvailableTimes().isEmpty()) {

            String selectedTime = doctor.getAvailableTimes().get(0);

            if ("Morning".equalsIgnoreCase(selectedTime)) {
                doctor.setAvailableTimes(List.of(
                        "09:00-10:00",
                        "10:00-11:00",
                        "11:00-12:00"
                ));
            }

            if ("Afternoon".equalsIgnoreCase(selectedTime)) {
                doctor.setAvailableTimes(List.of(
                        "14:00-15:00",
                        "15:00-16:00",
                        "16:00-17:00"
                ));
            }
        }

        return doctorRepository.save(doctor);
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id).orElse(null);
    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }

    public Doctor login(String email) {
        return doctorRepository.findByEmail(email);
    }

    public List<Doctor> filterDoctors(String name, String time, String specialty) {

        List<Doctor> doctors = doctorRepository.findAll();

        return doctors.stream()
                .filter(doctor ->
                        name == null || name.isEmpty() ||
                        doctor.getName().toLowerCase().contains(name.toLowerCase()))
                .filter(doctor ->
                        specialty == null || specialty.isEmpty() ||
                        doctor.getSpecialty().equalsIgnoreCase(specialty))
                .filter(doctor -> matchesTime(doctor, time))
                .collect(Collectors.toList());
    }

    private boolean matchesTime(Doctor doctor, String time) {

        if (time == null || time.isEmpty()) {
            return true;
        }

        if (doctor.getAvailableTimes() == null) {
            return false;
        }

        List<String> availableTimes = doctor.getAvailableTimes();

        if ("Morning".equalsIgnoreCase(time)) {
            return availableTimes.contains("09:00-10:00")
                    || availableTimes.contains("10:00-11:00")
                    || availableTimes.contains("11:00-12:00");
        }

        if ("Afternoon".equalsIgnoreCase(time)) {
            return availableTimes.contains("14:00-15:00")
                    || availableTimes.contains("15:00-16:00")
                    || availableTimes.contains("16:00-17:00");
        }

        return false;
    }
}