package com.project.omega.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class DuplicateUserException extends Exception {
    private static final long serialVersionUID = 1L;

    public DuplicateUserException(String message) {
        super(message);
    }
}
