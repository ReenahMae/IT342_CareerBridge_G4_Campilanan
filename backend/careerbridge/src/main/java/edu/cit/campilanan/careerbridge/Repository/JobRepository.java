package edu.cit.campilanan.careerbridge.Repository;

import edu.cit.campilanan.careerbridge.Entity.JobEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface JobRepository extends JpaRepository<JobEntity, Long> {
    List<JobEntity> findByEmployerId(UUID employerId);

}