package com.nw.service;

import com.nw.dto.candidate.ApplicationOfferFormRequest;
import com.nw.dto.candidate.CandidateDto;
import com.nw.dto.candidate.InvitationDto;
import com.nw.dto.candidate.ProjectDto;
import com.nw.dto.recruiter.EventDto;
import com.nw.dto.recruiter.OfferDto;
import com.nw.entity.candidate.CandidateEntity;
import com.nw.entity.candidate.ProjectEntity;
import com.nw.entity.recruter.OfferEntity;
import com.nw.entity.recruter.OfferRegistrationEntity;

import java.util.List;

public interface CandidateService {
    List<OfferDto> getAllOffersById();
    CandidateDto completeProfile(CandidateDto candidateDto);

    CandidateDto publishProject(ProjectDto projectDto);

    CandidateDto getCandidateById(Long candidateId);

    InvitationDto invitFriend(InvitationDto invitationDto);

    CandidateEntity applyOffer(ApplicationOfferFormRequest applicationOfferFormRequest);

    List<OfferDto> getAllOffers();
    List<EventDto> getAllEvents();

    OfferDto getOfferById(Long offerId);
    List<OfferRegistrationEntity>getOffersByCandidateId(Long id);
    void deleteOfferRegistrationEntityById(Long id);
    void updateOfferRegistrationStatus(Long id, String status);
     List<ProjectEntity> getAllProjects();
    CandidateEntity getProjectOwnerById(Long projectId);




}
