package edu.cit.campilanan.careerbridge.features.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository repository;

    public ProfileEntity saveProfile(
            ProfileEntity profile
    ) {

        return repository.save(profile);

    }

    public ProfileEntity getProfile(
            String userId
    ) {

        return repository.findByUserId(userId);

    }

}