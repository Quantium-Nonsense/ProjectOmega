package com.quantiumnonsense.omega.exceptions;

public class RoleNotAssignedException extends Exception {
    private static final long serialVersionUID = 1L;

    public RoleNotAssignedException(String message) {
        super(message);
    }
}