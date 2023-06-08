package com.nw.dto.candidate;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;


@Data
public class ProjectDto {
    private Long id;
    private String title;
    private String content;
    private String image;
    private String pathImage;
    private Long candidateId;
}
