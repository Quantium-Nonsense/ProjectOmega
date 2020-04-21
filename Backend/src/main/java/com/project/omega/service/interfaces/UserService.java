package com.project.omega.service.interfaces;

import com.project.omega.bean.dao.auth.Token;
import com.project.omega.bean.dao.entity.User;
import com.project.omega.bean.dto.UserDTO;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.exceptions.UserNotFoundException;

import java.util.List;

public interface UserService {

    List<User> getAllUsers() throws NoRecordsFoundException;

    User getUserById(Long id) throws UserNotFoundException;

    User deleteUserById(Long id) throws UserNotFoundException;

    User updateUserById(Long id, User update) throws UserNotFoundException, Exception;

    void createVerificationTokenForUser(String token, User user);

    String validateVerificationToken(String token);

    User getUser(String verificationToken);

    Token generateNewVerificationToken(String token);

    User findUserByEmail(String email);

    void createPasswordResetTokenForUser(User user, String token);

    boolean checkIfOldPasswordIsValid(User user, String password);

    void changeUserPassword(User user, String password);

    String validatePasswordResetToken(long id, String token);

}