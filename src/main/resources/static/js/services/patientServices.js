import { API_BASE_URL } from "../config/config.js";

const PATIENT_API = API_BASE_URL + "/patient";

// Signup
export async function patientSignup(data) {
    try {
        const response = await fetch(PATIENT_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorText = await response.text();

            return {
                success: false,
                message: errorText || "Signup failed"
            };
        }

        await response.json();

        return {
            success: true,
            message: "Signup successful"
        };

    } catch (error) {
        console.error("Signup Error:", error);

        return {
            success: false,
            message: "Signup failed"
        };
    }
}

// Login
export async function patientLogin(data) {
    try {
        const payload = {
            identifier: data.email,
            password: data.password
        };

        const response = await fetch(
            `${PATIENT_API}/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        );

        return response;

    } catch (error) {
        console.error("Login Error:", error);
        throw error;
    }
}

// Get patient by ID
export async function getPatientById(id) {
    try {
        const response = await fetch(
            `${PATIENT_API}/${id}`
        );

        if (!response.ok) {
            return null;
        }

        return await response.json();

    } catch (error) {
        console.error("Get Patient Error:", error);
        return null;
    }
}

// Update patient
export async function updatePatient(id, data) {
    try {
        const response = await fetch(
            `${PATIENT_API}/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        if (!response.ok) {
            const errorText = await response.text();

            return {
                success: false,
                message: errorText || "Update failed"
            };
        }

        const result = await response.json();

        return {
            success: true,
            data: result
        };

    } catch (error) {
        console.error("Update Patient Error:", error);

        return {
            success: false,
            message: "Update failed"
        };
    }
}

// Delete patient
export async function deletePatient(id) {
    try {
        const response = await fetch(
            `${PATIENT_API}/${id}`,
            {
                method: "DELETE"
            }
        );

        return {
            success: response.ok,
            message: await response.text()
        };

    } catch (error) {
        console.error("Delete Patient Error:", error);

        return {
            success: false,
            message: "Delete failed"
        };
    }
}