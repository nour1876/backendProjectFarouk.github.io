package com.nw.service.impl;

import com.nw.dto.recruiter.*;
import com.nw.entity.recruter.*;
import com.nw.exception.ResourceNotFoundException;
import com.nw.mapper.RecruiterMapper;
import com.nw.repository.recruter.*;
import com.nw.service.RecruterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.nw.model.History;
import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RecruterServiceImpl implements RecruterService {
    @Autowired
     private HistoryRepository historyRepository;
    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private RecruterRepository recruterRepository;
    @Autowired
    private RecruiterMapper recruiterMapper;
    @Autowired
    private TestRegistrationOfferRepository testRegistrationOfferRepository;
    @Autowired
    private OfferRegistrationRepository offerRegistrationRepository;
    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public List<OfferDto> getListOffers(Long recruterId) {
        List<OfferDto> offerDtos = new ArrayList<>();
        List<OfferEntity> offers = offerRepository.findByRecruterEntityId(recruterId);
        offers.stream().forEach(offer -> {
            OfferDto offerDto = toOfferDto(offer);
            offer.getOfferRegistrationEntity().stream().forEach(registration -> {
                offerDto.getOfferRegistrationDtos().add(toOfferRegistrationDto(registration));
            });
            offerDtos.add(offerDto);
        });
        return offerDtos;
    }

    @Override
    public List<EventDto> getListEvents(Long recruterId) {
        List<EventDto> eventDtos = new ArrayList<>();
        List<EventEntity> offers = eventRepository.findByRecruterEntityId(recruterId);
        offers.stream().forEach(event -> {
            EventDto eventDto = toEventDto(event);
            eventDtos.add(eventDto);
        });
        return eventDtos;
    }

    @Override
    public OfferDto getOfferById(Long offerId, Long recruiterId) {
        Optional<OfferEntity> optionalOffer = Optional.ofNullable(offerRepository.findByRecruterEntityIdAndId(recruiterId, offerId));
        OfferDto offerDto;
        if (optionalOffer.isPresent()) {
            OfferEntity offerEntity = optionalOffer.get();
            offerDto = toOfferDto(offerEntity);
            offerEntity.getOfferRegistrationEntity().stream().forEach(registration -> {
                offerDto.getOfferRegistrationDtos().add(toOfferRegistrationDto(registration));
            });
        } else {
            throw new ResourceNotFoundException("Offre non trouvée pour le recruteur spécifié");
        }
        return offerDto;
    }
    @Override
    public OfferEntity updateOffer(OfferEntity offer, Long id) {
        OfferEntity offer1 = offerRepository.getById(id);

        // Check if the "categorie" field is changed
        if (offer.getCategorie() != null) {
            offer1.setCategorie(offer.getCategorie());
        }
        if (offer.getTitle() != null) {
            offer1.setTitle(offer.getTitle());
        }
        // Check if the "status" field is changed
        if (offer.getStatus() != null) {
            offer1.setStatus(offer.getStatus());
        }

        // Check if the "description" field is changed
        if (offer.getDescription() != null) {
            offer1.setDescription(offer.getDescription());
        }

        // Check if the "salaire" field is changed
        if (offer.getSalaire() != null) {
            offer1.setSalaire(offer.getSalaire());
        }

        // Check if the "localisation" field is changed
        if (offer.getLocalisation() != null) {
            offer1.setLocalisation(offer.getLocalisation());
        }

        // Check if the "natureDeTravail" field is changed
        if (offer.getNatureDeTravail() != null) {
            offer1.setNatureDeTravail(offer.getNatureDeTravail());
        }

        // Check if the "publishDate" field is changed
        if (offer.getPublishDate() != null) {
            offer1.setPublishDate(offer.getPublishDate());
        }

        // Check if the "profile" field is changed
        if (offer.getProfile() != null) {
            offer1.setProfile(offer.getProfile());
        }

        offerRepository.save(offer1);
        return offer1;
    }
@Override
public void updateHistoryStatus(Long historyId, String status) {
    Optional<History> optionalHistory = historyRepository.findById(historyId);
    if (optionalHistory.isPresent()) {
        History history = optionalHistory.get();
        history.setStatus(status);
        historyRepository.save(history);
    } else {
        // Handle case when history with the given ID is not found
        throw new IllegalArgumentException("History not found");
    }
}
@Override
public EventEntity updateEvent(EventEntity event, Long id) {
    EventEntity event1 = eventRepository.getById(id);

    // Check if the "status" field is changed
    if (event.getStatus() != null) {
        event1.setStatus(event.getStatus());
    }

    // Check if the "title" field is changed
    if (event.getTitle() != null) {
        event1.setTitle(event.getTitle());
    }

    // Check if the "description" field is changed
    if (event.getDescription() != null) {
        event1.setDescription(event.getDescription());
    }

    // Check if the "typeEvent" field is changed
    if (event.getTypeEvent() != null) {
        event1.setTypeEvent(event.getTypeEvent());
    }

    // Check if the "photo" field is changed
    if (event.getPhoto() != null) {
        event1.setPhoto(event.getPhoto());
    }

    // Check if the "localisation" field is changed
    if (event.getLocalisation() != null) {
        event1.setLocalisation(event.getLocalisation());
    }

    // Check if the "companyName" field is changed
    if (event.getCompanyName() != null) {
        event1.setCompanyName(event.getCompanyName());
    }

    // Check if the "publishDate" field is changed
    if (event.getPublishDate() != null) {
        event1.setPublishDate(event.getPublishDate());
    }

    eventRepository.save(event1);
    return event1;
}

    @Override
    public OfferDto getEventById(Long eventId, Long recruiterId) {
        return null;
    }

    @Override
    public OfferEntity publishOffer(OfferDto offerDto) {
        RecruterEntity recruterEntity = recruterRepository.findById(offerDto.getRecruterId())
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter not found with id " + offerDto.getRecruterId()));
        OfferEntity offerEntity = toOfferEntity(offerDto);
        offerEntity.setPublishDate(new Date(System.currentTimeMillis()));
        offerEntity.setRecruterEntity(recruterEntity);
        offerEntity.setStatus("PENDING");
        return offerRepository.save(offerEntity);
    }

    @Override
    public EventEntity publishEvent(EventDto eventDto) {
        RecruterEntity recruterEntity = recruterRepository.findById(eventDto.getRecruterId())
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter not found with id " + eventDto.getRecruterId()));
        EventEntity eventEntity = toEventEntity(eventDto);
        eventEntity.setPublishDate(new Date(System.currentTimeMillis()));
        eventEntity.setRecruterEntity(recruterEntity);
        eventEntity.setStatus("PENDING");
        return eventRepository.save(eventEntity);
    }

    @Override
    @Transactional
    public RecruterEntity addTechnicalTest(TestCandidateRequest testCandidateRequest) {
        RecruterEntity recruterEntity = recruterRepository.findById(testCandidateRequest.getRecruiterId())
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter not found with id " + testCandidateRequest.getRecruiterId()));
        TestRegistrationOfferEntity testRegistrationOfferEntity;
        if (testCandidateRequest.getId() == null) {
            testRegistrationOfferEntity = new TestRegistrationOfferEntity();
        } else {
            testRegistrationOfferEntity = testRegistrationOfferRepository.findById(testCandidateRequest.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Test registration offer not found with id " + testCandidateRequest.getId()));
        }
        updateQuestions(testCandidateRequest, testRegistrationOfferEntity);
        testRegistrationOfferEntity.setTestName(testCandidateRequest.getTestName());
        testRegistrationOfferEntity.setRecruterEntity(recruterEntity);
        recruterEntity.getTestRegistrationOfferEntity().removeIf(
                existingTest -> existingTest.getId().equals(testRegistrationOfferEntity.getId()));
        recruterEntity.getTestRegistrationOfferEntity().add(testRegistrationOfferEntity);
        testRegistrationOfferRepository.save(testRegistrationOfferEntity);
        return recruterEntity;
    }

    private void updateQuestions(TestCandidateRequest testCandidateRequest, TestRegistrationOfferEntity testRegistrationOfferEntity) {
        List<QuestionEntity> questions = testCandidateRequest.getQuestionEntities()
                .stream()
                .map(questionDto -> {
                    QuestionEntity questionEntity;
                    if (questionDto.getId() != null) {
                        questionEntity = questionRepository.findById(questionDto.getId())
                                .orElseThrow(() -> new EntityNotFoundException("Question not found with id: " + questionDto.getId()));
                    } else {
                        questionEntity = new QuestionEntity();
                    }
                    recruiterMapper.toQuestionTestEntity(questionEntity, questionDto);
                    questionEntity.setTestRegistrationOfferEntity(testRegistrationOfferEntity);
                    return questionEntity;
                })
                .collect(Collectors.toList());
        testRegistrationOfferEntity.getQuestionEntities().removeIf(existingQuestion -> questions.stream()
                .anyMatch(newQuestion -> newQuestion.getId() != null && newQuestion.getId().equals(existingQuestion.getId())));
        testRegistrationOfferEntity.getQuestionEntities().addAll(questions);
    }

    @Override
    public RecruterEntity completeProfile(RecruiterDto recruiterDto) {
        RecruterEntity recruterEntity = recruterRepository.findById(recruiterDto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter not found with id " + recruiterDto.getId()));
        toRecruiterEntity(recruterEntity, recruiterDto);
        return recruterRepository.save(recruterEntity);
    }

    @Override
    public RecruterEntity getRecruiterById(Long recruiterId) {
        RecruterEntity recruterEntity = recruterRepository.findById(recruiterId)
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter not found with id " + recruiterId));
        return recruterEntity;
    }

    @Override
    public OfferRegistrationDto getOfferRegistrationById(Long offerId, Long recruiterId, Long registrationId) {
        Optional<OfferEntity> optionalOffer = Optional.ofNullable(offerRepository.findByRecruterEntityIdAndId(recruiterId, offerId));
        OfferRegistrationDto offerRegistrationDto;
        if (optionalOffer.isPresent()) {
            OfferRegistrationEntity offerRegistrationEntity = optionalOffer.get().getOfferRegistrationEntity().stream()
                    .filter(obj -> obj.getId() == registrationId).findFirst().orElse(null);
            offerRegistrationDto = toOfferRegistrationDto(offerRegistrationEntity);
        } else {
            throw new ResourceNotFoundException("Offre non trouvée pour le recruteur spécifié");
        }
        return offerRegistrationDto;
    }

    @Override
    public RecruterEntity sendTestToCandidate(Long registrationId, Long testId, Long recruiterId) {
        RecruterEntity recruterEntity = recruterRepository.findById(recruiterId)
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter not found with id " + recruiterId));
        TestRegistrationOfferEntity testRegistrationOffer = testRegistrationOfferRepository.findById(testId)
                .orElseThrow(() -> new ResourceNotFoundException("Test not found with id " + testId));
        OfferRegistrationEntity offerRegistration = offerRegistrationRepository.findById(registrationId)
                .orElseThrow(() -> new ResourceNotFoundException("Offer Registration not found with id " + registrationId));
        offerRegistration.setTestRegistrationOfferEntity(testRegistrationOffer);
        offerRegistration.setAccessibleTest(true);
        offerRegistration.setStatus("Test envoyé");
        testRegistrationOffer.getOfferRegistrationEntities().add(offerRegistration);
        recruterEntity.getTestRegistrationOfferEntity().removeIf(
                existingTest -> existingTest.getId().equals(testRegistrationOffer.getId()));
        recruterEntity.getTestRegistrationOfferEntity().add(testRegistrationOffer);
        testRegistrationOfferRepository.save(testRegistrationOffer);
        return recruterEntity;
    }

    private OfferEntity toOfferEntity(OfferDto offerDto) {
        OfferEntity offerEntity = new OfferEntity();
        offerEntity.setId(offerDto.getId());
        offerEntity.setTitle(offerDto.getTitle());
        offerEntity.setDescription(offerDto.getDescription());
        offerEntity.setSalaire(offerDto.getSalaire());
        offerEntity.setLocalisation(offerDto.getLocalisation());
        offerEntity.setNatureDeTravail(offerDto.getNatureDeTravail());
        offerEntity.setCategorie(offerDto.getCategorie());
        offerEntity.setLocalisation(offerDto.getLocalisation());
        offerEntity.setStatus(offerDto.getStatus());

        return offerEntity;
    }

    private EventEntity toEventEntity(EventDto eventDto) {
        EventEntity eventEntity = new EventEntity();
        eventEntity.setId(eventDto.getId());
        eventEntity.setTitle(eventDto.getTitle());
        eventEntity.setDescription(eventDto.getDescription());
        eventEntity.setPhoto(eventDto.getPhoto());
        eventEntity.setTypeEvent(eventDto.getTypeEvent());
        eventEntity.setPublishDate(eventDto.getPublicationDate());
        eventEntity.setLocalisation(eventDto.getLocalisation());

        eventEntity.setStatus(eventDto.getStatus());
        return eventEntity;
    }


    private void toRecruiterEntity(RecruterEntity recruterEntity, RecruiterDto recruiterDto) {
        recruterEntity.setHeadOffice(recruiterDto.getHeadOffice());
        recruterEntity.setServices(recruiterDto.getServices());
        recruterEntity.setWebsite(recruiterDto.getWebsite());
        recruterEntity.setBio(recruiterDto.getBio());
        recruterEntity.setFoundationDate(recruiterDto.getFoundationDate());
        recruterEntity.setSponsor(recruiterDto.isSponsor());
        recruterEntity.setGouvernorat(recruiterDto.getGouvernorat());
        recruterEntity.setCity(recruiterDto.getCity());
        recruterEntity.setDetails(recruiterDto.getDetails());
        recruterEntity.setSectionDescription(recruiterDto.getSectionDescription());
        recruterEntity.setSectionTitle(recruiterDto.getSectionTitle());
    }

    private OfferDto toOfferDto(OfferEntity offerEntity) {
        OfferDto offerDto = new OfferDto();
        offerDto.setId(offerEntity.getId());
        offerDto.setTitle(offerEntity.getTitle());
        offerDto.setDescription(offerEntity.getDescription());
        offerDto.setRecruterId(offerEntity.getRecruterEntity().getId());
        offerDto.setCategorie(offerEntity.getCategorie());
        return offerDto;
    }

    private EventDto toEventDto(EventEntity eventEntity) {
        EventDto eventDto = new EventDto();
        eventDto.setId(eventEntity.getId());
        eventDto.setTitle(eventEntity.getTitle());
        eventDto.setDescription(eventEntity.getDescription());
        eventDto.setTypeEvent(eventEntity.getTypeEvent());
        eventDto.setPhoto(eventEntity.getPhoto());
        eventDto.setPublicationDate(eventEntity.getPublishDate());
        eventDto.setRecruterId(eventEntity.getRecruterEntity().getId());
        eventDto.setCompanyName(eventEntity.getRecruterEntity().getCompanyName());
        eventDto.setLocalisation(eventEntity.getRecruterEntity().getCity());
        eventDto.setLogo(eventEntity.getRecruterEntity().getLogo());

        return eventDto;
    }


    private OfferRegistrationDto toOfferRegistrationDto(OfferRegistrationEntity offerRegistrationEntity) {
        OfferRegistrationDto offerRegistrationDto = new OfferRegistrationDto();
        offerRegistrationDto.setOfferId(offerRegistrationEntity.getOfferEntity().getId());
        offerRegistrationDto.setId(offerRegistrationEntity.getId());
        offerRegistrationDto.setCandidateId(offerRegistrationEntity.getCandidateEntity().getId());
        offerRegistrationDto.setPortfolioLink(offerRegistrationEntity.getPortfolioLink());
        offerRegistrationDto.setFirstName(offerRegistrationEntity.getCandidateEntity().getFirstName());
        offerRegistrationDto.setLastName(offerRegistrationEntity.getCandidateEntity().getLastName());
        offerRegistrationDto.setMail(offerRegistrationEntity.getCandidateEntity().getEmail());
        offerRegistrationDto.setCv(offerRegistrationEntity.getCv());
        offerRegistrationDto.setCoverLetter(offerRegistrationEntity.getCoverLetter());
        offerRegistrationDto.setEliminated(offerRegistrationEntity.isEliminated());
        offerRegistrationDto.setStatus(offerRegistrationEntity.getStatus());
        offerRegistrationDto.setAccessibleTest(offerRegistrationDto.isAccessibleTest());
        return offerRegistrationDto;
    }
}
