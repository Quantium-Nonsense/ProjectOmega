package com.project.omega.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class SupplierNotFoundException extends Exception {
    private static final long serialVersionUID = 1L;

    public SupplierNotFoundException(String message) {
        super(message);
    }
}
