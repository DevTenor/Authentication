package spring.authorization.segment.controller.oauth2;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.authorization.segment.controller.oauth2.github.GithubReception;
import spring.authorization.segment.controller.oauth2.google.GoogleReception;
import spring.authorization.segment.entity.User;
import spring.authorization.segment.repository.UserRepository;
import spring.authorization.segment.service.jwt.JWTService;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@RestController
public class Oauth2 {

    private final UserRepository userRepository;
    private final JWTService jwtService;
    private final GoogleReception googleReception;
    private final GithubReception githubReception;

    public Oauth2(UserRepository userRepository, JWTService jwtService, GoogleReception googleReception, GithubReception githubReception) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.googleReception = googleReception;
        this.githubReception = githubReception;
    }

    @Transactional
    @GetMapping("/api/oauth2/success")
    public void oauthSuccess(HttpServletResponse response, @AuthenticationPrincipal OAuth2User principal) throws IOException {
        OAuth2AuthenticationToken authentication =
                (OAuth2AuthenticationToken) SecurityContextHolder.getContext().getAuthentication();

        String registrationId = authentication.getAuthorizedClientRegistrationId();

        Map<String, Object> map = switch (registrationId) {
            case "google" -> googleReception.getCurrentGoogleUser(principal);
            case "github" -> githubReception.getCurrentGitHubUser(principal);
            default -> throw new IllegalArgumentException("Unknown registrationId: " + registrationId);
        };

        User user = userRepository.getUserById((UUID) map.get("id"));

        if (user == null) {
            user = new User();
            user.setId((UUID) map.get("id"));
            user.setEmail((String) map.get("email"));
            user.setUsername((String) map.getOrDefault("name", ""));
            user.setFirstName((String) map.getOrDefault("first_name", ""));
            user.setLastName((String) map.getOrDefault("last_name", ""));

            userRepository.insertIfAbsent(user);
        }

        String jwtToken = jwtService.generateToken((UUID) map.get("id"));
        response.sendRedirect("http://localhost:5173/?token=" + jwtToken);
    }
}
