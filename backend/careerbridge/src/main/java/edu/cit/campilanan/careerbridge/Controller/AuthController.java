package edu.cit.campilanan.careerbridge.Controller;
import edu.cit.campilanan.careerbridge.Entity.UserEntity;
import edu.cit.campilanan.careerbridge.Service.UserService;
import edu.cit.campilanan.careerbridge.dto.LoginRequestDTO;
import edu.cit.campilanan.careerbridge.dto.RegisterRequestDTO;
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
    public Map<String, String> login(@RequestBody LoginRequestDTO request) {

        String token = userService.login(request);

        return Map.of("token", token);
    }
}
