package edu.cit.campilanan.careerbridge.Repository;

import edu.cit.campilanan.careerbridge.Entity.ApplicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository
        extends JpaRepository<ApplicationEntity, Long> {

    List<ApplicationEntity> findByJobId(Long jobId);

}
