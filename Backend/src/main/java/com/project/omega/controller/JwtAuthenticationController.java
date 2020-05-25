package com.project.omega.controller;

import com.project.omega.bean.dao.auth.*;
import com.project.omega.bean.dao.entity.User;
import com.project.omega.bean.dto.PasswordDTO;
import com.project.omega.bean.dto.UserDTO;
import com.project.omega.bean.dto.UserResponse;
import com.project.omega.exceptions.DuplicateUserException;
import com.project.omega.exceptions.InvalidOldPasswordException;
import com.project.omega.exceptions.UserDisabledException;
import com.project.omega.exceptions.UserNotFoundException;
import com.project.omega.helper.*;
import com.project.omega.service.JwtUserDetailsService;
import com.project.omega.service.interfaces.AuthenticationService;
import com.project.omega.service.interfaces.UserService;
import com.project.omega.service.interfaces.VerificationTokenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.Calendar;
import java.util.List;
import java.util.Properties;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
public class JwtAuthenticationController {
    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private UserService userService;

    @Autowired
    private VerificationTokenService tokenService;

    @Autowired
    private MessageSource messages;

    @PostMapping(value = "/api/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        LOGGER.debug("Authentication for JwtRequest: {}", authenticationRequest);
        User user = userService.findUserByEmail(authenticationRequest.getEmail());
        authenticate(authenticationRequest.getEmail(), authenticationRequest.getPassword());
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/api/authenticate"));
        return new ResponseEntity(new JwtResponse(authenticationService.createJWTToken(authenticationRequest)), headers, HttpStatus.OK);
    }

    @PostMapping(value = "/api/registration", headers = "Accept=application/json")
    public ResponseEntity createUser(@RequestBody UserDTO user) throws DuplicateUserException, Exception {
        LOGGER.debug("User Registration Process: {}", user);

        User newUser = userDetailsService.createUser(user);

        authenticate(user.getEmail(), user.getPassword());

        String verificationToken = UUID.randomUUID().toString();
        tokenService.saveToken(verificationToken, newUser);

        String emailContent = EmailConstants.WELCOME + "</br>"
                + EmailConstants.PASSWORD + user.getPassword() + "</br></br>"
                + EmailConstants.REP_NOTE + "</br>"
                + EmailConstants.linkBuilder(EmailConstants.BACKEND_REMOTE,
                "/api/confirmRegistration?token=" + verificationToken,
                EmailConstants.CONFIRMATION + user.getEmail());

        LOGGER.info("Sending Email (subject: {}, receiver: {})", EmailConstants.REG_CONFIRM, user.getEmail());
        EmailSender.send(user.getEmail(), EmailConstants.REG_CONFIRM, emailContent);

        UserResponse userMap = new UserResponse(newUser.getId(), newUser.getEmail(), newUser.getRoles());

        return new ResponseEntity(userMap, HttpStatus.CREATED);
    }

    @GetMapping(value = "/api/confirmRegistration")
    public ResponseEntity registrationConfirm(@RequestParam("token") String token) throws Exception {
        VerificationToken verificationToken = tokenService.findByToken(token);
        if (verificationToken == null) {
            LOGGER.warn("Token doesn't exist.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(TokenConstants.TOKEN_INACTIVE);
        }

        User user = verificationToken.getUser();

        if (verificationToken.getExpiryDate().getTime() - Calendar.getInstance().getTime().getTime() <= 0) {
            LOGGER.warn("Token expired.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(TokenConstants.TOKEN_EXPIRED);
        }

        LOGGER.info("Verifying user: {}", user.getEmail());
        user.setEnabled(true);
        userService.updateUserById(user.getId(), user);
        tokenService.deleteToken(verificationToken);

        Role userRole = (Role) ((List) user.getRoles()).get(0);

        String adminUrl = "http://" + EmailConstants.FRONTEND_REMOTE + "/auth";
//        String repUrl = "http://" + EmailConstants.FRONTEND_LOCAL + "/auth_rep";

        HttpHeaders headers = new HttpHeaders();

        if (userRole.getName().equals(RoleBasedConstant.REP)) {
//            headers.setLocation(URI.create(adminUrl));
//            return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
            return ResponseEntity.status(HttpStatus.OK).body(TokenConstants.TOKEN_REP_REDIRECT);
        } else {
            headers.setLocation(URI.create(adminUrl));
            return new ResponseEntity(headers, HttpStatus.MOVED_PERMANENTLY);
        }
    }

    /*To be Used When the User DOES NOT remember their password*/
    @SuppressWarnings("unchecked")
    @GetMapping(value = "/api/resetPassword")
    public ResponseEntity resetUserPassword(@RequestParam("email") final String email) throws UserNotFoundException, UserDisabledException {
        final User user = userService.findUserByEmail(email);
        Properties properties = new Properties();
        if (user != null) {
            final String token = UUID.randomUUID().toString();
            userService.createPasswordResetTokenForUser(user, token);
            properties.setProperty("message", messages.getMessage("message.resetPasswordEmail", null, null));
            properties.setProperty("passwordResetToken", token);
            properties.setProperty("tokenType", "UUID");
        }
        return new ResponseEntity(new GenericResponse(properties), HttpStatus.CREATED);
    }

    /*To be User When User KNOWS his password*/
    @PostMapping(value = "/api/updatePassword", headers = "Accept=application/json")
    @SuppressWarnings("unchecked")
    public ResponseEntity changeUserPassword(@Valid PasswordDTO passwordDto) throws UserNotFoundException, UserDisabledException {
        final User user = userService.findUserByEmail(((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getEmail());
        if (!userService.checkIfOldPasswordIsValid(user, passwordDto.getOldPassword())) {
            throw new InvalidOldPasswordException();
        }
        userService.changeUserPassword(user, passwordDto.getNewPassword());
        Properties properties = new Properties();
        properties.setProperty("message", messages.getMessage("message.updatePasswordSuc", null, null));
        properties.setProperty("oldPassword", user.getPassword());
        properties.setProperty("changedPassword", passwordDto.getNewPassword());
        return new ResponseEntity(new GenericResponse(messages.getMessage("message.updatePasswordSuc", null, null)), HttpStatus.CREATED);
    }

    @GetMapping("/api/changePassword")
    public String showChangePasswordPage(@RequestParam("id") final long id, @RequestParam("token") final String token) {
        final String result = userService.validatePasswordResetToken(id, token);
        if (result != null) {
            /**/
        }
        return "";
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    public void authenticationWithoutPassword(User user) {
        List<Privilege> privileges = user.getRoles().stream().map(role -> role.getPrivileges()).flatMap(list -> list.stream()).distinct().collect(Collectors.toList());
        List<GrantedAuthority> authorities = privileges.stream().map(p -> new SimpleGrantedAuthority(p.getName())).collect(Collectors.toList());
        Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}