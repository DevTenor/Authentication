package spring.authorization.segment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import spring.authorization.segment.entity.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    User getUserByEmail(String email);
    User getUserById(Long id);
}
