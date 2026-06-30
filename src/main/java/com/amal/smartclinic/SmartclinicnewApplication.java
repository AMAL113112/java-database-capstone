package com.amal.smartclinic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.amal.smartclinic.repository")
@EnableMongoRepositories(basePackages = "com.amal.smartclinic.repository")
public class SmartclinicnewApplication {

    public static void main(String[] args) {
        SpringApplication.run(
            SmartclinicnewApplication.class,
            args
        );
    }
}