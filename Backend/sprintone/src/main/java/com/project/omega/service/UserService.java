package com.project.omega.service;

import com.project.omega.exceptions.DuplicateUserException;
import com.project.omega.bean.User;
import com.project.omega.exceptions.NoRecordsFoundException;

import java.util.List;

public interface UserService {
    User createUser(User user) throws DuplicateUserException;

    List<User> getAllUsers() throws NoRecordsFoundException;
}
