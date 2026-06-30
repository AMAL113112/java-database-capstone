document.addEventListener("DOMContentLoaded", () => {
    const patientName =
        localStorage.getItem("prescriptionPatientName");

    const appointmentId =
        localStorage.getItem("prescriptionAppointmentId");

    if (patientName) {
        document.getElementById("patientName").value =
            patientName;
    }

    if (appointmentId) {
        document.getElementById("appointmentId").value =
            appointmentId;
    }
});

async function savePrescription() {
    const payload = {
        patientName:
            document.getElementById("patientName")
                .value.trim(),

        doctorName:
            localStorage.getItem("doctorName") || "Doctor",

        appointmentId:
            Number(
                document.getElementById("appointmentId")
                    .value
            ),

        diagnosis:
            document.getElementById("diagnosis")
                .value.trim(),

        medication:
            document.getElementById("medication")
                .value.trim(),

        dosage:
            document.getElementById("dosage")
                .value.trim(),

        doctorNotes:
            document.getElementById("doctorNotes")
                .value.trim(),

        prescriptionDate:
            new Date().toISOString().split("T")[0]
    };

    if (
        !payload.patientName ||
        !payload.appointmentId ||
        !payload.diagnosis ||
        !payload.medication ||
        !payload.dosage
    ) {
        alert("Please fill all required fields");
        return;
    }

    try {
        const response = await fetch(
            "http://localhost:8080/prescription",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify(payload)
            }
        );

        if (response.ok) {
            alert("Prescription saved successfully");

            localStorage.removeItem(
                "prescriptionPatientName"
            );

            localStorage.removeItem(
                "prescriptionAppointmentId"
            );

            const token =
                localStorage.getItem("token");

            console.log("Doctor Token:", token);

            if (!token) {
                alert(
                    "Token missing. Please login again."
                );
                window.location.href = "/";
                return;
            }

            window.location.href =
                "/doctorDashboard/" +
                encodeURIComponent(token);

        } else {
            const error = await response.text();
            alert(
                error ||
                "Failed to save prescription"
            );
        }

    } catch (error) {
        console.error(
            "Prescription Error:",
            error
        );
        alert("Server error");
    }
}

window.savePrescription = savePrescription;