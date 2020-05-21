package com.quantiumnonsense.omega.service.interfaces;

import com.quantiumnonsense.omega.bean.dao.entity.User;
import com.quantiumnonsense.omega.exceptions.NoRecordsFoundException;
import com.quantiumnonsense.omega.exceptions.UserNotFoundException;

import java.util.List;

public interface UserService {

    List<User> getAllUsers() throws NoRecordsFoundException;

    User getUserById(Long id) throws UserNotFoundException;

    User deleteUserById(Long id) throws UserNotFoundException;

    User updateUserById(Long id, User update) throws UserNotFoundException, Exception;

    User findUserByEmail(String email);

    void createPasswordResetTokenForUser(User user, String token);

    boolean checkIfOldPasswordIsValid(User user, String password);

    void changeUserPassword(User user, String password);

    String validatePasswordResetToken(long id, String token);
}