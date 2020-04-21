package com.project.omega.service.interfaces;

import com.project.omega.bean.dao.auth.Token;

public interface TokenService {

    Token saveToken(Token token);

    Token findByToken(String token);

    void deleteToken(Token token);

}
