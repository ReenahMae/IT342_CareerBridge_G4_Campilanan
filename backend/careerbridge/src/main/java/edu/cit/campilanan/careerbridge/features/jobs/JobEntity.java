package edu.cit.campilanan.careerbridge.features.jobs;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "jobs")
public class JobEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String company;

    private String location;

    private String salary;

    @Column(length = 1000)
    private String description;

    private String status;

    private String type;

    @Column(name = "posted_date")
    private String postedDate;

    private Integer applicants;

    @Column(name = "employer_id")
    private UUID employerId;

    public UUID getEmployerId() {
        return employerId;
    }

    public void setEmployerId(UUID employerId) {
        this.employerId = employerId;
    }
}