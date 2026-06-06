package spring.authorization.segment.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import spring.authorization.segment.dto.outcome.UpdateProfileRequest;
import spring.authorization.segment.entity.User;
import spring.authorization.segment.repository.UserRepository;
import spring.authorization.segment.service.jwt.JWTService;

import java.util.List;

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

    public boolean register(String email, String password) {
        User user = new User();
        if (userRepository.existsByEmail(email)) {
            return false;
        }

        user.setEmail(email);

        String hashed = passwordEncoder.encode(password);
        user.setEncodedPassword(hashed);

        userRepository.save(user);

        return true;
    }

    public boolean matches(String rawPassword, String storedPassword) {
        return passwordEncoder.matches(rawPassword, storedPassword);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public boolean updateProfile(UpdateProfileRequest updateProfileRequest) {
        Long userId = jwtService.getIdFromToken(updateProfileRequest.getJwtToken());
        if (userId == null) return false;
        if (userRepository.existsById(userId)) {
            User user = userRepository.getUserById(userId);
            user.setEmail(updateProfileRequest.getEmail());
            user.setFirstName(updateProfileRequest.getFirstName());
            user.setLastName(updateProfileRequest.getLastName());
            user.setMobilePhone(updateProfileRequest.getMobilePhone());
            userRepository.save(user);
            return true;
        } else {
            return false;
        }
    }
}
