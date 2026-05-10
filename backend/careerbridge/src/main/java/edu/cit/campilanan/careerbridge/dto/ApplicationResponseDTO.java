package edu.cit.campilanan.careerbridge.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class ApplicationResponseDTO {

    private Long id;

    private UUID userId;

    private Long jobId;

    private String applicantName;

    private String applicantEmail;

    private String jobTitle;

    private String status;

    private String resumeUrl;

    private String coverLetter;

    private LocalDateTime appliedAt;
}