package com.project.omega.repository;

import com.project.omega.bean.OrderProduct;
import com.project.omega.bean.OrderProductPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderProductRepository extends JpaRepository<OrderProduct, OrderProductPK> {}
