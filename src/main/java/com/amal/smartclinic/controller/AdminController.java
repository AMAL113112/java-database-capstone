package com.amal.smartclinic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.amal.smartclinic.dto.LoginDTO;
import com.amal.smartclinic.model.Admin;
import com.amal.smartclinic.repository.AdminRepository;
import com.amal.smartclinic.service.TokenService;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private TokenService tokenService;

    @GetMapping
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @GetMapping("/{id}")
    public Admin getAdminById(@PathVariable Long id) {
        return adminRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Admin addAdmin(@RequestBody Admin admin) {
        return adminRepository.save(admin);
    }

    @PostMapping("/login")
    public String adminLogin(@RequestBody LoginDTO loginDTO) {

        Admin admin = adminRepository.findByUsername(
                loginDTO.getIdentifier()
        );

        if (admin == null) {
            return "Admin not found";
        }

        if (!admin.getPassword().equals(loginDTO.getPassword())) {
            return "Invalid password";
        }

        return tokenService.generateToken(
                "admin",
                admin.getUsername()
        );
    }

    @DeleteMapping("/{id}")
    public String deleteAdmin(@PathVariable Long id) {
        adminRepository.deleteById(id);
        return "Admin deleted successfully";
    }
}