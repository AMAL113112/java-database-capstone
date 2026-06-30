import { deleteDoctor } from "../services/doctorServices.js";
import { bookAppointment } from "../services/appointmentRecordService.js";
import { showToast } from "./toast.js";

export function createDoctorCard(doctor) {
    const card = document.createElement("div");
    card.classList.add("doctor-card");

    const role = localStorage.getItem("userRole");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("doctor-info");

    const name = document.createElement("h3");
    name.textContent = doctor.name || "Doctor Name";

    const specialty = document.createElement("p");
    specialty.textContent =
        "Specialty: " + (doctor.specialty || "N/A");

    const availability = document.createElement("p");
    availability.textContent =
        "Available: " +
        (doctor.availableTimes?.join(", ") || "N/A");

    const email = document.createElement("p");
    email.textContent =
        "Email: " + (doctor.email || "N/A");

    infoDiv.appendChild(name);
    infoDiv.appendChild(specialty);
    infoDiv.appendChild(availability);
    infoDiv.appendChild(email);

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("card-actions");

    // ADMIN
    if (role === "admin") {
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", () => {
            const deleteModal =
                document.getElementById("deleteModal");
            const overlay =
                document.getElementById("modalOverlay");
            const confirmBtn =
                document.getElementById("confirmDeleteBtn");
            const cancelBtn =
                document.getElementById("cancelDeleteBtn");

            if (deleteModal) deleteModal.style.display = "block";
            if (overlay) overlay.style.display = "block";

            const closeModal = () => {
                if (deleteModal) deleteModal.style.display = "none";
                if (overlay) overlay.style.display = "none";
            };

            if (cancelBtn) {
                cancelBtn.onclick = closeModal;
            }

            if (confirmBtn) {
                confirmBtn.onclick = async () => {
                    const token = localStorage.getItem("token");

                    const response = await deleteDoctor(
                        doctor.id,
                        token
                    );

                    if (response.success) {
                        showToast("Doctor deleted successfully");
                        card.remove();
                    } else {
                        showToast(
                            response.message || "Delete failed"
                        );
                    }

                    closeModal();
                };
            }
        });

        actionsDiv.appendChild(deleteBtn);
    }

    // NOT LOGGED IN
    else if (role === "patient" || role === null) {
        const loginBtn = document.createElement("button");
        loginBtn.textContent = "Login to Book";

        loginBtn.addEventListener("click", () => {
            showToast("Please login to book appointment");
        });

        actionsDiv.appendChild(loginBtn);
    }

    // LOGGED IN PATIENT
    else if (role === "loggedPatient") {
        const bookBtn = document.createElement("button");
        bookBtn.textContent = "Book Now";

        bookBtn.addEventListener("click", () => {
            const bookingModal =
                document.getElementById("bookingModal");
            const overlay =
                document.getElementById("modalOverlay");
            const confirmBtn =
                document.getElementById("confirmBookingBtn");

            if (!bookingModal || !overlay || !confirmBtn) {
                showToast("Booking modal not found");
                return;
            }

            bookingModal.style.display = "block";
            overlay.style.display = "block";

            confirmBtn.onclick = async () => {
                const patientId =
                    localStorage.getItem("patientId");

                const date =
                    document.getElementById("appointmentDate")?.value;

                const time =
                    document.getElementById("appointmentTime")?.value;

                if (!date || !time) {
                    showToast("Select date and time");
                    return;
                }

                const appointmentData = {
                    doctorId: doctor.id,
                    patientId: Number(patientId),
                    appointmentTime: `${date}T${time}`
                };

                const result =
                    await bookAppointment(appointmentData);

                if (result) {
                    showToast("Appointment booked successfully");

                    bookingModal.style.display = "none";
                    overlay.style.display = "none";
                } else {
                    showToast("Booking failed");
                }
            };
        });

        actionsDiv.appendChild(bookBtn);
    }

    card.appendChild(infoDiv);
    card.appendChild(actionsDiv);

    return card;
}