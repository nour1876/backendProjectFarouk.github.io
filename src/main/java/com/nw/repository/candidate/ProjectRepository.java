package com.nw.repository.candidate;

import com.nw.entity.candidate.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<ProjectEntity, Long> {
    @Override
    ProjectEntity getById(Long aLong);

    @Override
    List<ProjectEntity> findAll();


}
