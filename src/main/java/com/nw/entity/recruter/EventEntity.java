package com.nw.entity.recruter;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "candidate_event")
public class EventEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "offer_id") private Long id;
    @Column(name = "status") private String status;
    @Column(name = "titre") private String title;
    @Column(name = "description") private String description;
    @Column(name = "type_event") private String typeEvent;
    @Column(name = "photo") private String photo;
    @Column(name = "localisation") private String localisation;

    @Column(name = "company_name") private String companyName;

    @Column(name = "publish_date") private Date publishDate;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recruter_id")
    @JsonIgnore
    private RecruterEntity recruterEntity;

}
