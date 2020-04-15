package com.project.omega.repository;

import com.project.omega.bean.dao.entity.Company;
import com.project.omega.bean.dao.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsByName(String name);
    List<Product> findByPriceGreaterThanEqual(int price);
    List<Product> findByPriceLessThanEqual(int price);
    List<Product> findByPrice(int price);
    List<Product> findByNameContaining(String name);
    List<Product> findByCompany_Id(Long id);
}
