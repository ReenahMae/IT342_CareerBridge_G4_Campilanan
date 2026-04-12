package edu.cit.campilanan.careerbridge.Service.strategy;


import edu.cit.campilanan.careerbridge.Entity.UserEntity;

public interface LoginStrategy {
    UserEntity login(String email, String password);
}
