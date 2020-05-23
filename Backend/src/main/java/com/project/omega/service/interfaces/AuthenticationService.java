package com.project.omega.service.interfaces;

import com.project.omega.bean.dao.auth.JwtRequest;

public interface AuthenticationService {

    /*
     * This method will create a JWT Token
     * */
    String createJWTToken(JwtRequest jwtRequest);

}
