package spring.authorization.segment.dto.outcome;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UpdateProfileRequest {
    private String jwtToken;
    private String firstName;
    private String lastName;
    private String email;
    private String mobilePhone;
}
