package edu.cit.campilanan.careerbridge.Service;
import edu.cit.campilanan.careerbridge.Entity.UserEntity;
import edu.cit.campilanan.careerbridge.Repository.UserRepository;
import edu.cit.campilanan.careerbridge.dto.RegisterRequestDTO;
import edu.cit.campilanan.careerbridge.dto.LoginRequestDTO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import edu.cit.campilanan.careerbridge.Service.strategy.*;
import edu.cit.campilanan.careerbridge.Service.factory.UserFactory;



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

        // 👇 USE FACTORY HERE
        UserEntity user = UserFactory.createUser(request.getRole());

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setAuthProvider("LOCAL");
        user.setCreatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }

    public String login(LoginRequestDTO request){

        LoginContext context = new LoginContext();

        // Decide which strategy to use
        if(request.getLoginType().equalsIgnoreCase("manual")){
            context.setStrategy(new ManualLoginStrategy(userRepository, passwordEncoder));
        } else {
            throw new RuntimeException("Invalid login type");
        }

        // Execute login
        UserEntity user = context.executeLogin(
                request.getEmail(),
                request.getPassword()
        );

        return jwtService.generateToken(user.getEmail(), user.getRole());
    }
}