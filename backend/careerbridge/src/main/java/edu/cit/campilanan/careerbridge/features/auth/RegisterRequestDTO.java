package edu.cit.campilanan.careerbridge.features.auth;

import lombok.Data;
@Data
public class RegisterRequestDTO {
    private String fullName;
    private String email;
    private String password;
    private String role;
}
