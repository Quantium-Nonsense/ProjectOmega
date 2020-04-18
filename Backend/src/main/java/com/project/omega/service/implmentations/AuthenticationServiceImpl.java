package com.project.omega.service.implmentations;

import com.project.omega.authentication.JwtTokenUtil;
import com.project.omega.bean.dao.auth.JwtRequest;
import com.project.omega.service.JwtUserDetailsService;
import com.project.omega.service.interfaces.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    JwtUserDetailsService userDetailsService;

    @Autowired
    JwtTokenUtil jwtTokenUtil;
    
    @Override
    public String createJWTToken(JwtRequest authenticationRequest) {
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getEmail());
        return jwtTokenUtil.generateToken(userDetails);
    }
}
