package com.project.omega.repository;

import com.project.omega.bean.dao.entity.OrderProduct;
import com.project.omega.bean.dao.entity.OrderProductPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderProductRepository extends JpaRepository<OrderProduct, OrderProductPK> {}
