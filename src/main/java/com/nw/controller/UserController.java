package com.nw.controller;

import com.nw.dto.recruiter.OfferDto;
import com.nw.entity.user.UserEntity;
import com.nw.payload.ApiResponse;
import com.nw.payload.ChangePasswordRequest;
import com.nw.repository.user.UserRepository;
import com.nw.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserController {


    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/offers")
    public ResponseEntity<?> getAllOffers() {
        try {
            List<OfferDto> offers = userService.getAllOffers();
            return new ResponseEntity<>(offers, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }


    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return new ResponseEntity<>("User with ID " + id + " has been deleted", HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable(value = "id") Long userId) {
        UserEntity user = userRepository.findById(userId).orElse(null);
        return ResponseEntity.ok().body(user);
    }

    @PutMapping("/users/{id}")
    public UserEntity updateUser(@Valid @RequestBody UserEntity updatedUser, @PathVariable Long id) {
        return userRepository.findById(id).map(existingUser -> {
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setLogo(updatedUser.getLogo());
            return userRepository.save(existingUser);
        }).orElseGet(() -> userRepository.save(updatedUser));
    }


    @PutMapping("/covers/{id}")
    public UserEntity updateCover(@PathVariable Long id, @Valid @RequestBody String cover) {
        UserEntity user = userRepository.findById(id).get();
        user.setCover(cover);
        userRepository.save(user);
        return user;
    }

    @PutMapping("/change-password/{id}")
    public ResponseEntity<String> changePassword(@PathVariable Long id, @RequestBody ChangePasswordRequest request) {
        Optional<UserEntity> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        UserEntity user = optionalUser.get();
        if (!request.getNewPassword().equals(request.getConfirmedPassword())) {
            return ResponseEntity.badRequest().body("New password and confirmed password do not match");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("Password changed successfully");
    }

    @PutMapping("/code/{id}")
    public UserEntity generateCode(@PathVariable Long id) {
        UserEntity user = userRepository.findById(id).get();
        user.setCode(generateCode());
        userRepository.save(user);
        return user;
    }

    public static String generateCode() {
        UUID uuid = UUID.randomUUID();
        String code = uuid.toString().replace("-", "").substring(0, 6);
        return code;
    }

}
