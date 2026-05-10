package edu.cit.campilanan.careerbridge.Repository;
import edu.cit.campilanan.careerbridge.Entity.ProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository
        extends JpaRepository<ProfileEntity, String> {

    ProfileEntity findByUserId(String userId);
}