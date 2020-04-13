package com.project.omega.repository;

import com.project.omega.bean.dao.entity.Industry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IndustryRepository extends JpaRepository <Industry, Long> {
    boolean existsByName (String name);

    Optional<Industry> findByName(String name);

}