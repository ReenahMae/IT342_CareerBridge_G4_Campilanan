package edu.cit.campilanan.careerbridge.Service;

import edu.cit.campilanan.careerbridge.Entity.ExperienceEntity;
import edu.cit.campilanan.careerbridge.Repository.ExperienceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienceService {

    @Autowired
    private ExperienceRepository repository;

    public ExperienceEntity saveExperience(
            ExperienceEntity experience
    ) {

        return repository.save(experience);

    }

    public List<ExperienceEntity> getExperiences(
            String userId
    ) {

        return repository.findByUserId(userId);

    }

    public void deleteExperience(
            Long id
    ) {

        repository.deleteById(id);

    }
}