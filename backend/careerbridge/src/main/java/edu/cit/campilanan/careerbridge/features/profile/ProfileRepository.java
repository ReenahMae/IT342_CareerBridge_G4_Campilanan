package edu.cit.campilanan.careerbridge.features.profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository
        extends JpaRepository<ProfileEntity, String> {

    ProfileEntity findByUserId(String userId);
}