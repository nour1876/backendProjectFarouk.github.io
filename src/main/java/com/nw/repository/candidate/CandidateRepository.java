package com.nw.repository.candidate;

import com.nw.dto.recruiter.OfferDto;
import com.nw.entity.candidate.CandidateEntity;
import com.nw.entity.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CandidateRepository extends JpaRepository<CandidateEntity, Long> {

    Optional<CandidateEntity> findByCode(String code);


}
