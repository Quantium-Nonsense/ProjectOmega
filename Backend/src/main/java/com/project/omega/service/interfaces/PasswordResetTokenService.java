package com.quantiumnonsense.omega.service.interfaces;

import com.quantiumnonsense.omega.bean.dao.entity.PasswordResetToken;
import com.quantiumnonsense.omega.bean.dao.entity.User;

public interface PasswordResetTokenService {

    PasswordResetToken findByToken(String token);

    PasswordResetToken findByUser(User user);

    void savePasswordResetToken(PasswordResetToken passwordResetToken);
}
