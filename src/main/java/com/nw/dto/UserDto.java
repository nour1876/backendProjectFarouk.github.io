package com.nw.dto;

import com.nw.entity.user.RoleEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class UserDto {

    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private String confirmedPassword;
    private String logo;
    private String cover;
    private RoleEntity role;
    private String code;

}
