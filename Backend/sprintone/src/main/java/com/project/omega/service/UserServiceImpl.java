package com.project.omega.service;

import com.project.omega.exceptions.DuplicateUserException;
import com.project.omega.bean.User;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.helper.Constant;
import com.project.omega.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    public User createUser(User user) throws DuplicateUserException {
        String email = user.getEmail();
        if(userRepository.findByEmail(email) == 0) {
            userRepository.save(user);
        } else {
            throw new DuplicateUserException(Constant.ERROR_USER_EXISTS + email);
        }
        return user;
    }

    public List<User> getAllUsers() throws NoRecordsFoundException {
        List<User> users = (List) userRepository.findAll();
        if(users.isEmpty()) {
            throw new NoRecordsFoundException(Constant.ERROR_NO_RECORDS);
        }
        return users;
    }


}
