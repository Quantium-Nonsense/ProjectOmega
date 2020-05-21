package com.quantiumnonsense.omega.service.implmentations;

import com.quantiumnonsense.omega.bean.dao.entity.PasswordResetToken;
import com.quantiumnonsense.omega.bean.dao.entity.User;
import com.quantiumnonsense.omega.repository.PasswordResetTokenRepository;
import com.quantiumnonsense.omega.service.interfaces.PasswordResetTokenService;
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
