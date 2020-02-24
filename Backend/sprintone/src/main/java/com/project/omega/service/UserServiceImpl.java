package com.project.omega.service;

import com.project.omega.bean.User;
import com.project.omega.exceptions.DuplicateUserException;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.exceptions.UserNotFoundException;
import com.project.omega.helper.Constant;
import com.project.omega.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    public User createUser(User user) throws DuplicateUserException {
        String email = user.getEmail();
        if(userRepository.existsByEmail(email)) {
            throw new DuplicateUserException(Constant.ERROR_USER_EXISTS + email);
        }
        userRepository.save(user);
        return user;
    }


    public List<User> getAllUsers() throws NoRecordsFoundException {
        List<User> users = (List) userRepository.findAll();
        if(users.isEmpty()) {
             throw new NoRecordsFoundException(Constant.ERROR_NO_RECORDS);
        }
        return users;
    }

    public User getUserById(Long id) throws UserNotFoundException {
        Optional<User> user = userRepository.findById(id);
        if(!user.isPresent()) {
            throw new UserNotFoundException(Constant.ERROR_USER_NOT_FOUND + id);
        }
        return user.get();
    }

    public User deleteUserById(Long id) throws UserNotFoundException {
        Optional<User> user = userRepository.findById(id);
        if(!user.isPresent()) {
            throw new UserNotFoundException(Constant.ERROR_USER_NOT_FOUND + id);
        }
        userRepository.deleteById(id);
        return user.get();
    }

    public User updateUserById(Long id, User userDetails) throws Exception {
        if(!userRepository.existsById(id)) {
            throw new UserNotFoundException(Constant.ERROR_USER_NOT_FOUND + id);
        }
        if(userDetails.getEmail() != null && userDetails.getRole() != null && userDetails.getPassword() != null) {
            userDetails.setId(id);
            userRepository.save(userDetails);
        } else {
            throw new RuntimeException("Null values detected.");
        }
        return userDetails;
    }
}
