package edu.cit.campilanan.careerbridge.Service.strategy;

import edu.cit.campilanan.careerbridge.features.auth.UserEntity;
import edu.cit.campilanan.careerbridge.features.auth.OAuthService;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class GoogleLoginStrategy implements LoginStrategy {

    private final OAuthService oAuthService;

    public GoogleLoginStrategy(OAuthService oAuthService) {
        this.oAuthService = oAuthService;
    }

    @Override
    public UserEntity login(String email, String password) {
        // Not used for Google login
        throw new UnsupportedOperationException("Use OAuth login instead");
    }

    public UserEntity loginWithOAuth(OAuth2User oauthUser) {
        return oAuthService.processOAuthUser(oauthUser);
    }
}