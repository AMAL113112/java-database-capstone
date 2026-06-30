package com.amal.smartclinic.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;

public class UpdateAppointmentDTO {

    @NotNull(message = "Appointment time is required")
    @Future(message = "Appointment time must be in future")
    private LocalDateTime appointmentTime;

    public UpdateAppointmentDTO() {
    }

    public UpdateAppointmentDTO(
            LocalDateTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public LocalDateTime getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(
            LocalDateTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }
}