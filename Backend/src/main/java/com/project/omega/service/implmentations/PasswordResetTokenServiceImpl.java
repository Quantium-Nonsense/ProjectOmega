package com.project.omega.service.implmentations;

import com.project.omega.bean.dao.entity.PasswordResetToken;
import com.project.omega.bean.dao.entity.User;
import com.project.omega.repository.PasswordResetTokenRepository;
import com.project.omega.service.interfaces.PasswordResetTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PasswordResetTokenServiceImpl implements PasswordResetTokenService {

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Override
    public PasswordResetToken findByToken(String token) {
        return passwordResetTokenRepository.findByToken(token);
    }

    @Override
    public PasswordResetToken findByUser(User user) {
        return passwordResetTokenRepository.findByUser(user);
    }

    @Override
    public void savePasswordResetToken(PasswordResetToken passwordResetToken) {

    }
}
