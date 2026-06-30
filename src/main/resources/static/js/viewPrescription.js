document.addEventListener("DOMContentLoaded", loadPrescription);

async function loadPrescription() {
    const appointmentId =
        localStorage.getItem("prescriptionAppointmentId");

    if (!appointmentId) {
        alert("Appointment ID not found");
        return;
    }

    try {
        const response = await fetch(
            `http://localhost:8080/prescription/appointment/${appointmentId}`
        );

        if (!response.ok) {
            throw new Error("Prescription not found");
        }

        const prescription = await response.json();

        document.getElementById("patientName").textContent =
            prescription.patientName || "N/A";

        document.getElementById("doctorName").textContent =
            prescription.doctorName || "N/A";

        document.getElementById("appointmentId").textContent =
            prescription.appointmentId || "N/A";

        document.getElementById("diagnosis").textContent =
            prescription.diagnosis || "N/A";

        document.getElementById("medication").textContent =
            prescription.medication || "N/A";

        document.getElementById("dosage").textContent =
            prescription.dosage || "N/A";

        document.getElementById("doctorNotes").textContent =
            prescription.doctorNotes || "N/A";

        document.getElementById("prescriptionDate").textContent =
            prescription.prescriptionDate || "N/A";

    } catch (error) {
        console.error(error);
        alert("Failed to load prescription");
    }
}