import { API_BASE_URL } from "./config/config.js";
import { createPatientRecordRow }
    from "./components/patientRecordRow.js";

document.addEventListener("DOMContentLoaded", () => {
    loadPrescriptions();
});

async function loadPrescriptions() {
    const content = document.getElementById("content");

    if (!content) return;

    const patientName =
        localStorage.getItem("patientName");

    if (!patientName) {
        content.innerHTML =
            "<p>Patient not found. Please login again.</p>";
        return;
    }

    try {
        const response = await fetch(
            `${API_BASE_URL}/prescription/patient/${patientName}`
        );

        if (!response.ok) {
            throw new Error(
                "Failed to load prescriptions"
            );
        }

        const prescriptions =
            await response.json();

        content.innerHTML = "";

        if (!prescriptions ||
            prescriptions.length === 0) {

            content.innerHTML = `
                <div class="doctor-card">
                    <h2>Medical Records</h2>
                    <p>No prescriptions available yet.</p>
                </div>
            `;
            return;
        }

        // Latest prescription first
        prescriptions.sort(
            (a, b) =>
                new Date(b.prescriptionDate) -
                new Date(a.prescriptionDate)
        );

        prescriptions.forEach(prescription => {
            const row =
                createPatientRecordRow(
                    prescription
                );

            content.appendChild(row);
        });

    } catch (error) {
        console.error(
            "Prescription Load Error:",
            error
        );

        content.innerHTML = `
            <div class="doctor-card">
                <h2>Error</h2>
                <p>Failed to load prescriptions.</p>
            </div>
        `;
    }
}