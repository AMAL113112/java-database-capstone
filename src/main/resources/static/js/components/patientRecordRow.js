export function createPatientRecordRow(prescription) {
    const card = document.createElement("div");
    card.classList.add("doctor-card");

    card.innerHTML = `
        <h2>Prescription</h2>

        <p>
            <strong>Doctor Name:</strong>
            ${prescription.doctorName || "N/A"}
        </p>

        <p>
            <strong>Diagnosis:</strong>
            ${prescription.diagnosis || "N/A"}
        </p>

        <p>
            <strong>Medication:</strong>
            ${prescription.medication || "N/A"}
        </p>

        <p>
            <strong>Dosage:</strong>
            ${prescription.dosage || "N/A"}
        </p>

        <p>
            <strong>Doctor Notes:</strong>
            ${prescription.doctorNotes || "N/A"}
        </p>

        <p>
            <strong>Prescription Date:</strong>
            ${prescription.prescriptionDate || "N/A"}
        </p>

        <p>
            <strong>Appointment ID:</strong>
            ${prescription.appointmentId || "N/A"}
        </p>
    `;

    return card;
}