import { createDoctorCard } from "./components/doctorCard.js";
import { getDoctors, filterDoctors } from "./services/doctorServices.js";
import {
    patientLogin,
    patientSignup,
    getPatientById,
    updatePatient,
    deletePatient
} from "./services/patientServices.js";

document.addEventListener("DOMContentLoaded", () => {
    loadDoctorCards();

    const searchBar = document.getElementById("searchBar");
    const filterSpecialty = document.getElementById("filterSpecialty");

    if (searchBar) {
        searchBar.addEventListener("input", filterDoctorsOnChange);
    }

    if (filterSpecialty) {
        filterSpecialty.addEventListener("change", filterDoctorsOnChange);
    }
});

// Load doctors
async function loadDoctorCards() {
    const doctors = await getDoctors();
    renderDoctorCards(doctors);
}

// Render doctor cards
function renderDoctorCards(doctors) {
    const contentDiv = document.getElementById("content");

    if (!contentDiv) return;

    contentDiv.innerHTML = "";

    if (!doctors || doctors.length === 0) {
        contentDiv.innerHTML = "<p>No doctors available.</p>";
        return;
    }

    doctors.forEach(doctor => {
        const card = createDoctorCard(doctor);
        contentDiv.appendChild(card);
    });
}

// Filter doctors
async function filterDoctorsOnChange() {
    const name =
        document.getElementById("searchBar")?.value || "";

    const specialty =
        document.getElementById("filterSpecialty")?.value || "";

    const doctors =
        await filterDoctors(name, "", specialty);

    renderDoctorCards(doctors);
}

// Signup
window.signupPatient = async function () {
    const data = {
        name: document.getElementById("signupName")?.value,
        email: document.getElementById("signupEmail")?.value,
        password: document.getElementById("signupPassword")?.value,
        phone: document.getElementById("signupPhone")?.value,
        address: document.getElementById("signupAddress")?.value
    };

    const response = await patientSignup(data);

    if (response.success) {
        alert(response.message || "Signup successful");

        const signupModal =
            document.getElementById("patientSignupModal");
        const overlay =
            document.getElementById("modalOverlay");

        if (signupModal) signupModal.style.display = "none";
        if (overlay) overlay.style.display = "none";

        location.reload();
    } else {
        alert(response.message || "Signup failed");
    }
};

// Login
window.loginPatient = async function () {
    try {
        const data = {
            email: document.getElementById("loginEmail")?.value,
            password: document.getElementById("loginPassword")?.value
        };

        const response = await patientLogin(data);

        if (response.ok) {
            const result = await response.json();

            localStorage.setItem("token", result.token);
            localStorage.setItem("patientId", result.patientId);
            localStorage.setItem(
                "patientName",
                result.patientName || "Patient"
            );
            localStorage.setItem("userRole", "loggedPatient");

            const loginModal =
                document.getElementById("patientLoginModal");
            const overlay =
                document.getElementById("modalOverlay");

            if (loginModal) loginModal.style.display = "none";
            if (overlay) overlay.style.display = "none";

            window.location.href =
                "/pages/loggedPatientDashboard.html";
        } else {
            const errorText = await response.text();
            alert(errorText || "Invalid credentials");
        }

    } catch (error) {
        console.error("Login Error:", error);
        alert("Login failed");
    }
};

// SETTINGS
window.openSettings = async function () {
    document.getElementById("settingsModal").style.display =
        "block";

    document.getElementById("modalOverlay").style.display =
        "block";

    const patientId = localStorage.getItem("patientId");

    const patient = await getPatientById(patientId);

    if (!patient) {
        alert("Failed to load profile");
        return;
    }

    document.getElementById("settingsName").value =
        patient.name || "";

    document.getElementById("settingsEmail").value =
        patient.email || "";

    document.getElementById("settingsPhone").value =
        patient.phone || "";

    document.getElementById("settingsPassword").value =
        patient.password || "";
};

window.closeSettings = function () {
    document.getElementById("settingsModal").style.display =
        "none";

    document.getElementById("modalOverlay").style.display =
        "none";
};

window.saveSettings = async function () {
    const patientId = localStorage.getItem("patientId");

    const data = {
        name: document.getElementById("settingsName").value,
        email: document.getElementById("settingsEmail").value,
        phone: document.getElementById("settingsPhone").value,
        password:
            document.getElementById("settingsPassword").value
    };

    const response =
        await updatePatient(patientId, data);

    if (response.success) {
        localStorage.setItem("patientName", data.name);

        alert("Profile updated successfully");

        closeSettings();
        location.reload();
    } else {
        alert(response.message || "Update failed");
    }
};

window.deleteAccount = async function () {
    const confirmed = confirm(
        "Are you sure you want to delete account?"
    );

    if (!confirmed) return;

    const patientId = localStorage.getItem("patientId");

    const response =
        await deletePatient(patientId);

    if (response.success) {
        alert("Account deleted successfully");

        localStorage.clear();

        window.location.href = "/";
    } else {
        alert(response.message || "Delete failed");
    }
};