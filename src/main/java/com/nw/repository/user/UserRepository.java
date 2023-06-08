package com.nw.repository.user;

import com.nw.entity.user.UserEntity;
import com.nw.entity.user.enums.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    List<UserEntity> findAllByRole_Name(ERole role);

    Optional<UserEntity> findByCode(String code);
}
