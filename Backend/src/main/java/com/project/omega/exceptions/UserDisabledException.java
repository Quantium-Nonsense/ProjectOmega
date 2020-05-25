package com.project.omega.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UserDisabledException extends Exception {
    private static final long serialVersionUID = 1L;

    public UserDisabledException(String message) {
        super(message);
    }
}
