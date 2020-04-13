package com.project.omega.service.implmentations;

import com.project.omega.bean.dao.auth.Token;
import com.project.omega.repository.TokenRepository;
import com.project.omega.service.interfaces.TokenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class TokenServiceImpl implements TokenService {

    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private TokenRepository tokenRepository;

    @Override
    public Token saveToken(Token token) {
        LOGGER.debug("Saving Token: {}", token);
        return tokenRepository.save(token);
    }

    @Override
    public Token findByToken(String token) {
        LOGGER.debug("Finding Token : {}", token);
        return tokenRepository.findByToken(token);
    }

    @Override
    public void deleteToken(Token token) {
        LOGGER.debug("deleting expired token allocated to User: {}", token);
        tokenRepository.delete(token);
    }
}
