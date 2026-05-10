package edu.cit.campilanan.careerbridge.Service;

import edu.cit.campilanan.careerbridge.Entity.ProfileEntity;
import edu.cit.campilanan.careerbridge.Repository.ProfileRepository;
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