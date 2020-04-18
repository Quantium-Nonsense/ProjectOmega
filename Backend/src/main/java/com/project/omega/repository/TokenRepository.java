package com.project.omega.repository;

import com.project.omega.bean.dao.auth.Token;
import com.project.omega.bean.dao.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.stream.Stream;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {

    Token findByToken(String token);

    Token findByUser(User user);

    Stream<Token> findAllByExpiryDateLessThan(Date now);

    void deleteByExpiryDateLessThan(Date now);

    @Modifying
    @Query("delete from Token t where t.expiryDate <= ?1")
    void deleteAllExpiredSince(Date now);
}
