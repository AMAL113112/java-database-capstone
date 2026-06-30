# Schema Architecture

## 1. Architecture Summary

This Spring Boot application follows a layered architecture using both MVC and REST principles. The Admin Dashboard and Doctor Dashboard use Thymeleaf controllers to render web pages, while the Appointment, Patient Dashboard, and Patient Record modules use REST controllers that exchange data in JSON format.

The application uses two databases. MySQL stores structured data such as Patients, Doctors, Appointments, and Admin information using JPA entities and repositories. MongoDB stores Prescription data using document models and a MongoDB repository. All requests pass through a common Service Layer, which contains the business logic and communicates with the appropriate repositories before accessing the databases.

## 2. Numbered Flow of Data and Control

1. Users access the Admin Dashboard, Doctor Dashboard, Appointment module, Patient Dashboard, or Patient Record module.
2. Requests are routed to either Thymeleaf Controllers or REST Controllers depending on the module being used.
3. The controllers send requests to the Service Layer for business processing.
4. The Service Layer communicates with MySQL Repositories or the MongoDB Repository as required.
5. MySQL Repositories access the MySQL database to retrieve or store application data.
6. The MySQL database works with JPA entity models such as Patient, Doctor, Appointment, and Admin.
7. MongoDB stores Prescription documents, which are accessed through the MongoDB Repository and MongoDB model classes.
