import { API_BASE_URL } from "./config/config.js";

document.addEventListener("DOMContentLoaded", () => {
    loadAppointments();

    const searchBar =
        document.getElementById("appointmentSearch");

    const dateFilter =
        document.getElementById("appointmentDate");

    if (searchBar) {
        searchBar.addEventListener(
            "input",
            filterAppointments
        );
    }

    if (dateFilter) {
        dateFilter.addEventListener(
            "change",
            filterAppointments
        );
    }
});

let allAppointments = [];

async function loadAppointments() {
    const appointmentContainer =
        document.getElementById("appointment-container");

    if (!appointmentContainer) return;

    const token = localStorage.getItem("token");
    const doctorId = localStorage.getItem("doctorId");

    if (!doctorId) {
        appointmentContainer.innerHTML =
            "<p>Doctor ID not found. Login again.</p>";
        return;
    }

    try {
        const response = await fetch(
            `${API_BASE_URL}/appointment/doctor/${doctorId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {
            throw new Error("Failed to load");
        }

        allAppointments = await response.json();

        allAppointments.sort(
            (a, b) =>
                new Date(b.appointmentTime) -
                new Date(a.appointmentTime)
        );

        renderAppointments(allAppointments);

    } catch (error) {
        console.error(error);
        appointmentContainer.innerHTML =
            "<p>Failed to load appointments</p>";
    }
}

async function renderAppointments(appointments) {
    const appointmentContainer =
        document.getElementById("appointment-container");

    const historyContainer =
        document.getElementById(
            "patient-history-container"
        );

    appointmentContainer.innerHTML = "";
    historyContainer.innerHTML = "";

    const newAppointments =
        appointments.filter(app => app.status === 0);

    const completedAppointments =
        appointments.filter(app => app.status === 1);

    // NEW APPOINTMENTS
    if (newAppointments.length === 0) {
        appointmentContainer.innerHTML =
            "<p>No new appointments found</p>";
    }

    newAppointments.forEach(appointment => {
        const card = document.createElement("div");
        card.classList.add("appointment-card");

        const patientName =
            appointment.patient?.name ||
            "Unknown Patient";

        card.innerHTML = `
            <h3>${patientName}</h3>
            <p>${formatAppointmentTime(
                appointment.appointmentTime
            )}</p>

            <div class="action-buttons">
                <button class="confirm-btn">
                    Confirm Attended
                </button>

                <button class="no-show-btn">
                    Didn't Attend
                </button>
            </div>
        `;

        const confirmBtn =
            card.querySelector(".confirm-btn");

        const noShowBtn =
            card.querySelector(".no-show-btn");

        confirmBtn.addEventListener(
            "click",
            async () => {
                await updateAppointmentStatus(
                    appointment.id,
                    "complete"
                );
            }
        );

        noShowBtn.addEventListener(
            "click",
            async () => {
                await updateAppointmentStatus(
                    appointment.id,
                    "no-show"
                );
            }
        );

        appointmentContainer.appendChild(card);
    });

    // PATIENT HISTORY
    if (completedAppointments.length === 0) {
        historyContainer.innerHTML =
            "<p>No patient history found</p>";
    }

    for (const appointment of completedAppointments) {
        const card = document.createElement("div");
        card.classList.add("appointment-card");

        const patientName =
            appointment.patient?.name ||
            "Unknown Patient";

        const exists =
            await prescriptionExists(
                appointment.id
            );

        const buttonText = exists
            ? "View Prescription"
            : "Add Prescription";

        card.innerHTML = `
            <h3>${patientName}</h3>
            <p>${formatAppointmentTime(
                appointment.appointmentTime
            )}</p>

            <small>Completed</small>

            <div class="action-buttons">
                <button class="prescription-btn">
                    ${buttonText}
                </button>
            </div>
        `;

        const btn =
            card.querySelector(
                ".prescription-btn"
            );

        btn.addEventListener("click", () => {
            localStorage.setItem(
                "prescriptionAppointmentId",
                appointment.id
            );

            localStorage.setItem(
                "prescriptionPatientName",
                patientName
            );

            if (exists) {
                window.location.href =
                    "/pages/viewPrescription.html";
            } else {
                window.location.href =
                    "/pages/addPrescription.html";
            }
        });

        historyContainer.appendChild(card);
    }
}

async function prescriptionExists(
    appointmentId
) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/prescription/appointment/${appointmentId}`
        );

        return response.ok;

    } catch (error) {
        console.error(error);
        return false;
    }
}

async function updateAppointmentStatus(
    id,
    action
) {
    try {
        const token =
            localStorage.getItem("token");

        const response = await fetch(
            `${API_BASE_URL}/appointment/${action}/${id}`,
            {
                method: "PUT",
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {
            throw new Error(
                "Status update failed"
            );
        }

        await loadAppointments();

    } catch (error) {
        console.error(error);
        alert("Status update failed");
    }
}

function filterAppointments() {
    const searchText =
        document
            .getElementById(
                "appointmentSearch"
            )
            ?.value.toLowerCase() || "";

    const selectedDate =
        document
            .getElementById(
                "appointmentDate"
            )
            ?.value || "";

    const filtered =
        allAppointments.filter(app => {
            const patientName =
                (
                    app.patient?.name || ""
                ).toLowerCase();

            const matchesName =
                patientName.includes(
                    searchText
                );

            const matchesDate =
                selectedDate === "" ||
                (
                    app.appointmentTime ||
                    ""
                ).includes(selectedDate);

            return (
                matchesName &&
                matchesDate
            );
        });

    renderAppointments(filtered);
}

function formatAppointmentTime(dateTime) {
    if (!dateTime) return "No Time";

    return dateTime
        .replace("T", " ")
        .substring(0, 16);
}