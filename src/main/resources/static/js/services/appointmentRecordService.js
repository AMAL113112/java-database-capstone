import { API_BASE_URL } from "../config/config.js";

const APPOINTMENT_API = API_BASE_URL + "/appointment";

// Get appointments for logged patient
export async function getPatientAppointments(patientId) {
    try {
        const response = await fetch(
            `${APPOINTMENT_API}/patient/${patientId}`
        );

        console.log("Get Appointments Status:", response.status);

        if (!response.ok) {
            return [];
        }

        return await response.json();

    } catch (error) {
        console.error("Get Patient Appointments Error:", error);
        return [];
    }
}

// Book appointment
export async function bookAppointment(data) {
    try {
        console.log("Sending Appointment Data:", data);

        const response = await fetch(APPOINTMENT_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        console.log("Booking Status:", response.status);

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error("Booking Failed:", errorMessage);
            return null;
        }

        const result = await response.json();
        console.log("Booking Success:", result);

        return result;

    } catch (error) {
        console.error("Book Appointment Error:", error);
        return null;
    }
}

// Cancel appointment
export async function cancelAppointment(id) {
    try {
        const response = await fetch(
            `${APPOINTMENT_API}/cancel/${id}`,
            {
                method: "PUT"
            }
        );

        return {
            success: response.ok,
            message: await response.text()
        };

    } catch (error) {
        console.error("Cancel Appointment Error:", error);

        return {
            success: false,
            message: "Cancel failed"
        };
    }
}