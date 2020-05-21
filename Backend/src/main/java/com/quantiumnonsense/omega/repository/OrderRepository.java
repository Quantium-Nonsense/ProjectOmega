package com.quantiumnonsense.omega.repository;

import com.quantiumnonsense.omega.bean.dao.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

}
