package spring.authorization.segment.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import spring.authorization.segment.dto.outcome.UpdateProfileDto;
import spring.authorization.segment.entity.User;
import spring.authorization.segment.repository.UserRepository;
import spring.authorization.segment.service.jwt.JWTService;

import java.util.List;
import java.util.UUID;

@Component
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JWTService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public int register(String email, String password) {
        if (email == null || email.isBlank()) return -3; /* Guard Clauses */
        if (password == null || password.isBlank()) return -2; /* Guard Clauses */
        if (userRepository.existsByEmail(email)) return -1;  /* Guard Clauses */

        User user = new User();
        user.setEmail(email);

        String hashed = passwordEncoder.encode(password);
        user.setEncodedPassword(hashed);

        userRepository.save(user);

        return 0;
    }

    public boolean matches(String rawPassword, String storedPassword) {
        return passwordEncoder.matches(rawPassword, storedPassword);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public int updateProfile(UpdateProfileDto updateProfileDto) {
        UUID userId = jwtService.getIdFromToken(updateProfileDto.getJwtToken());
        if (userId == null) return -2; /* Guard Clauses */

        User user = userRepository.getUserById(userId);
        if (user == null) return -1; /* Guard Clauses */

        user.setEmail(updateProfileDto.getEmail());
        user.setUsername(updateProfileDto.getUsername());
        user.setFirstName(updateProfileDto.getFirstName());
        user.setLastName(updateProfileDto.getLastName());
        user.setMobilePhone(updateProfileDto.getMobilePhone());
        userRepository.save(user);
        return 0;
    }
}
