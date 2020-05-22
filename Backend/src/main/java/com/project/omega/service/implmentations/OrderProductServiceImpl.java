package com.project.omega.service.implmentations;

import com.project.omega.bean.dao.entity.OrderProduct;
import com.project.omega.repository.OrderProductRepository;
import com.project.omega.service.interfaces.OrderProductService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class OrderProductServiceImpl implements OrderProductService {

    private OrderProductRepository orderProductRepository;

    public OrderProductServiceImpl(OrderProductRepository orderProductRepository) {
        this.orderProductRepository = orderProductRepository;
    }

    @Override
    public OrderProduct create(OrderProduct orderProduct) {
        return orderProductRepository.save(orderProduct);
    }

    @Override
    public void deleteByProductId(Long id) {
        orderProductRepository.deleteByProductId(id);
    }
}