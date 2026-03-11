package edu.cit.campilanan.careerbridge.Service;
import edu.cit.campilanan.careerbridge.Entity.UserEntity;
import edu.cit.campilanan.careerbridge.Repository.UserRepository;
import edu.cit.campilanan.careerbridge.dto.RegisterRequestDTO;
import edu.cit.campilanan.careerbridge.dto.LoginRequestDTO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public UserEntity register(RegisterRequestDTO request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        UserEntity user = new UserEntity();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());

        // HASH PASSWORD
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        user.setAuthProvider("LOCAL");

        String role = request.getRole();

        if(role.equals("JOB_SEEKER") || role.equals("EMPLOYER")){
            user.setRole(role);
        }else{
            throw new RuntimeException("Invalid role");
        }

        user.setCreatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }

    public String login(LoginRequestDTO request){

        UserEntity user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(user.getAuthProvider().equals("GOOGLE")){
            throw new RuntimeException("Please login using Google");
        }

        if(!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())){
            throw new RuntimeException("Invalid password");
        }

        return jwtService.generateToken(user.getEmail(), user.getRole());
    }
}