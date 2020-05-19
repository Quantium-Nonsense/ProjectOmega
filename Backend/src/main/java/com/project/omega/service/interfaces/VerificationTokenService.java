package com.project.omega.service.interfaces;

import com.project.omega.bean.dao.auth.VerificationToken;

public interface VerificationTokenService {

    VerificationToken saveToken(VerificationToken token);

    VerificationToken findByToken(String token);

    void deleteToken(VerificationToken token);
}
