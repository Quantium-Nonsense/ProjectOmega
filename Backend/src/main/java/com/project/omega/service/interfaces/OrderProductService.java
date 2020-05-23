package com.project.omega.service.interfaces;

import com.project.omega.bean.dao.entity.OrderProduct;
import com.project.omega.bean.dao.entity.Product;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Validated
public interface OrderProductService {
    OrderProduct create(@NotNull(message = "The products for order cannot be null.") @Valid OrderProduct orderProduct);

    void deleteByProductId(Product product);
}
