package com.project.omega.service.implmentations;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.omega.bean.dao.auth.JwtRequest;
import com.project.omega.bean.dao.auth.Token;
import com.project.omega.bean.dao.entity.PasswordResetToken;
import com.project.omega.bean.dao.entity.User;
import com.project.omega.bean.dto.UserDTO;
import com.project.omega.exceptions.NoRecordsFoundException;
import com.project.omega.exceptions.UserNotFoundException;
import com.project.omega.helper.TokenConstants;
import com.project.omega.repository.UserRepository;
import com.project.omega.service.interfaces.AuthenticationService;
import com.project.omega.service.interfaces.PasswordResetTokenService;
import com.project.omega.service.interfaces.TokenService;
import com.project.omega.service.interfaces.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private UserRepository userRepository;

    @Autowired
    TokenService tokenService;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private PasswordResetTokenService passwordResetTokenService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MessageSource messages;


    public List<User> getAllUsers() throws NoRecordsFoundException {
        List<User> users = (List) userRepository.findAll();
        if (users.isEmpty()) {
            throw new NoRecordsFoundException(messages.getMessage("message.noRecords", null, null));
        }
        return users;
    }

    public User getUserById(Long id) throws UserNotFoundException {
        Optional<User> user = userRepository.findById(id);
        if (!user.isPresent()) {
            throw new UserNotFoundException(messages.getMessage("message.userNotFound", null, null));
        }
        return user.get();
    }

    public User deleteUserById(Long id) throws UserNotFoundException {
        Optional<User> user = userRepository.findById(id);
        if (!user.isPresent()) {
            throw new UserNotFoundException(messages.getMessage("message.userNotFound", null, null));
        }
        userRepository.deleteById(id);
        return user.get();
    }

    public User updateUserById(Long id, User userDetails) throws Exception {
        Optional<User> user = userRepository.findById(id);
        if (!user.isPresent()) {
            throw new UserNotFoundException(messages.getMessage("message.userNotFound", null, null));
        }
        User u = new User.UserBuilder()
                .setId(id)
                .setEmail(userDetails.getEmail())
                .setPassword(userDetails.getPassword())
                .build();

        userRepository.save(u);
        return userDetails;
    }

    @Override
    public void createVerificationTokenForUser(String jwt, UserDTO user) {
        LOGGER.debug("Saving Verification Token for User: {}", user);
        User users = new User.UserBuilder()
                .setEmail(user.getEmail())
                .setPassword(user.getPassword())
                .build();
        Token jwtToken = new Token(jwt, users);
        tokenService.saveToken(jwtToken);
    }

    @Override
    public String validateVerificationToken(String token) {
        LOGGER.debug("Validate Token allocated to User: {}", token);
        final Token verificationToken = tokenService.findByToken(token);
        if (verificationToken == null) {
            return TokenConstants.TOKEN_INVALID;
        }
        final User user = verificationToken.getUser();
        final Calendar cal = Calendar.getInstance();
        if ((verificationToken.getExpiryDate()
                .getTime()
                - cal.getTime()
                .getTime()) <= 0) {
            tokenService.deleteToken(verificationToken);
            return TokenConstants.TOKEN_EXPIRED;
        }
        userRepository.save(user);
        return TokenConstants.TOKEN_VALID;
    }

    @Override
    public User getUser(String verificationToken) {
        LOGGER.debug("Get User Via Verification Token : {}", verificationToken);
        final Token token = tokenService.findByToken(verificationToken);
        if (token != null) {
            return token.getUser();
        }
        return null;
    }

    @Override
    public Token generateNewVerificationToken(String token) {
        LOGGER.debug("Generate New Verification Token : {}", token);
        Token verificationToken = tokenService.findByToken(token);
        JwtRequest jwtRequest = new JwtRequest.JwtRequestBuilder()
                .setEmail(verificationToken.getUser().getEmail())
                .setPassword(verificationToken.getUser().getPassword())
                .build();
        String newVerification = authenticationService.createJWTToken(jwtRequest);
        verificationToken.updateToken(newVerification);
        return tokenService.saveToken(verificationToken);
    }

    @Override
    public User findUserByEmail(String email) {
        LOGGER.debug("Get User By Email : {}", email);
        return userRepository.findByEmail(email);
    }

    @Override
    public void createPasswordResetTokenForUser(User user, String token) {
        LOGGER.debug("Create Password Reset Token for User " + user + " and Token : {}", token);
        final PasswordResetToken myToken = new PasswordResetToken(token, user);
        passwordResetTokenService.savePasswordResetToken(myToken);
    }

    @Override
    public boolean checkIfOldPasswordIsValid(User user, String previousPassword) {
        return passwordEncoder.matches(previousPassword, user.getPassword());
    }

    @Override
    public void changeUserPassword(User user, String password) {
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }

    @Override
    public String validatePasswordResetToken(long id, String token) {
        final PasswordResetToken passToken = passwordResetTokenService.findByToken(token);
        if ((passToken == null) || (passToken.getUser().getId() != id)) {
            return "invalidToken";
        }
        final Calendar cal = Calendar.getInstance();
        if ((passToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
            return "expired";
        }
        final User user = passToken.getUser();
        final Authentication auth = new UsernamePasswordAuthenticationToken(user, null, Arrays.asList(new SimpleGrantedAuthority("CHANGE_PASSWORD_PRIVILEGE")));
        SecurityContextHolder.getContext().setAuthentication(auth);
        return null;
    }
}
