package com.nw.dto.candidate;

import lombok.Data;

@Data
public class ApplicationOfferFormRequest {
    private Long candidateId;
    private String cv;
    private String coverLetter;
    private String portfolioLink;
    private Long offerId;
}
