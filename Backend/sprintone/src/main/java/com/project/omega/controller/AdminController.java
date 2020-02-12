package com.project.omega.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
/*
@RestController
@RequestMapping(value = {"/", "/user"})*/
public class AdminController {

/*    @Autowired
    UserService userService;

    Logger logger = LoggerFactory.getLogger(AdminController.class);

    @PostMapping(value = "/create", headers = "Accept=application/json")
    public ResponseEntity createUser(@RequestBody String userInformation) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            User user = mapper.readValue(userInformation, User.class);
            logger.info("Creating User " + user.getName());
            boolean created = userService.createUser(user);
            if (created) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already exists.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to parse body");
        }
    }*/
}
