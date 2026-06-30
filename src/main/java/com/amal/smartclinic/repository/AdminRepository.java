package com.amal.smartclinic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.amal.smartclinic.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    Admin findByUsername(String username);
}