package edu.cit.campilanan.careerbridge.features.jobs;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    // CREATE JOB
    public JobEntity createJob(JobEntity job) {
        return jobRepository.save(job);
    }

    // GET ALL JOBS
    public List<JobEntity> getAllJobs() {
        return jobRepository.findAll();
    }

}