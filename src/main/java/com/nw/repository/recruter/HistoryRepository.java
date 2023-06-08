package com.nw.repository.recruter;
import  com.nw.model.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

    @Repository
    public interface HistoryRepository extends JpaRepository<History, Long> {

    }


