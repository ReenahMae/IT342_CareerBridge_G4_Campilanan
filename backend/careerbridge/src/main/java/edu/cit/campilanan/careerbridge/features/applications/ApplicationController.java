package edu.cit.campilanan.careerbridge.features.applications;

import edu.cit.campilanan.careerbridge.features.jobs.JobEntity;
import edu.cit.campilanan.careerbridge.features.auth.UserEntity;

import edu.cit.campilanan.careerbridge.features.jobs.JobRepository;
import edu.cit.campilanan.careerbridge.features.auth.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin

public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @PostMapping
    public ResponseEntity<?> apply(
            @RequestBody ApplicationEntity app
    ) {

        if (app.getUserId() == null || app.getJobId() == null) {
            return ResponseEntity.badRequest().body("Missing data");
        }

        app.setStatus("PENDING");

        applicationRepository.save(app);

        return ResponseEntity.ok("Application submitted");
    }

    @PostMapping("/upload")
    public ResponseEntity<?> applyWithResume(

            @RequestParam("resume") MultipartFile file,
            @RequestParam("coverLetter") String coverLetter,
            @RequestParam("jobId") Long jobId,
            @RequestParam("userId") UUID userId

    ) throws Exception {

        System.out.println("File Name: " + file.getOriginalFilename());
        System.out.println("Cover Letter: " + coverLetter);
        System.out.println("Job ID: " + jobId);
        System.out.println("User ID: " + userId);

        ApplicationEntity app = new ApplicationEntity();

        app.setUserId(userId);

        app.setJobId(jobId);

        app.setStatus("PENDING");

        String fileName = file.getOriginalFilename();

        File uploadDir = new File(System.getProperty("user.dir") + "/uploads");
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        File destination = new File(uploadDir.getAbsolutePath() + "/" + fileName);

        file.transferTo(destination);

        app.setResumeUrl(fileName);

        app.setCoverLetter(coverLetter);

        applicationRepository.save(app);

        return ResponseEntity.ok("Resume upload received");
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<?> getApplicantsByJob(
            @PathVariable Long jobId
    ) {

        List<ApplicationEntity> applications =
                applicationRepository.findByJobId(jobId);

        List<ApplicationResponseDTO> response =
                applications.stream().map(app -> {

                    ApplicationResponseDTO dto =
                            new ApplicationResponseDTO();

                    dto.setId(app.getId());

                    dto.setUserId(app.getUserId());

                    // SAFE USER FETCH
                    if (app.getUserId() != null) {

                        UserEntity user =
                                userRepository.findById(app.getUserId())
                                        .orElse(null);

                        if (user != null) {

                            dto.setApplicantName(user.getFullName());

                            dto.setApplicantEmail(user.getEmail());
                        }
                    }

                    dto.setJobId(app.getJobId());

                    // SAFE JOB FETCH
                    if (app.getJobId() != null) {

                        JobEntity job =
                                jobRepository.findById(app.getJobId())
                                        .orElse(null);

                        if (job != null) {

                            dto.setJobTitle(job.getTitle());
                        }
                    }

                    dto.setStatus(app.getStatus());

                    dto.setResumeUrl(app.getResumeUrl());

                    dto.setCoverLetter(app.getCoverLetter());

                    dto.setAppliedAt(app.getAppliedAt());

                    return dto;

                }).toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<?> getAllApplications() {

        List<ApplicationEntity> applications =
                applicationRepository.findAll();

        List<ApplicationResponseDTO> response =
                applications.stream().map(app -> {

                    ApplicationResponseDTO dto =
                            new ApplicationResponseDTO();

                    dto.setId(app.getId());

                    dto.setUserId(app.getUserId());

                    if (app.getUserId() != null) {

                        UserEntity user =
                                userRepository.findById(app.getUserId())
                                        .orElse(null);

                        if (user != null) {

                            dto.setApplicantName(user.getFullName());

                            dto.setApplicantEmail(user.getEmail());
                        }
                    }

                    dto.setJobId(app.getJobId());

                    if (app.getJobId() != null) {

                        JobEntity job =
                                jobRepository.findById(app.getJobId())
                                        .orElse(null);

                        if (job != null) {

                            dto.setJobTitle(job.getTitle());
                        }
                    }

                    dto.setStatus(app.getStatus());
                    dto.setResumeUrl(app.getResumeUrl());
                    dto.setCoverLetter(app.getCoverLetter());
                    dto.setAppliedAt(app.getAppliedAt());

                    return dto;

                }).toList();

        return ResponseEntity.ok(response);
    }
}