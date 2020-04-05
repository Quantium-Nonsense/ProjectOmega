package com.project.omega.repository;

import com.project.omega.bean.Industry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IndustryRepository extends JpaRepository <Industry, Long>
{
    boolean existsByIndustryName (String name);


}