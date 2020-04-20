package com.project.omega.repository;

import com.project.omega.bean.dao.entity.Client;
import com.project.omega.bean.dao.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClientRepository extends JpaRepository <Client, Long> {

//    List<Client> findByClientNameContaining(String name);

}
