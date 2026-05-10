package edu.cit.campilanan.careerbridge.Service;
import edu.cit.campilanan.careerbridge.Entity.UserEntity;
import edu.cit.campilanan.careerbridge.Repository.UserRepository;
import edu.cit.campilanan.careerbridge.dto.RegisterRequestDTO;
import edu.cit.campilanan.careerbridge.dto.LoginRequestDTO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import edu.cit.campilanan.careerbridge.Service.strategy.*;
import edu.cit.campilanan.careerbridge.Service.factory.UserFactory;
import edu.cit.campilanan.careerbridge.Entity.ProfileEntity;
import edu.cit.campilanan.careerbridge.Repository.ProfileRepository;



import java.time.LocalDateTime;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final ProfileRepository profileRepository;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            ProfileRepository profileRepository
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.profileRepository = profileRepository;
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

        UserEntity savedUser = userRepository.save(user);

// CREATE PROFILE AUTOMATICALLY
        ProfileEntity profile = new ProfileEntity();

        profile.setId(savedUser.getEmail());
        profile.setUserId(savedUser.getEmail());
        profile.setFull_name(savedUser.getFullName());

        profileRepository.save(profile);

        return savedUser;
    }

    public UserEntity authenticateUser(LoginRequestDTO request) {

        LoginContext context = new LoginContext();

        String loginType = request.getLoginType();

        if (loginType == null) {
            loginType = "manual";
        }

        switch (loginType.toLowerCase()) {

            case "manual":
                context.setStrategy(
                        new ManualLoginStrategy(userRepository, passwordEncoder)
                );
                break;

            default:
                throw new RuntimeException("Invalid login type");
        }

        return context.executeLogin(
                request.getEmail(),
                request.getPassword()
        );
    }


    public String generateToken(UserEntity user) {

        return jwtService.generateToken(
                user.getEmail(),
                user.getRole()
        );
    }
}