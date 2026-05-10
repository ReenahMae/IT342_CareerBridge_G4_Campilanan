package edu.cit.campilanan.careerbridge.Service.adapter;

import edu.cit.campilanan.careerbridge.features.auth.UserEntity;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.time.LocalDateTime;

public class GoogleUserAdapter {

    public static UserEntity convert(OAuth2User oauthUser) {

        UserEntity user = new UserEntity();

        user.setEmail(oauthUser.getAttribute("email"));
        user.setFullName(oauthUser.getAttribute("name"));
        user.setRole("JOB_SEEKER");
        user.setAuthProvider("GOOGLE");
        user.setCreatedAt(LocalDateTime.now());

        return user;
    }
}