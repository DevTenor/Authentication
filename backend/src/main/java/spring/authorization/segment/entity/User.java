package spring.authorization.segment.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.UUID)
    @Column(columnDefinition = "UUID")
    private UUID id;
    @Version
    private Long version = 0L;
    @Column(name = "email", unique = true)
    private String email;
    @Column(name = "encoded_password")
    private String encodedPassword;
    @Column(name = "username")
    private String username;
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
