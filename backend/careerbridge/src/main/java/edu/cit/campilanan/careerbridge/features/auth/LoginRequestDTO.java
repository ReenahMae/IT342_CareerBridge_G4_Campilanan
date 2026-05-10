package edu.cit.campilanan.careerbridge.features.auth;

import lombok.Data;
@Data
public class LoginRequestDTO {
    private String email;
    private String password;
    private String loginType;

}
