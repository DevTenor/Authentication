package spring.authorization.segment.service.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import spring.authorization.segment.repository.UserRepository;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

@Component
public class JWTService {

    private final UserRepository userRepository;

    public JWTService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private final String SECRET_STRING = "342bd5191271245897143a316e277feeda5f3c276608e0039a2cd79e29ffe037";
    private final SecretKey key = Keys.hmacShaKeyFor(SECRET_STRING.getBytes(StandardCharsets.UTF_8));

    public String generateToken(Long userId) {
    long nowMillis = System.currentTimeMillis();

        return Jwts.builder()
                .setSubject(userId.toString())
                .setId(UUID.randomUUID().toString())
                .setIssuedAt(new Date(nowMillis))
                .setExpiration(new Date(nowMillis + 3600000))
                .signWith(key)
                .compact();
    }

    public boolean validateToken(String token) {
        if (token.isEmpty()) {
            return false;
        }

        try {
            Claims claims =  Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            Long userId = Long.parseLong(claims.getSubject());

            return userRepository.existsById(userId);

        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public Long getIdFromToken(String token) {
        if (token.isEmpty()) {
            return null;
        }

        try {
            Claims claims =  Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return Long.parseLong(claims.getSubject());

        } catch (JwtException | IllegalArgumentException e) {
            return null;
        }
    }
}
