package edu.cit.campilanan.careerbridge.features.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:5173")
public class ProfileController {

    @Autowired
    private ProfileService service;

    @PostMapping
    public ProfileEntity saveProfile(
            @RequestBody ProfileEntity profile
    ) {

        return service.saveProfile(profile);

    }

    @GetMapping("/{userId}")
    public ProfileEntity getProfile(
            @PathVariable String userId
    ) {

        return service.getProfile(userId);

    }
}