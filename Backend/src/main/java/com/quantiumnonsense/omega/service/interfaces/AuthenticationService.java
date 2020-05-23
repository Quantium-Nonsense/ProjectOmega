package com.quantiumnonsense.omega.service.interfaces;

import com.quantiumnonsense.omega.bean.dao.auth.JwtRequest;

public interface AuthenticationService {

    /*
     * This method will create a JWT Token
     * */
    String createJWTToken(JwtRequest jwtRequest);

}
