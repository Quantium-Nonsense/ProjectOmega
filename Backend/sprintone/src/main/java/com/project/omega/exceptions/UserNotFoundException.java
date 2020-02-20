package com.project.omega.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class UserNotFoundException extends Exception {
    private static final long serialVersionUID = 3L;

    public UserNotFoundException(String message) {
        super(message);
    }
}
