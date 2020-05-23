package com.project.omega.helper;

public class EmailConstants {
    // Subjects
    public static final String REG_CONFIRM = "Sign-up confirmation";
    public static final String PASS_RESET = "Reset forgotten password";

    // URLs
    public static final String BACKEND_REMOTE = "40.65.236.154";
    public static final String FRONTEND_REMOTE = "40.65.236.154";

    public static final String BACKEND_LOCAL = "localhost:8080";
    public static final String FRONTEND_LOCAL = "localhost:4200";

    // Texts
    public static final String WELCOME = "Welcome to Project Omega!!!</br>";
    public static final String PASSWORD = "Your password: ";
    public static final String PASS_CHANGE_NOTE = "If you wish to change your password, login to your account and request the change in your account settings.</br>" ;
    public static final String REP_NOTE = "If you are a representative, use the link below to confirm registration and then use our mobile app to login. If you are an admin, the link will redirect you to login.</br>" ;

    // Link texts
    public static final String CONFIRMATION = "Confirm registration for ";

    public static String linkBuilder(String ip, String endpoint, String text) {
        return "<a href=\"http://" + ip + endpoint + "\">" + text + " </a>" + "</br>";
    }
}
