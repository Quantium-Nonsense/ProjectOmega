package com.quantiumnonsense.omega.helper;

import java.util.Properties;

public class GenericResponse {
    private String message;
    private String error;
    private Properties properties;


    public GenericResponse(final String message) {
        super();
        this.message = message;
    }

    public GenericResponse(final Properties properties) {
        this.properties = properties;
    }

    public GenericResponse(final String message, final String error) {
        super();
        this.message = message;
        this.error = error;
    }

    public Properties getProperties() {
        return properties;
    }

    public void setProperties(Properties properties) {
        this.properties = properties;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(final String message) {
        this.message = message;
    }

    public String getError() {
        return error;
    }

    public void setError(final String error) {
        this.error = error;
    }

}
