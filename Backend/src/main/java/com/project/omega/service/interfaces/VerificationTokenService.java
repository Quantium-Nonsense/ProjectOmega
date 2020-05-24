package com.project.omega.service.interfaces;

import com.project.omega.bean.dao.auth.VerificationToken;
import com.project.omega.bean.dao.entity.User;

public interface VerificationTokenService {

    void saveToken(String token, User user);

    VerificationToken findByToken(String token);

    void deleteToken(VerificationToken token);

    VerificationToken getByUser(User user);
}
