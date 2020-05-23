package com.project.omega.repository;

import com.project.omega.bean.dao.entity.OrderProduct;
import com.project.omega.bean.dao.entity.OrderProductPK;
import com.project.omega.bean.dao.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderProductRepository extends JpaRepository<OrderProduct, Long> {
    @Modifying
    @Query("delete from OrderProduct op where op.product = ?1")
    void deleteByProductId(Product product);
}
