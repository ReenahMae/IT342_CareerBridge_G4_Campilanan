package edu.cit.campilanan.careerbridge.Repository;

import edu.cit.campilanan.careerbridge.Entity.ExperienceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExperienceRepository
        extends JpaRepository<ExperienceEntity, Long> {

    List<ExperienceEntity> findByUserId(String userId);}