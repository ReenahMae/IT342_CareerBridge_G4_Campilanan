package edu.cit.campilanan.careerbridge.Service.strategy;

import edu.cit.campilanan.careerbridge.features.auth.UserEntity;

public class LoginContext {

    private LoginStrategy strategy;

    public void setStrategy(LoginStrategy strategy) {
        this.strategy = strategy;
    }

    public UserEntity executeLogin(String email, String password) {
        return strategy.login(email, password);
    }
}