package spring.authorization.segment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import spring.authorization.segment.entity.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    boolean existsByEmail(String email);
    User getUserByEmail(String email);
    void deleteById(UUID id);
    User getUserById(UUID id);

    @Modifying
    @Query(value = """
        INSERT INTO users (id, email, username, first_name, last_name)
        VALUES (:#{#u.id}, :#{#u.email}, :#{#u.username}, :#{#u.firstName}, :#{#u.lastName})
        ON CONFLICT (id) DO NOTHING
        """, nativeQuery = true)
    void insertIfAbsent(@Param("u") User u);
}
