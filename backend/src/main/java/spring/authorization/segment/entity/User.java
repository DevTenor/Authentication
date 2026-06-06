package spring.authorization.segment.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Table(name="users")
@NamedQuery(
        name="users.getUserIdByEmail",
        query="SELECT u.id FROM User u WHERE u.email = :email"
)
@Getter
@Setter
@Entity
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @Column(name = "email", unique = true)
    private String email;
    @Column(name = "encoded_password")
    private String encodedPassword;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "mobile_phone")
    private String mobilePhone;
    @CreationTimestamp
    @Column(name = "created_at",
    updatable = false)
    private Date createdAt;
}
