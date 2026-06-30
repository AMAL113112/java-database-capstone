# Smart Clinic Database Schema Design

## Overview
The Smart Clinic System manages structured and unstructured healthcare data such as patient records, doctor details, appointments, prescriptions, feedback, and system logs.

A hybrid database approach is used:
- MySQL for structured relational data
- MongoDB for flexible document-based data

---

## MySQL Database Design

### 1. Patients Table

| Column Name | Data Type | Constraints |
|-------------|-----------|-------------|
| patient_id | INT | PRIMARY KEY, AUTO_INCREMENT |
| full_name | VARCHAR(100) | NOT NULL |
| age | INT | NOT NULL |
| gender | VARCHAR(20) | NOT NULL |
| phone | VARCHAR(15) | UNIQUE, NOT NULL |
| email | VARCHAR(100) | UNIQUE |
| address | VARCHAR(255) | NOT NULL |

Purpose: Stores patient personal information.

---

### 2. Doctors Table

| Column Name | Data Type | Constraints |
|-------------|-----------|-------------|
| doctor_id | INT | PRIMARY KEY, AUTO_INCREMENT |
| doctor_name | VARCHAR(100) | NOT NULL |
| specialization | VARCHAR(100) | NOT NULL |
| phone | VARCHAR(15) | UNIQUE, NOT NULL |
| email | VARCHAR(100) | UNIQUE |
| experience_years | INT | NOT NULL |

Purpose: Stores doctor details.

---

### 3. Appointments Table

| Column Name | Data Type | Constraints |
|-------------|-----------|-------------|
| appointment_id | INT | PRIMARY KEY, AUTO_INCREMENT |
| patient_id | INT | FOREIGN KEY REFERENCES patients(patient_id) |
| doctor_id | INT | FOREIGN KEY REFERENCES doctors(doctor_id) |
| appointment_date | DATE | NOT NULL |
| appointment_time | TIME | NOT NULL |
| status | INT | 0 = Scheduled, 1 = Completed, 2 = Cancelled |

Purpose: Stores appointment scheduling.

---

### 4. Admin Table

| Column Name | Data Type | Constraints |
|-------------|-----------|-------------|
| admin_id | INT | PRIMARY KEY, AUTO_INCREMENT |
| username | VARCHAR(50) | UNIQUE, NOT NULL |
| password | VARCHAR(255) | NOT NULL |
| role | VARCHAR(50) | NOT NULL |

Purpose: Stores admin login details.

---

## MongoDB Collection Design

### Collection: prescriptions

Sample JSON Document:

```json
{
  "_id": "prescription001",
  "patientId": 1,
  "doctorId": 2,
  "diagnosis": "Viral Fever",
  "medicines": [
    {
      "name": "Paracetamol",
      "dosage": "500mg",
      "frequency": "Twice daily"
    },
    {
      "name": "Vitamin C",
      "dosage": "1000mg",
      "frequency": "Once daily"
    }
  ],
  "notes": "Drink plenty of water and take rest.",
  "createdAt": "2026-06-22"
}
```

Why MongoDB?
- Stores nested medicine lists easily
- Flexible schema for prescriptions
- Good for unstructured data like logs and feedback

---

## Design Decisions

- Appointment history is retained permanently for future medical reference and treatment tracking.
- Prescriptions are linked to appointments to maintain traceability between diagnosis and medication.
- MongoDB is used for prescriptions because the number of medicines and doctor notes can vary for each patient.
