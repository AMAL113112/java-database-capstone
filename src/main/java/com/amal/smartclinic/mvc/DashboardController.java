package com.amal.smartclinic.mvc;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.amal.smartclinic.service.TokenValidationService;

@Controller
public class DashboardController {

    @Autowired
    private TokenValidationService tokenValidationService;

    @GetMapping("/adminDashboard/{token}")
    public String adminDashboard(@PathVariable String token) {

        Map<String, String> response =
                tokenValidationService.validateToken(token, "admin");

        if (response.isEmpty()) {
            return "admin/adminDashboard";
        }

        return "redirect:/";
    }

    @GetMapping("/doctorDashboard/{token}")
    public String doctorDashboard(@PathVariable String token) {

        Map<String, String> response =
                tokenValidationService.validateToken(token, "doctor");

        if (response.isEmpty()) {
            return "doctor/doctorDashboard";
        }

        return "redirect:/";
    }
}