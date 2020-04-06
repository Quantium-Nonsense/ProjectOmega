package com.project.omega.repository;

import com.project.omega.bean.Product;
import com.project.omega.bean.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsByName(String name);
    List<Product> findByPriceGreaterThanEqual(int price);
    List<Product> findByPriceLessThanEqual(int price);
    List<Product> findByPrice(int price);
    List<Product> findByNameContaining(String name);
    List<Product> findByUser(Optional<User> user);

}
