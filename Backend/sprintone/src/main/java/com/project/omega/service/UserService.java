package com.project.omega.service;

import com.project.omega.exceptions.DuplicateUserException;
import com.project.omega.bean.User;

public interface UserService {
    User createUser(User user) throws DuplicateUserException;
}
