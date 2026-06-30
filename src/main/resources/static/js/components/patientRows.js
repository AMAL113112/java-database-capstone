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

    card.innerHTML = `
        <h3>Dr. ${appointment.doctor.name}</h3>
        <p><strong>Specialty:</strong> ${appointment.doctor.specialty}</p>
        <p><strong>Time:</strong> ${appointment.appointmentTime}</p>
        <p><strong>Status:</strong> ${statusText}</p>
    `;

    return card;
}