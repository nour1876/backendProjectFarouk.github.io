package com.nw.service;

import com.nw.dto.recruiter.*;
import com.nw.entity.recruter.EventEntity;
import com.nw.entity.recruter.OfferEntity;
import com.nw.entity.recruter.RecruterEntity;

import java.util.List;

public interface RecruterService {
    List<OfferDto> getListOffers(Long recruterId);
    List<EventDto> getListEvents(Long recruterId);

    OfferDto getOfferById(Long offerId, Long recruiterId);
    OfferDto getEventById(Long eventId, Long recruiterId);

    OfferEntity publishOffer(OfferDto offerDto);
    EventEntity publishEvent(EventDto eventDto);

    RecruterEntity addTechnicalTest(TestCandidateRequest testCandidateRequest);
    RecruterEntity completeProfile(RecruiterDto recruiterDto);
    RecruterEntity getRecruiterById(Long recruiterId);
    OfferRegistrationDto getOfferRegistrationById(Long offerId, Long recruiterId, Long registrationId);
    RecruterEntity sendTestToCandidate(Long registrationId, Long testId, Long recruiterId);
   OfferEntity updateOffer(OfferEntity offer,Long id);
  EventEntity updateEvent(EventEntity event,Long id);
  void updateHistoryStatus(Long historyId, String status);

}
