package spring.authorization.segment.controller.oauth2.google;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.authorization.segment.controller.oauth2.Oauth2;

import java.nio.charset.StandardCharsets;
import java.util.*;

@RestController
public class GoogleReception {

    @GetMapping("/api/google/profile")
    public Map<String, Object> getCurrentGoogleUser(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return Collections.singletonMap("authenticated", false);
        }

        System.out.println("DEBUG: Available attributes: " + principal.getAttributes());


        Map<String, Object> map = new HashMap<>();

        String idString = principal.getAttribute("sub").toString();
        if (idString == null) {
            return Collections.singletonMap("authenticated", false);
        }

        UUID userId = Optional.of(idString)
                .map(id -> UUID.nameUUIDFromBytes(id.getBytes(StandardCharsets.UTF_8)))
                .orElseThrow(() -> new IllegalArgumentException("OAuth2 principal ID is missing!"));

        map.put("authenticated", true);
        map.put("id", userId);
        map.put("email", principal.getAttribute("email"));
        map.put("name", principal.getAttribute("name"));

        map.put("first_name", principal.getAttribute("given_name"));
        map.put("last_name", principal.getAttribute("family_name"));

        return map;
    }
}
