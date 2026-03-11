package edu.cit.campilanan.careerbridge.Controller;

import edu.cit.campilanan.careerbridge.Service.OAuthService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class OAuthController {

    private final OAuthService oauthService;

    public OAuthController(OAuthService oauthService) {
        this.oauthService = oauthService;
    }

    @GetMapping("/oauth/success")
    public void oauthSuccess(Authentication authentication, HttpServletResponse response) throws IOException {

        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

        oauthService.processOAuthUser(oauthUser);

        response.sendRedirect("http://localhost:5173/dashboard");
    }
}