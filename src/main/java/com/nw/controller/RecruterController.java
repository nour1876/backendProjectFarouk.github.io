package com.nw.controller;

import com.nw.dto.recruiter.*;
import com.nw.entity.recruter.EventEntity;
import com.nw.entity.recruter.OfferEntity;
import com.nw.entity.recruter.RecruterEntity;
import com.nw.entity.user.UserEntity;
import com.nw.entity.user.enums.ERole;
import com.nw.payload.ApiResponse;
import com.nw.repository.recruter.EventRepository;
import com.nw.repository.recruter.OfferRepository;
import com.nw.repository.user.UserRepository;
import com.nw.service.CandidateService;
import com.nw.service.RecruterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/recruiter")
public class RecruterController {

    @Autowired
    RecruterService recruterService;

    @Autowired
    CandidateService candidateService;

    @Autowired
    OfferRepository offerRepository;

    @Autowired
    EventRepository eventRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    @PutMapping
    @PreAuthorize("hasRole('ROLE_RECRUTER')")
    public ResponseEntity<?> completeProfile(@RequestBody RecruiterDto recruiterDto) {
        try {
            RecruterEntity recruiter = recruterService.completeProfile(recruiterDto);
            return new ResponseEntity<>(recruiter, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @GetMapping("/{recruiter_id}")

    public ResponseEntity<?> getRecruiterById(@PathVariable("recruiter_id") Long recruiterId) {
        try {
            RecruterEntity recruiter = recruterService.getRecruiterById(recruiterId);
            return new ResponseEntity<>(recruiter, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @PostMapping("/offer/publish")
    @PreAuthorize("hasRole('ROLE_RECRUTER')")
    public ResponseEntity<?> publishOffer(@RequestBody OfferDto offerDto) {
        try {
            OfferEntity recruiter = recruterService.publishOffer(offerDto);
            return new ResponseEntity<>(recruiter, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @PostMapping("/event/publish")
    @PreAuthorize("hasRole('ROLE_RECRUTER')")
    public ResponseEntity<?> publishEvent(@RequestBody EventDto eventDto) {
        try {
            EventEntity recruiter = recruterService.publishEvent(eventDto);
            return new ResponseEntity<>(recruiter, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }
@PutMapping("/project/{id}")

    ResponseEntity<?> updateOffer(@PathVariable Long id,@RequestBody OfferEntity offer){
    OfferEntity offer1= recruterService.updateOffer(offer,id);
    return new ResponseEntity<>(offer1, HttpStatus.OK);


}
    @PutMapping("/event/{id}")
    public ResponseEntity<?> updateEvent(@RequestBody EventEntity event, @PathVariable Long id) {
        EventEntity updatedEvent = recruterService.updateEvent(event, id);
        return new ResponseEntity<>(updatedEvent, HttpStatus.OK);
    }
    @DeleteMapping("/offer/{id}")
    public ResponseEntity<String> deleteOffer(@PathVariable Long id) {
        if (!offerRepository.existsById(id)) {
            return new ResponseEntity<>("Offer not found", HttpStatus.NOT_FOUND);
        }
        offerRepository.deleteById(id);
        return new ResponseEntity<>("Offer with ID " + id + " has been deleted", HttpStatus.OK);}

   @PutMapping("/history/{id}/status")
   public ResponseEntity<String> updateHistoryStatus(@PathVariable("id") Long historyId,
                                                     @RequestParam("status") String status) {
       recruterService.updateHistoryStatus(historyId, status);
       return ResponseEntity.ok("History status updated successfully");
   }
    @DeleteMapping("/event/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable Long id) {
        if (!eventRepository.existsById(id)) {
            return new ResponseEntity<>("Event not found", HttpStatus.NOT_FOUND);
        }
        eventRepository.deleteById(id);
        return new ResponseEntity<>("Event with ID " + id + " has been deleted", HttpStatus.OK);
    }

    @PutMapping("/test/add")
    @PreAuthorize("hasRole('ROLE_RECRUTER')")
    public ResponseEntity<?> addTest(@RequestBody TestCandidateRequest testCandidateRequest) {
        try {
            RecruterEntity recruiter = recruterService.addTechnicalTest(testCandidateRequest);
            return new ResponseEntity<>(recruiter, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @PutMapping("/test/access")
    @PreAuthorize("hasRole('ROLE_RECRUTER')")
    public ResponseEntity<?> sendTestToCandidate(@RequestParam("registration_id") Long registrationId, @RequestParam("test_id") Long testId, @RequestParam("recruiter_id") Long recruiterId) {
        try {
            RecruterEntity recruiter = recruterService.sendTestToCandidate(registrationId, testId, recruiterId);
            return new ResponseEntity<>(recruiter, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @GetMapping("/offer")
    @PreAuthorize("hasRole('ROLE_RECRUTER')")
    public ResponseEntity<?> getAllOffers(@RequestParam(name = "recruiter_id") Long recruiterId) {
        try {
            List<OfferDto> offers = recruterService.getListOffers(recruiterId);
            return new ResponseEntity<>(offers, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @GetMapping("/events")
    public ResponseEntity<?> getAllEvent() {
        try {
            List<EventDto> events = candidateService.getAllEvents();
            return new ResponseEntity<>(events, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity
                    .internalServerError()
                    .body(new ApiResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @GetMapping("/event")
    @PreAuthorize("hasRole('ROLE_RECRUTER')")
    public ResponseEntity<?> getAllEvent(@RequestParam(name = "recruiter_id") Long recruiterId) {
        try {
            List<EventDto> events = recruterService.getListEvents(recruiterId);
            return new ResponseEntity<>(events, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }


    @GetMapping("/offers")
    public List<OfferEntity> getAllOffersHome() {
        return offerRepository.findByStatus("CONFIRMED");
    }

    @GetMapping("/offers-admin")
    public List<OfferEntity> getAllOffersAdmin() {
        return offerRepository.findAll();
    }

    @GetMapping("/event-admin")
    public List<EventEntity> getAlleventsAdmin() {
        return eventRepository.findAll();
    }

    @GetMapping("/offer/{id}")
    @PreAuthorize("hasRole('ROLE_RECRUTER')")
    public ResponseEntity<?> getOfferById(@PathVariable Long id, @RequestParam(name = "recruiter_id") Long recruiterId) {
        try {
            OfferDto offer = recruterService.getOfferById(id, recruiterId);
            return new ResponseEntity<>(offer, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @GetMapping("/offer/{offer_id}/registration/{registration_id}")
    @PreAuthorize("hasRole('ROLE_RECRUTER')")
    public ResponseEntity<?> getRegistrationById(@PathVariable(name = "offer_id") Long id, @RequestParam(name = "recruiter_id") Long recruiterId, @PathVariable(name = "registration_id") Long registrationId) {
        try {
            OfferRegistrationDto registration = recruterService.getOfferRegistrationById(id, recruiterId, registrationId);
            return new ResponseEntity<>(registration, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @PostMapping("/offer/{offer_id}/registration/{registration_id}/accept_candidate")
    @PreAuthorize("hasRole('ROLE_RECRUTER')")
    public ResponseEntity<?> acceptCandidate(@RequestParam(name = "technical_test") MultipartFile technicalTest, @RequestParam(name = "recruiter_id") Long recruiterId) {
        try {
            //OfferEntity recruiter = recruterService.acceptCandidate(offerDto);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }

    @GetMapping("/all-recruters")
    public List<UserEntity> getAllRecruters() {
        return userRepository.findAllByRole_Name(ERole.ROLE_RECRUTER);
    }

    @GetMapping("/accept-offer/{offer_id}")
    public ResponseEntity<?> confirmOffer(@PathVariable("offer_id") Long offerId) {
        OfferEntity offerEntity = offerRepository.findById(offerId).get();
        offerEntity.setStatus("CONFIRMED");
        offerRepository.save(offerEntity);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/reject-offer/{offer_id}")
    public ResponseEntity<?> rejectOffer(@PathVariable("offer_id") Long offerId) {
        OfferEntity offerEntity = offerRepository.findById(offerId).get();
        offerEntity.setStatus("REJECTED");
        offerRepository.save(offerEntity);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }


    @GetMapping("/accept-event/{event_id}")
    public ResponseEntity<?> confirmEvent(@PathVariable("event_id") Long eventId) {
        EventEntity eventEntity = eventRepository.findById(eventId).get();
        eventEntity.setStatus("CONFIRMED");
        eventRepository.save(eventEntity);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/reject-event/{event_id}")
    public ResponseEntity<?> rejectEvent(@PathVariable("event_id") Long eventId) {
        EventEntity eventEntity = eventRepository.findById(eventId).get();
        eventEntity.setStatus("REJECTED");
        eventRepository.save(eventEntity);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping("/send-test-link/{email}")
    public ResponseEntity<?> sendTestLink(@PathVariable("email") String email, @Valid @RequestBody String link) {
        String message = "Bonjour, Votre Candidature a retenu notre attention. \n Dans le cadre de notre processus de recrutement, nous avons le plaisir de vous inviter à passer une évaluation technique. \n Quand vous serez pret(e), cliquez sur le lien ci-dessous pour accéder à la page d'accueil de votre session: \n " + link ;
        this.sendSimpleMail(email, "Évaluation Technique", message);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping("/send-rejection-message/{email}")
    public ResponseEntity<?> sendRejectionMessage(@PathVariable("email") String email) {
        String message = "Bonjour, Votre Candidature malheureusement n'a  été selectionné";
        this.sendSimpleMail(email, "Rejection Message", message);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
    public void sendSimpleMail(String to, String sub, String body) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(to);
        mailMessage.setSubject(sub);
        mailMessage.setText(body);
        Boolean isSent = false;
        javaMailSender.send(mailMessage);
    }
}
