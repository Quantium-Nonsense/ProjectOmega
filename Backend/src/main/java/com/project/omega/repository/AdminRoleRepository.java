package com.project.omega.repository;

import com.project.omega.bean.dao.auth.AdminRoles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRoleRepository extends JpaRepository<AdminRoles, Long> {

    AdminRoles findByName(String name);

    @Override
    void delete(AdminRoles role);

}
