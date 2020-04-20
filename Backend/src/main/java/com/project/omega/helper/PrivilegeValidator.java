package com.project.omega.helper;

public class PrivilegeValidator {

    public static boolean privilegeValidator(String privilegeName) {
        boolean isValid = false;
        if(!privilegeName.isEmpty()){
            String noWhiteSpace = privilegeName.replaceAll("\\s", "");
            if (noWhiteSpace.contains("_")) {
                isValid = true;
            }
            if (noWhiteSpace.split("_")[0].equalsIgnoreCase("PERMISSION")) {
                isValid = true;
            }
        }
    return isValid;
    }
}
