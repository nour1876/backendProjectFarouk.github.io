package com.nw.payload;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordRequest {
    private String newPassword;
    private String confirmedPassword;
}
