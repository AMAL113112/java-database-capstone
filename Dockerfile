# Stage 1: Build Spring Boot application using Maven
FROM maven:3.9.6-eclipse-temurin-17 AS builder

# Set working directory inside container
WORKDIR /app

# Copy project files
COPY . .

# Build JAR file and skip tests
RUN mvn clean package -DskipTests

# Stage 2: Runtime image using lightweight JDK
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy generated JAR from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose Spring Boot port
EXPOSE 8080

# Start application
ENTRYPOINT ["java", "-jar", "app.jar"]
