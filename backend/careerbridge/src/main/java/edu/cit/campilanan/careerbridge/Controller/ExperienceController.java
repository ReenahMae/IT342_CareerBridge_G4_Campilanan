package edu.cit.campilanan.careerbridge.Controller;

import edu.cit.campilanan.careerbridge.Entity.ExperienceEntity;
import edu.cit.campilanan.careerbridge.Service.ExperienceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experiences")
@CrossOrigin(origins = "http://localhost:5173")
public class ExperienceController {

    @Autowired
    private ExperienceService service;

    @PostMapping
    public ExperienceEntity saveExperience(
            @RequestBody ExperienceEntity experience
    ) {

        return service.saveExperience(experience);

    }

    @GetMapping("/{userId}")
    public List<ExperienceEntity> getExperiences(
            @PathVariable String userId
    ) {

        return service.getExperiences(userId);

    }

    @DeleteMapping("/{id}")
    public void deleteExperience(
            @PathVariable Long id
    ) {

        service.deleteExperience(id);

    }
}