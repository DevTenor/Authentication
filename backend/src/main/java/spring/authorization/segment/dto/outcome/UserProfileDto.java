package spring.authorization.segment.dto.outcome;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class UserProfileDto {
    String email;
    String username;
    String firstName;
    String lastName;
    String mobilePhone;

    public UserProfileDto(String email, String username, String firstName, String lastName, String mobilePhone) {
        this.email = email;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mobilePhone = mobilePhone;
    }
}
