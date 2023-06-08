package com.nw.repository.recruter;

import com.nw.dto.recruiter.OfferDto;
import com.nw.entity.recruter.OfferEntity;
import com.nw.entity.recruter.OfferRegistrationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfferRegistrationRepository extends JpaRepository<OfferRegistrationEntity, Long> {
    List<OfferRegistrationEntity> getOfferRegistrationEntitiesByCandidateEntityId(@Param("candidate_id") long candidate_id);


    OfferRegistrationEntity getById(Long id);
}
