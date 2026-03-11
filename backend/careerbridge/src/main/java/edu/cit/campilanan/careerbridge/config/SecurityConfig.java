package edu.cit.campilanan.careerbridge.config;

import edu.cit.campilanan.careerbridge.Service.JwtAuthenticationFilter;
import edu.cit.campilanan.careerbridge.Service.OAuthService;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final OAuthService oauthService;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter, OAuthService oauthService) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.oauthService = oauthService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**","/oauth2/**","/login/**").permitAll()

                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/superadmin/**").hasRole("SUPERADMIN")
                        .requestMatchers("/employer/**").hasRole("EMPLOYER")
                        .requestMatchers("/jobseeker/**").hasRole("JOB_SEEKER")

                        .anyRequest().authenticated()
                )

                .oauth2Login(oauth -> oauth
                        .successHandler((request, response, authentication) -> {

                            OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

                            oauthService.processOAuthUser(oauthUser);

                            response.sendRedirect("http://localhost:5173/dashboard");
                        })
                )

                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint((req,res,e) ->
                                res.sendError(HttpStatus.UNAUTHORIZED.value(),"Unauthorized"))
                        .accessDeniedHandler((req,res,e) ->
                                res.sendError(HttpStatus.FORBIDDEN.value(),"Forbidden"))
                )

                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}