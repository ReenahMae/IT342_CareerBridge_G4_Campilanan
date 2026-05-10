package edu.cit.campilanan.careerbridge.Repository;

import edu.cit.campilanan.careerbridge.Entity.EducationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EducationRepository
        extends JpaRepository<EducationEntity, Long> {

    List<EducationEntity> findByUserId(String userId);
}