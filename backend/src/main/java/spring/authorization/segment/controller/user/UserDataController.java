package spring.authorization.segment.controller.user;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import spring.authorization.segment.dto.income.JwtDto;
import spring.authorization.segment.dto.outcome.UpdateProfileDto;
import spring.authorization.segment.dto.outcome.UserProfileDto;
import spring.authorization.segment.entity.User;
import spring.authorization.segment.repository.UserRepository;
import spring.authorization.segment.service.UserService;
import spring.authorization.segment.service.jwt.JWTService;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
public class UserDataController {

    private final UserService userService;
    private final JWTService jwtService;
    private final UserRepository userRepository;

    public UserDataController(UserService userService, JWTService jwtService, UserRepository userRepository) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @PostMapping("/api/get_profile")
    public ResponseEntity getUserProfile(@RequestBody JwtDto jwtDto) {
        UUID userId = jwtService.getIdFromToken(jwtDto.getJwtToken());

        if (userId == null) {
            return ResponseEntity.badRequest().body((Map.of("status", "error", "message", "Unable to get profile data. Invalid JWT token")));
        } /* Guard Clauses */

        if (!userRepository.existsById(userId)) {
            return ResponseEntity.badRequest().body((Map.of("status", "error", "message", "Unable to get profile data. User not exists")));
        } /* Guard Clauses */

        User user = userRepository.getUserById(userId);
        UserProfileDto userProfileDto = new UserProfileDto(user.getEmail(), user.getUsername(), user.getFirstName(), user.getLastName(), user.getMobilePhone());
        return ResponseEntity.ok().body(userProfileDto);

    }

    @PostMapping("/api/update_profile")
    public ResponseEntity updateProfile(@RequestBody UpdateProfileDto updateProfileDto) {
        int result = userService.updateProfile(updateProfileDto);

        switch (result) {
            case 0: break;
            case -1: return ResponseEntity.ok((Map.of("status", "failed", "problem", "user", "message", "Profile update failed. User not exists")));
            case -2: return ResponseEntity.ok((Map.of("status", "failed", "problem", "jwt", "message", "Profile update failed. Invalid jwt token.")));
        }

        return ResponseEntity.ok((Map.of("status", "success", "message", "Profile data updated")));
    }

    @Transactional
    @DeleteMapping("/api/account_remove")
    public ResponseEntity removeAccount(@RequestBody JwtDto jwtDto) {
        UUID userId = jwtService.getIdFromToken(jwtDto.getJwtToken());
        if (userId == null) {
            return ResponseEntity.badRequest().body(Map.of("status", "failed", "problem", "jwt", "message", "Account removing operation failed. Incorrect jwt token"));
        }

        if (!userRepository.existsById(userId)) {
            return ResponseEntity.badRequest().body(Map.of("status", "failed", "problem", "user", "message", "Account removing operation failed. User not exists"));
        }

        userRepository.deleteById(userId);
        return ResponseEntity.ok((Map.of("status", "success", "message", "Account removed")));
    }

    @GetMapping("/api/users")
    public ResponseEntity getUsers() {
        List<User> users = userService.getUsers();

        if (users.isEmpty()) {
            return ResponseEntity.ok(List.of());
        }
        return ResponseEntity.ok(users);
    }
}
