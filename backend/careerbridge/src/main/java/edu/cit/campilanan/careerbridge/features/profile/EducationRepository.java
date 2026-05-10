package edu.cit.campilanan.careerbridge.features.profile;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EducationRepository
        extends JpaRepository<EducationEntity, Long> {

    List<EducationEntity> findByUserId(String userId);
}