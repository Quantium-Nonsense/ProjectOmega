package com.project.omega.service.interfaces;

import com.project.omega.bean.dao.auth.JwtRequest;
import com.project.omega.exceptions.UserDisabledException;
import com.project.omega.exceptions.UserNotFoundException;

public interface AuthenticationService {

    /*
     * This method will create a JWT Token
     * */
    String createJWTToken(JwtRequest jwtRequest) throws UserDisabledException, UserNotFoundException;

}
