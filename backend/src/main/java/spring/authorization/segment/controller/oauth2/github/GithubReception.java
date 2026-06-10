package spring.authorization.segment.controller.oauth2.github;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.authorization.segment.controller.oauth2.Oauth2;

import java.nio.charset.StandardCharsets;
import java.util.*;

@RestController
public class GithubReception {

    @GetMapping("/api/github/profile")
    public Map<String, Object> getCurrentGitHubUser(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return Collections.singletonMap("authenticated", false);
        } /* Guard Clauses */

        System.out.println("DEBUG: Available attributes: " + principal.getAttributes());

        Map<String, Object> map = new HashMap<>();

        String idString = principal.getAttribute("id").toString();
        if (idString == null || idString.isBlank()) {
            return Collections.singletonMap("authenticated", false);
        }

        UUID userId = Optional.of(idString)
                .map(id -> UUID.nameUUIDFromBytes(id.getBytes(StandardCharsets.UTF_8)))
                .orElseThrow(() -> new IllegalArgumentException("OAuth2 principal ID is missing!"));

        map.put("authenticated", true);
        map.put("id", userId);
        map.put("email", principal.getAttribute("email"));
        map.put("name", principal.getAttribute("name"));
        map.put("picture", principal.getAttribute("avatar_url"));

        return map;
    }
}
