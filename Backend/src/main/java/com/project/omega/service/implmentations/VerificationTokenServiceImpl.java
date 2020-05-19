package com.project.omega.service.implmentations;

import com.project.omega.bean.dao.auth.VerificationToken;
import com.project.omega.bean.dao.entity.User;
import com.project.omega.repository.VerificationTokenRepository;
import com.project.omega.service.interfaces.VerificationTokenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VerificationTokenServiceImpl implements VerificationTokenService {

    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Override
    public void saveToken(String token, User user) {
        LOGGER.debug("Saving Token: {}", token);
        VerificationToken verificationToken = new VerificationToken(token, user);
        tokenRepository.save(verificationToken);
    }

    @Override
    public VerificationToken findByToken(String token) {
        LOGGER.debug("Finding Token : {}", token);
        return tokenRepository.findByToken(token);
    }

    @Override
    public void deleteToken(VerificationToken token) {
        LOGGER.debug("deleting expired token allocated to User: {}", token);
        tokenRepository.delete(token);
    }
}
