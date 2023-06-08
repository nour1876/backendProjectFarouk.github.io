package com.nw.dto.recruiter;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;

@Data
public class EventDto {
    private Long id;
    private String title;
    private String description;
    private String status;
    private String photo;
    private Date publicationDate;
    private String typeEvent;
    @JsonProperty("company_name")
    private String companyName;
    private String localisation;
    @JsonProperty("recruter_id")
    private Long recruterId;
    private String logo;
}
