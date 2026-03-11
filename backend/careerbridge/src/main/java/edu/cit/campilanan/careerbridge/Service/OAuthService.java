package edu.cit.campilanan.careerbridge.Service;

import edu.cit.campilanan.careerbridge.Entity.UserEntity;
import edu.cit.campilanan.careerbridge.Repository.UserRepository;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class OAuthService {
    private final UserRepository userRepository;

    public OAuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserEntity processOAuthUser(OAuth2User oauthUser) {

        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        return userRepository.findByEmail(email).orElseGet(() -> {

            UserEntity user = new UserEntity();
            user.setEmail(email);
            user.setFullName(name);
            user.setRole("JOB_SEEKER");
            user.setAuthProvider("GOOGLE");
            user.setCreatedAt(LocalDateTime.now());

            return userRepository.save(user);
        });
    }
}
