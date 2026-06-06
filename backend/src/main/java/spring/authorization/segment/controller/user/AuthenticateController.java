package spring.authorization.segment.controller.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import spring.authorization.segment.dto.income.JwtDto;
import spring.authorization.segment.dto.income.UserDto;
import spring.authorization.segment.repository.UserRepository;
import spring.authorization.segment.service.UserService;
import spring.authorization.segment.service.jwt.JWTService;

import java.util.Map;

@RestController
public class AuthenticateController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JWTService jwtService;

    public AuthenticateController(UserService userService, JWTService jwtService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @PostMapping("/api/register")
    public ResponseEntity sendCredentials(
            @RequestBody UserDto userDto) {
        String input = userDto.getEmail();
        String password = userDto.getPassword();

        if (!(userService.register(input, password))) {
            return ResponseEntity.badRequest().body(Map.of("status", "failed", "message", "User already exists in database"));
        }

        String JwtToken = jwtService.generateToken(userRepository.getUserByEmail(input).getId());

        return ResponseEntity.ok(Map.of("token", JwtToken));
    }

    @PostMapping("/api/auth")
    public ResponseEntity auth(@RequestBody UserDto userDto) {
        String input = userDto.getEmail();
        String password = userDto.getPassword();

        if (!(userRepository.existsByEmail(input))) {
            return ResponseEntity.badRequest().body(Map.of("status", "failed", "message", "user not registered"));
        }

        String savedEncodedPassword = userRepository.getUserByEmail(input).getEncodedPassword();
        if (!(userService.matches(password, savedEncodedPassword))) {
            return ResponseEntity.badRequest().body(Map.of("status", "failed", "message", "access denied"));
        }

        return ResponseEntity.ok(Map.of("token", jwtService.generateToken(userRepository.getUserByEmail(input).getId())));
    }

    @PostMapping("/api/validate_token")
    public ResponseEntity validateJwt(@RequestBody JwtDto jwtDto) {

        if (jwtService.validateToken(jwtDto.getJwtToken())) {
            return ResponseEntity.ok(Map.of("status", "success", "message", "access granted"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("status", "failed", "message", "access denied"));
        }
    }
}
