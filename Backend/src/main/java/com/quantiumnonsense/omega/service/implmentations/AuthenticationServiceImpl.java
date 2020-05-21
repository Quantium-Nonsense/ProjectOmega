package com.quantiumnonsense.omega.service.implmentations;

import com.quantiumnonsense.omega.authentication.JwtTokenUtil;
import com.quantiumnonsense.omega.bean.dao.auth.JwtRequest;
import com.quantiumnonsense.omega.bean.dao.entity.User;
import com.quantiumnonsense.omega.service.JwtUserDetailsService;
import com.quantiumnonsense.omega.service.interfaces.AuthenticationService;
import com.quantiumnonsense.omega.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    JwtUserDetailsService userDetailsService;

    @Autowired
    UserService userService;

    @Autowired
    JwtTokenUtil jwtTokenUtil;
    
    @Override
    public String createJWTToken(JwtRequest authenticationRequest) {
        User userDetails = userService.findUserByEmail(authenticationRequest.getEmail());
        return jwtTokenUtil.generateToken(userDetails);
    }
}
