package edu.cit.campilanan.careerbridge.Controller;
import edu.cit.campilanan.careerbridge.Entity.JobEntity;
import edu.cit.campilanan.careerbridge.Repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    @GetMapping
    public List<JobEntity> getJobs() {
        return jobRepository.findAll();
    }

    @GetMapping("/{id}")
    public JobEntity getJob(@PathVariable Long id) {
        return jobRepository.findById(id).orElse(null);
    }

    @PostMapping
    public JobEntity createJob(@RequestBody JobEntity job) {

        if (job.getStatus() == null || job.getStatus().isEmpty()) {
            job.setStatus("Open");
        }

        if (job.getType() == null || job.getType().isEmpty()) {
            job.setType("Full-Time");
        }

        if (job.getApplicants() == null) {
            job.setApplicants(0);
        }

        if (job.getPostedDate() == null || job.getPostedDate().isEmpty()) {
            job.setPostedDate(java.time.LocalDate.now().toString());
        }

        return jobRepository.save(job);
    }

}