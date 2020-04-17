package com.project.omega.repository;

import com.project.omega.bean.dao.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    Optional<Supplier> findByCompanyName(String name);
    boolean existsByCompanyName(String name);
}
