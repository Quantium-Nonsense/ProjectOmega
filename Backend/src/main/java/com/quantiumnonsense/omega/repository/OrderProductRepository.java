package com.quantiumnonsense.omega.repository;

import com.quantiumnonsense.omega.bean.dao.entity.OrderProduct;
import com.quantiumnonsense.omega.bean.dao.entity.OrderProductPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderProductRepository extends JpaRepository<OrderProduct, OrderProductPK> {}
