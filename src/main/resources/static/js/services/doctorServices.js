import { API_BASE_URL } from "../config/config.js";

const DOCTOR_API = API_BASE_URL + "/doctor";

export async function getDoctors() {
    try {
        const response = await fetch(DOCTOR_API);

        if (!response.ok) {
            throw new Error("Failed to fetch doctors");
        }

        return await response.json();
    } catch (error) {
        console.error("Get Doctors Error:", error);
        return [];
    }
}

export async function deleteDoctor(id, token) {
    try {
        const response = await fetch(`${DOCTOR_API}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        let message = "";

        try {
            message = await response.text();
        } catch {
            message = "Delete completed";
        }

        return {
            success: response.ok,
            message
        };

    } catch (error) {
        console.error("Delete Doctor Error:", error);
        return {
            success: false,
            message: "Delete failed"
        };
    }
}

export async function saveDoctor(doctor, token) {
    try {
        const response = await fetch(DOCTOR_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(doctor)
        });

        let message = "";

        try {
            message = await response.text();
        } catch {
            message = "Doctor saved";
        }

        return {
            success: response.ok,
            message
        };

    } catch (error) {
        console.error("Save Doctor Error:", error);
        return {
            success: false,
            message: "Save failed"
        };
    }
}

export async function filterDoctors(name, time, specialty) {
    try {
        const url =
            `${DOCTOR_API}/filter?` +
            `name=${encodeURIComponent(name || "")}` +
            `&time=${encodeURIComponent(time || "")}` +
            `&specialty=${encodeURIComponent(specialty || "")}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to filter doctors");
        }

        return await response.json();

    } catch (error) {
        console.error("Filter Doctor Error:", error);
        return [];
    }
}