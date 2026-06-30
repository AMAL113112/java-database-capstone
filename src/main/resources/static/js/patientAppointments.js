import { getPatientAppointments } from "./services/appointmentRecordService.js";
import { createAppointmentRow } from "./components/appointmentRow.js";

document.addEventListener("DOMContentLoaded", loadAppointments);

async function loadAppointments() {
    const patientId = localStorage.getItem("patientId");
    const appointmentList = document.getElementById("appointmentList");

    if (!appointmentList) {
        console.error("appointmentList not found");
        return;
    }

    if (!patientId) {
        appointmentList.innerHTML = "<p>Please login first.</p>";
        return;
    }

    try {
        const appointments = await getPatientAppointments(patientId);

        appointmentList.innerHTML = "";

        if (!appointments || appointments.length === 0) {
            appointmentList.innerHTML = "<p>No appointments found.</p>";
            return;
        }

        appointments.forEach(appointment => {
            const row = createAppointmentRow(appointment);
            appointmentList.appendChild(row);
        });

    } catch (error) {
        console.error("Load Appointments Error:", error);
        appointmentList.innerHTML =
            "<p>Failed to load appointments.</p>";
    }
}