package com.project.omega.service.interfaces;

import com.project.omega.bean.dao.entity.PasswordResetToken;
import com.project.omega.bean.dao.entity.User;

public interface PasswordResetTokenService {

    PasswordResetToken findByToken(String token);

    PasswordResetToken findByUser(User user);

    void savePasswordResetToken(PasswordResetToken passwordResetToken);
}
