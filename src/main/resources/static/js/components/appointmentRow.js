export function createAppointmentRow(appointment) {
    const card = document.createElement("div");
    card.className = "appointment-card";

    let statusText = "Unknown";

    if (appointment.status === 0) {
        statusText = "Scheduled";
    } else if (appointment.status === 1) {
        statusText = "Completed";
    } else if (appointment.status === 2) {
        statusText = "Cancelled";
    } else if (appointment.status === 3) {
        statusText = "No Show";
    }

    // Format date/time nicely
    let formattedTime = "N/A";

    if (appointment.appointmentTime) {
        const date = new Date(appointment.appointmentTime);

        formattedTime = date.toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });
    }

    card.innerHTML = `
        <h3>${appointment.doctor.name}</h3>
        <p><strong>Specialty:</strong> ${appointment.doctor.specialty}</p>
        <p><strong>Appointment Time:</strong> ${formattedTime}</p>
        <p><strong>Status:</strong> ${statusText}</p>
    `;

    // Show update button only for scheduled appointments
    if (appointment.status === 0) {
        const updateBtn = document.createElement("button");
        updateBtn.textContent = "Update Appointment";

        updateBtn.addEventListener("click", () => {
            window.location.href =
                `/pages/updateAppointment.html?id=${appointment.id}`;
        });

        card.appendChild(updateBtn);
    }

    return card;
}