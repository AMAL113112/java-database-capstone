const AUTH_ENABLED = false;

function renderHeader() {
    const headerDiv = document.getElementById("header");

    if (!headerDiv) return;

    const currentPath = window.location.pathname;
    const isHomePage =
        currentPath === "/" ||
        currentPath.endsWith("/index.html");

    if (isHomePage) {
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
        localStorage.removeItem("patientId");
        localStorage.removeItem("patientName");
    }

    const role = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");

    if (
        AUTH_ENABLED &&
        (
            role === "loggedPatient" ||
            role === "admin" ||
            role === "doctor"
        ) &&
        !token
    ) {
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
        localStorage.removeItem("patientId");
        localStorage.removeItem("patientName");

        alert("Session expired or invalid login. Please log in again.");
        window.location.href = "/";
        return;
    }

    let headerContent = "";

    // ADMIN
    if (role === "admin") {
        headerContent = `
            <header>
                <button id="addDocBtn">Add Doctor</button>
                <button onclick="logout()">Logout</button>
            </header>
        `;
    }

    // DOCTOR
    else if (role === "doctor") {
        headerContent = `
            <header>
                <button onclick="goHome()">Home</button>
                <button onclick="logout()">Logout</button>
            </header>
        `;
    }

    // HOMEPAGE
    else if (isHomePage) {
        headerContent = `
            <header>
                <button onclick="openAdminModal()">
                    Admin Login
                </button>

                <button onclick="openDoctorModal()">
                    Doctor Login
                </button>

                <button onclick="setRole('patient')">
                    Patient Portal
                </button>
            </header>
        `;
    }

    // PATIENT DASHBOARD (before login)
    else if (role === "patient") {
        headerContent = `
            <header>
                <button id="patientLogin">Login</button>
                <button id="patientSignup">Sign Up</button>
            </header>
        `;
    }

    // LOGGED PATIENT
    else if (role === "loggedPatient") {
        headerContent = `
            <header>
                <button onclick="goLoggedPatientHome()">Home</button>
                <button onclick="goAppointments()">Appointments</button>
                <button onclick="logout()">Logout</button>
            </header>
        `;
    }

    headerDiv.innerHTML = headerContent;

    const loginBtn = document.getElementById("patientLogin");
    const signupBtn = document.getElementById("patientSignup");

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            document.getElementById("patientLoginModal").style.display = "block";
            document.getElementById("modalOverlay").style.display = "block";
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener("click", () => {
            document.getElementById("patientSignupModal").style.display = "block";
            document.getElementById("modalOverlay").style.display = "block";
        });
    }
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("patientId");
    localStorage.removeItem("patientName");

    window.location.href = "/";
}

function goLoggedPatientHome() {
    window.location.href =
        "/pages/loggedPatientDashboard.html";
}

function goAppointments() {
    window.location.href =
        "/pages/patientAppointments.html";
}

function goHome() {
    window.location.href = "/";
}

window.logout = logout;
window.goAppointments = goAppointments;
window.goLoggedPatientHome = goLoggedPatientHome;
window.goHome = goHome;

renderHeader();