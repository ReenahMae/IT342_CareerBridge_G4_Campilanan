package edu.cit.campilanan.careerbridge.features.applications;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;

@Data
@Entity
@Table(name = "applications")

public class ApplicationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private java.util.UUID userId;
    private Long jobId;

    private String status;

    @Column(name = "resume_url")
    private String resumeUrl;

    @Column(name = "cover_letter", columnDefinition = "TEXT")
    private String coverLetter;

    private LocalDateTime appliedAt = LocalDateTime.now();

}