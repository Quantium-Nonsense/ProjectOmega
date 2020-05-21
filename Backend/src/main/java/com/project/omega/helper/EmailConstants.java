package com.project.omega.helper;

public class EmailConstants {
    // Subjects
    public static final String REG_CONFIRM = "Sign-up confirmation";
    public static final String PASS_RESET = "Reset forgotten password";

    // URLs
    public static final String BACKEND_ENDPOINT = "40.65.236.154";
    public static final String FRONTEND_ENDPOINT = "40.65.236.154";

    // Texts
    public static final String WELCOME = "Welcome to Project Omega!!!\n";
    public static final String PASSWORD = "Your password:";
    public static final String PASS_CHANGE_TEXT = "If you wish to change your password, you can do so ";

    // Link texts
    public static final String CONFIRMATION = "Confirm registration for ";
    public static final String PASS_CHANGE_LINK = "here";

    public static String linkBuilder(String ip, String endpoint, String text) {
        return "<a href=\"http://" + ip + "/api/" + endpoint + "\">" + text + " </a>" + "\n";
    }
}
