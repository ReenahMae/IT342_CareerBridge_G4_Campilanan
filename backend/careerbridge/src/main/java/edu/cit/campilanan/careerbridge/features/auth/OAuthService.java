package edu.cit.campilanan.careerbridge.features.auth;

import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import edu.cit.campilanan.careerbridge.Service.adapter.GoogleUserAdapter;

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

            UserEntity user = GoogleUserAdapter.convert(oauthUser);
            return userRepository.save(user);
        });
    }
}
