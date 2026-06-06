package spring.authorization.segment.service.jpa;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Transactional
@Service
public class UserJpa {
        @PersistenceContext
        private EntityManager entityManager;

        public Long getUserIdByEmail(String s) {
                return entityManager.createNamedQuery("users.getUserIdByEmail", Long.class)
                        .setParameter("email", s)
                        .getSingleResult();
        }
}
