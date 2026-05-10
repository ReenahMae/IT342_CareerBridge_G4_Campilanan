package edu.cit.campilanan.careerbridge.features.resume;

import edu.cit.campilanan.careerbridge.features.profile.ProfileEntity;
import edu.cit.campilanan.careerbridge.features.profile.ProfileRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "*")
public class ResumeController {

    @Autowired
    private ProfileRepository profileRepository;

    // =========================
    // CREATE / UPDATE RESUME
    // =========================
    @PostMapping("/upload")
    public ResponseEntity<?> uploadResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") String userId
    ) {

        try {

            String uploadDir =
                    System.getProperty("user.dir")
                            + "/uploads/";

            File dir = new File(uploadDir);

            if (!dir.exists()) {
                dir.mkdirs();
            }

            ProfileEntity profile =
                    profileRepository.findByUserId(userId);

            // =========================
            // DELETE OLD FILE
            // =========================
            if(profile != null &&
                    profile.getResume_url() != null){

                Path oldFilePath =
                        Paths.get(
                                uploadDir
                                        + profile.getResume_url()
                        );

                Files.deleteIfExists(oldFilePath);
            }

            // =========================
            // CREATE NEW FILE
            // =========================
            String fileName =
                    System.currentTimeMillis()
                            + "_"
                            + file.getOriginalFilename();

            File destination =
                    new File(uploadDir + fileName);

            file.transferTo(destination);

            // =========================
            // SAVE DATABASE
            // =========================
            if (profile != null) {

                profile.setResume_url(fileName);

                profileRepository.save(profile);
            }

            return ResponseEntity.ok(fileName);

        } catch (IOException e) {

            e.printStackTrace();

            return ResponseEntity
                    .badRequest()
                    .body("Upload failed");
        }
    }

    // =========================
    // DELETE RESUME
    // =========================
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteResume(
            @PathVariable String userId
    ) {

        try {

            ProfileEntity profile =
                    profileRepository.findByUserId(userId);

            if(profile != null &&
                    profile.getResume_url() != null){

                String uploadDir =
                        System.getProperty("user.dir")
                                + "/uploads/";

                Path filePath =
                        Paths.get(
                                uploadDir
                                        + profile.getResume_url()
                        );

                Files.deleteIfExists(filePath);

                profile.setResume_url(null);

                profileRepository.save(profile);
            }

            return ResponseEntity.ok(
                    "Resume deleted"
            );

        } catch (IOException e){

            e.printStackTrace();

            return ResponseEntity
                    .badRequest()
                    .body("Delete failed");
        }
    }
}