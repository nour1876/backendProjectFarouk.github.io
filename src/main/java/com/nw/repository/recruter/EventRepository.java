package com.nw.repository.recruter;

import com.nw.entity.recruter.EventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<EventEntity, Long> {
    List<EventEntity> findByRecruterEntityId(Long recuiterId);

    EventEntity findByRecruterEntityIdAndId(Long recuiterId, Long id);

    List<EventEntity> findByStatus(String status);

    @Override
    EventEntity getById(Long aLong);
}
