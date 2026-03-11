package edu.cit.campilanan.careerbridge.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/jobseeker")
public class JobSeekerController {

    @GetMapping("/test")
    public String test(){
        return "JWT authentication works for JOB_SEEKER!";
    }
}