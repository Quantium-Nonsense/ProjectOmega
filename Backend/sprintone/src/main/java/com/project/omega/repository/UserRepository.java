package com.project.omega.repository;

import com.project.omega.bean.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {
    @Query(value = "SELECT COUNT(u) FROM Users WHERE u.email = ?1")
    int findByEmail(String email);
}
