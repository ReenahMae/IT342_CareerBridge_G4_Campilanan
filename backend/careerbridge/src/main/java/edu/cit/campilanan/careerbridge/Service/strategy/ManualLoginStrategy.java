package edu.cit.campilanan.careerbridge.Service.strategy;

import edu.cit.campilanan.careerbridge.features.auth.UserEntity;
import edu.cit.campilanan.careerbridge.features.auth.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

public class ManualLoginStrategy implements LoginStrategy {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public ManualLoginStrategy(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserEntity login(String email, String password) {

        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(user.getAuthProvider().equals("GOOGLE")){
            throw new RuntimeException("Please login using Google");
        }

        if(!passwordEncoder.matches(password, user.getPasswordHash())){
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
}