package com.amal.smartclinic.model;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Document(collection = "prescriptions")
public class Prescription {

    @Id
    private String id;

    @NotBlank(message = "Patient name cannot be empty")
    private String patientName;

    @NotBlank(message = "Doctor name cannot be empty")
    private String doctorName;

    @NotNull(message = "Appointment ID is required")
    private Long appointmentId;

    @NotBlank(message = "Diagnosis cannot be empty")
    private String diagnosis;

    @NotBlank(message = "Medication cannot be empty")
    @Size(min = 3, max = 300,
            message = "Medication must be between 3 and 300 characters")
    private String medication;

    @NotBlank(message = "Dosage cannot be empty")
    private String dosage;

    @Size(max = 500,
            message = "Doctor notes cannot exceed 500 characters")
    private String doctorNotes;

    private LocalDate prescriptionDate = LocalDate.now();

    public Prescription() {
    }

    public Prescription(
            String id,
            String patientName,
            String doctorName,
            Long appointmentId,
            String diagnosis,
            String medication,
            String dosage,
            String doctorNotes,
            LocalDate prescriptionDate) {

        this.id = id;
        this.patientName = patientName;
        this.doctorName = doctorName;
        this.appointmentId = appointmentId;
        this.diagnosis = diagnosis;
        this.medication = medication;
        this.dosage = dosage;
        this.doctorNotes = doctorNotes;
        this.prescriptionDate = prescriptionDate;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public String getDoctorName() { return doctorName; }
    public void setDoctorName(String doctorName) { this.doctorName = doctorName; }

    public Long getAppointmentId() { return appointmentId; }
    public void setAppointmentId(Long appointmentId) { this.appointmentId = appointmentId; }

    public String getDiagnosis() { return diagnosis; }
    public void setDiagnosis(String diagnosis) { this.diagnosis = diagnosis; }

    public String getMedication() { return medication; }
    public void setMedication(String medication) { this.medication = medication; }

    public String getDosage() { return dosage; }
    public void setDosage(String dosage) { this.dosage = dosage; }

    public String getDoctorNotes() { return doctorNotes; }
    public void setDoctorNotes(String doctorNotes) { this.doctorNotes = doctorNotes; }

    public LocalDate getPrescriptionDate() { return prescriptionDate; }
    public void setPrescriptionDate(LocalDate prescriptionDate) {
        this.prescriptionDate = prescriptionDate;
    }
}