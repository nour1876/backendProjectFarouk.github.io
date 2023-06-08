package com.nw.controller;

import com.nw.dto.candidate.ApplicationOfferFormRequest;
import com.nw.dto.candidate.CandidateDto;
import com.nw.dto.candidate.InvitationDto;
import com.nw.dto.candidate.ProjectDto;
import com.nw.dto.recruiter.OfferDto;
import com.nw.entity.candidate.CandidateEntity;
import com.nw.entity.candidate.ProjectEntity;
import com.nw.entity.recruter.OfferEntity;
import com.nw.entity.recruter.OfferRegistrationEntity;
import com.nw.entity.recruter.RecruterEntity;
import com.nw.entity.user.UserEntity;
import com.nw.entity.user.enums.ERole;
import com.nw.exception.ResourceNotFoundException;
import com.nw.payload.ApiResponse;
import com.nw.repository.candidate.CandidateRepository;
import com.nw.repository.user.UserRepository;
import com.nw.service.AuthenticationService;
import com.nw.service.CandidateService;
import com.nw.service.impl.CandidateServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/candidate")
public class CandidateController {

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    CandidateServiceImpl candidateService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @PutMapping
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> completeProfile(@RequestBody CandidateDto candidateDto) {
        try {
            CandidateDto candidate = candidateService.completeProfile(candidateDto);
            return new ResponseEntity<>(candidate, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity
                    .internalServerError()
                    .body(new ApiResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }
    @GetMapping("/owner/project/{project_id}")
    CandidateEntity getProjectOwnerById( @PathVariable("project_id")  Long projectId){
        return  this.candidateService.getProjectOwnerById( projectId);
    }
    @GetMapping("/offers")
    public ResponseEntity<?> getAllOffers() {
        try {
            List<OfferDto> offers = candidateService.getAllOffers();
            return new ResponseEntity<>(offers, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity
                    .internalServerError()
                    .body(new ApiResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }
    @GetMapping("/offers/all/{candidate_id}")
    public List<OfferRegistrationEntity>getOffersByCandidateId(@PathVariable("candidate_id") Long candidateId){
        return this.candidateService.getOffersByCandidateId(candidateId);
    }
    @GetMapping("/offers/all")
    public ResponseEntity<?> getAllOffersById() {
        try {
            List<OfferDto> offers = candidateService.getAllOffersById();
            return new ResponseEntity<>(offers, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity
                    .internalServerError()
                    .body(new ApiResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }
    @GetMapping("/offers/{offer_id}")
   
    public ResponseEntity<?> getOfferById(@PathVariable("offer_id") Long offerId) {
        try {
            OfferDto offer = candidateService.getOfferById(offerId);
            return new ResponseEntity<>(offer, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity
                    .internalServerError()
                    .body(new ApiResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @PostMapping(value = "/project/add", consumes = MediaType.ALL_VALUE)
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> publishProject(@Valid @ModelAttribute ProjectDto projectDto) {
        try {
            CandidateDto candidate = candidateService.publishProject(projectDto);
            return new ResponseEntity<>(candidate, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity
                    .internalServerError()
                    .body(new ApiResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }


    @GetMapping("/{candidate_id}")

    public ResponseEntity<?> getCandidateById(@PathVariable("candidate_id") Long candidateId) {
        try {
            CandidateDto candidate = candidateService.getCandidateById(candidateId);
            return new ResponseEntity<>(candidate, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity
                    .internalServerError()
                    .body(new ApiResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @PutMapping("/invit")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> invitFriend(@RequestBody InvitationDto invitationDto) {
        try {
            InvitationDto invitation = candidateService.invitFriend(invitationDto);
            return new ResponseEntity<>(invitation, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity
                    .internalServerError()
                    .body(new ApiResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @PostMapping(value = "/offer-apply", consumes = MediaType.ALL_VALUE)
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> applyOffer(@Valid @ModelAttribute ApplicationOfferFormRequest applicationOfferFormRequest) {
        try {
            CandidateEntity offer = candidateService.applyOffer(applicationOfferFormRequest);
            return new ResponseEntity<>(offer, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity
                    .internalServerError()
                    .body(new ApiResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }
    @PutMapping("/{id}/{status}")
    public ResponseEntity<String> updateOfferRegistrationStatus(@PathVariable("id") Long id, @RequestParam("status") String status) {
        try {
            candidateService.updateOfferRegistrationStatus(id, status);
            return ResponseEntity.ok("Offer registration status updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update offer registration status");
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOfferRegistration(@PathVariable("id") Long id) {
        try {
            candidateService.deleteOfferRegistrationEntityById(id);
            return ResponseEntity.ok("Offer registration deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete offer registration");
        }
    }
    @GetMapping("/all-candidates")
    public List<UserEntity> getAllCandidate() {
        return userRepository.findAllByRole_Name(ERole.ROLE_CANDIDATE);
    }

    @GetMapping("/projects")
    List<ProjectEntity> getAllProjects(){
        return this.candidateService.getAllProjects();
    }

}
