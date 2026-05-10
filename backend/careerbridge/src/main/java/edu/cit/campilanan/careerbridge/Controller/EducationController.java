package edu.cit.campilanan.careerbridge.Controller;

import edu.cit.campilanan.careerbridge.Entity.EducationEntity;
import edu.cit.campilanan.careerbridge.Service.EducationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/educations")
@CrossOrigin(origins = "http://localhost:5173")
public class EducationController {

    @Autowired
    private EducationService service;

    @PostMapping
    public EducationEntity saveEducation(
            @RequestBody EducationEntity education
    ) {
        return service.saveEducation(education);
    }

    @GetMapping("/{userId}")
    public List<EducationEntity> getEducations(
            @PathVariable String userId
    ) {
        return service.getEducations(userId);
    }

    @DeleteMapping("/{id}")
    public void deleteEducation(
            @PathVariable Long id
    ) {
        service.deleteEducation(id);
    }
}