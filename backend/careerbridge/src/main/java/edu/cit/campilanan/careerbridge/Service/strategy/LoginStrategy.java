package edu.cit.campilanan.careerbridge.Service.strategy;


import edu.cit.campilanan.careerbridge.features.auth.UserEntity;

public interface LoginStrategy {
    UserEntity login(String email, String password);
}
