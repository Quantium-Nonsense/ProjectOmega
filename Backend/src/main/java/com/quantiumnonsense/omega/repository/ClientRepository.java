package com.quantiumnonsense.omega.repository;

import com.quantiumnonsense.omega.bean.dao.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository <Client, Long> {

//    List<Client> findByClientNameContaining(String name);

}
