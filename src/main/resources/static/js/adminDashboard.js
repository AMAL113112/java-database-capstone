import { openModal, closeModal } from "./components/modals.js";
import {
    getDoctors,
    filterDoctors,
    saveDoctor
} from "./services/doctorServices.js";
import { createDoctorCard } from "./components/doctorCard.js";
import { API_BASE_URL } from "./config/config.js";

const APPOINTMENT_API = API_BASE_URL + "/appointment";

document.addEventListener("DOMContentLoaded", () => {
    loadDoctorCards();
    loadAppointments();

    const searchBar = document.getElementById("searchBar");
    const filterTime = document.getElementById("filterTime");
    const filterSpecialty = document.getElementById("filterSpecialty");

    if (searchBar) {
        searchBar.addEventListener("input", filterDoctorsOnChange);
    }

    if (filterTime) {
        filterTime.addEventListener("change", filterDoctorsOnChange);
    }

    if (filterSpecialty) {
        filterSpecialty.addEventListener("change", filterDoctorsOnChange);
    }
});

/* Handle dynamic buttons */
document.addEventListener("click", (event) => {
    if (event.target.id === "addDocBtn") {
        openModal("addDoctor");
    }

    if (event.target.id === "closeDoctorModal") {
        closeModal("addDoctor");
    }

    if (event.target.id === "modalOverlay") {
        closeModal("addDoctor");
    }
});

// ================= DOCTORS =================

async function loadDoctorCards() {
    try {
        const doctors = await getDoctors();
        renderDoctorCards(doctors);
    } catch (error) {
        console.error("Doctor Error:", error);
    }
}

function renderDoctorCards(doctors) {
    const contentDiv = document.getElementById("content");
    if (!contentDiv) return;

    contentDiv.innerHTML = "";

    if (!doctors || doctors.length === 0) {
        contentDiv.innerHTML = "<p>No doctors found</p>";
        return;
    }

    doctors.forEach(doctor => {
        const card = createDoctorCard(doctor);
        contentDiv.appendChild(card);
    });
}

async function filterDoctorsOnChange() {
    const name = document.getElementById("searchBar")?.value || "";
    const time = document.getElementById("filterTime")?.value || "";
    const specialty = document.getElementById("filterSpecialty")?.value || "";

    const doctors = await filterDoctors(name, time, specialty);
    renderDoctorCards(doctors);
}

window.adminAddDoctor = async function () {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Admin login required");
            return;
        }

        const name = document.getElementById("doctorName")?.value?.trim();
        const specialty = document.getElementById("doctorSpecialty")?.value?.trim();
        const email = document.getElementById("doctorEmail")?.value?.trim();
        const password = document.getElementById("doctorPassword")?.value?.trim();
        const phone = document.getElementById("doctorMobile")?.value?.trim();

        if (!name || !specialty || !email || !password || !phone) {
            alert("Please fill all fields");
            return;
        }

        const selectedAvailability =
            document.getElementById("doctorAvailability")?.value;

        let availableTimes = [];

        if (selectedAvailability === "Morning") {
            availableTimes = [
                "09:00-10:00",
                "10:00-11:00",
                "11:00-12:00"
            ];
        } else if (selectedAvailability === "Afternoon") {
            availableTimes = [
                "14:00-15:00",
                "15:00-16:00",
                "16:00-17:00"
            ];
        } else if (selectedAvailability === "Full Time") {
            availableTimes = [
                "09:00-10:00",
                "10:00-11:00",
                "11:00-12:00",
                "14:00-15:00",
                "15:00-16:00",
                "16:00-17:00"
            ];
        }

        const doctor = {
            name,
            specialty,
            email,
            password,
            phone,
            availableTimes
        };

        const response = await saveDoctor(doctor, token);

        if (response.success) {
            alert("Doctor added successfully");

            closeModal("addDoctor");

            document.getElementById("doctorName").value = "";
            document.getElementById("doctorSpecialty").value = "";
            document.getElementById("doctorEmail").value = "";
            document.getElementById("doctorPassword").value = "";
            document.getElementById("doctorMobile").value = "";

            loadDoctorCards();
        } else {
            alert(response.message || "Failed to add doctor");
        }

    } catch (error) {
        console.error(error);
        alert("Error while adding doctor");
    }
};

// ================= APPOINTMENTS =================

async function loadAppointments() {
    try {
        const response = await fetch(APPOINTMENT_API);

        if (!response.ok) {
            throw new Error("Failed to load appointments");
        }

        const appointments = await response.json();
        renderAppointments(appointments);

    } catch (error) {
        console.error("Appointment Error:", error);
    }
}

function renderAppointments(appointments) {
    const tbody = document.getElementById("appointmentTableBody");

    if (!tbody) return;

    tbody.innerHTML = "";

    if (!appointments || appointments.length === 0) {
        tbody.innerHTML =
            `<tr><td colspan="5">No appointments found</td></tr>`;
        return;
    }

    appointments.forEach(appointment => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${appointment.id}</td>
            <td>${appointment.patient?.name || "N/A"}</td>
            <td>${appointment.doctor?.name || "N/A"}</td>
            <td>${formatDateTime(appointment.appointmentTime)}</td>
            <td>${getStatusText(appointment.status)}</td>
        `;

        tbody.appendChild(row);
    });
}

function getStatusText(status) {
    if (status === 0) return "Scheduled";
    if (status === 1) return "Completed";
    if (status === 2) return "Cancelled";
    return "Unknown";
}

function formatDateTime(dateTime) {
    if (!dateTime) return "N/A";

    const date = new Date(dateTime);

    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}