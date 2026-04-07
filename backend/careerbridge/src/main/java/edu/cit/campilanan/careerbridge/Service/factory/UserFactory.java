package edu.cit.campilanan.careerbridge.Service.factory;

import edu.cit.campilanan.careerbridge.Entity.UserEntity;

public class UserFactory {

    public static UserEntity createUser(String role) {

        UserEntity user = new UserEntity();

        if(role.equalsIgnoreCase("JOB_SEEKER")){
            user.setRole("JOB_SEEKER");
        } else if(role.equalsIgnoreCase("EMPLOYER")){
            user.setRole("EMPLOYER");
        } else {
            throw new RuntimeException("Invalid role");
        }

        return user;
    }
}