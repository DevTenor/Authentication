package spring.authorization.segment.controller.user;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import spring.authorization.segment.dto.income.JwtDto;
import spring.authorization.segment.dto.outcome.UpdateProfileRequest;
import spring.authorization.segment.dto.outcome.UserProfileDto;
import spring.authorization.segment.entity.User;
import spring.authorization.segment.repository.UserRepository;
import spring.authorization.segment.service.UserService;
import spring.authorization.segment.service.jwt.JWTService;

import java.util.List;
import java.util.Map;

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
        Long userId = jwtService.getIdFromToken(jwtDto.getJwtToken());

        if (userId != null && userRepository.existsById(userId)) {
            User user = userRepository.getUserById(userId);
            UserProfileDto userProfileDto = new UserProfileDto(user.getEmail(), user.getFirstName(), user.getLastName(), user.getMobilePhone());
            return ResponseEntity.ok().body(userProfileDto);
        }

        return ResponseEntity.badRequest().body((Map.of("status", "error", "message", "user not found")));
    }

    @PostMapping("/api/update_profile")
    public ResponseEntity updateProfile(@RequestBody UpdateProfileRequest updateProfileRequest) {
        boolean result = userService.updateProfile(updateProfileRequest);

        if (result) {
            return ResponseEntity.ok((Map.of("status", "success", "message", "profile data updated")));
        } else {
            return ResponseEntity.badRequest().body(Map.of("status", "failed", "message", "failed to update profile data"));
        }
    }

    @Transactional
    @DeleteMapping("/api/account_remove")
    public ResponseEntity removeAccount(@RequestBody JwtDto jwtDto) {
        Long userId = jwtService.getIdFromToken(jwtDto.getJwtToken());

        if (userId != null && userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return ResponseEntity.ok((Map.of("status", "success", "message", "account removed")));
        }

        return ResponseEntity.badRequest().body(Map.of("status", "failed", "message", "account removing operation failed"));
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
