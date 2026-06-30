import { API_BASE_URL } from "../config/config.js";

const ADMIN_API = API_BASE_URL + "/admin/login";
const DOCTOR_API = API_BASE_URL + "/doctor/login";

/* ---------- Modal Functions ---------- */
window.closeModals = function () {
    document.getElementById("adminLoginModal").style.display =
        "none";

    document.getElementById("doctorLoginModal").style.display =
        "none";

    document.getElementById("modalOverlay").style.display =
        "none";
};

window.openAdminModal = function () {
    closeModals();

    document.getElementById("adminLoginModal").style.display =
        "block";

    document.getElementById("modalOverlay").style.display =
        "block";
};

window.openDoctorModal = function () {
    closeModals();

    document.getElementById("doctorLoginModal").style.display =
        "block";

    document.getElementById("modalOverlay").style.display =
        "block";
};

window.setRole = function (role) {
    localStorage.setItem("userRole", role);

    if (role === "patient") {
        window.location.href =
            "/pages/patientDashboard.html";
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const overlay =
        document.getElementById("modalOverlay");

    if (overlay) {
        overlay.addEventListener("click", closeModals);
    }
});

/* ---------- Admin Login ---------- */
window.adminLoginHandler = async function () {
    try {
        const username =
            document.getElementById("adminUsername").value;

        const password =
            document.getElementById("adminPassword").value;

        const admin = {
            identifier: username,
            password: password
        };

        const response = await fetch(ADMIN_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(admin)
        });

        if (response.ok) {
            const token = await response.text();

            localStorage.setItem("token", token);
            localStorage.setItem("userRole", "admin");

            window.location.href =
                "/adminDashboard/" + token;
        } else {
            alert("Invalid credentials!");
        }

    } catch (error) {
        alert(error.message);
    }
};

/* ---------- Doctor Login ---------- */
window.doctorLoginHandler = async function () {
    try {
        const email =
            document.getElementById("doctorEmail").value;

        const password =
            document.getElementById("doctorPassword").value;

        const doctor = {
            identifier: email,
            password: password
        };

        const response = await fetch(DOCTOR_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(doctor)
        });

        if (response.ok) {
            const data = await response.json();

            localStorage.setItem("token", data.token);
            localStorage.setItem("doctorId", data.doctorId);
            localStorage.setItem("userRole", "doctor");

            window.location.href =
                "/doctorDashboard/" + data.token;
        } else {
            alert("Invalid credentials!");
        }

    } catch (error) {
        alert(error.message);
    }
};