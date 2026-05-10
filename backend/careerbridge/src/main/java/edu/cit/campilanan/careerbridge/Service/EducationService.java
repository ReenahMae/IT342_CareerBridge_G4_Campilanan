package edu.cit.campilanan.careerbridge.Service;

import edu.cit.campilanan.careerbridge.Entity.EducationEntity;
import edu.cit.campilanan.careerbridge.Repository.EducationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EducationService {

    @Autowired
    private EducationRepository repository;

    public EducationEntity saveEducation(
            EducationEntity education
    ) {
        return repository.save(education);
    }

    public List<EducationEntity> getEducations(
            String userId
    ) {
        return repository.findByUserId(userId);
    }

    public void deleteEducation(
            Long id
    ) {
        repository.deleteById(id);
    }
}