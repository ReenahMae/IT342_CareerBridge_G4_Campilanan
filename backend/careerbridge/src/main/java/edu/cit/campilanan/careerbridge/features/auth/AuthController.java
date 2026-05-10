package edu.cit.campilanan.careerbridge.features.auth;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")

public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDTO request) {

        try {
            UserEntity user = userService.register(request);
            return ResponseEntity.ok(user);

        } catch (RuntimeException e) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginRequestDTO request) {

        UserEntity user = userService.authenticateUser(request);

        String token = userService.generateToken(user);

        return Map.of(
                "token", token,
                "role", user.getRole(),
                "id", user.getId(),
                "fullName", user.getFullName(),
                "email", user.getEmail()
        );
    }
}
