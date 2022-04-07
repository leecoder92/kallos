package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long user_id = null;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @Column
    private String profile_img;

    @Builder
    public User(Long user_id, String address, String name, String description, String profile_img) {

        this.user_id = user_id;
        this.address = address;
        this.name = name;
        this.description = description;
        this.profile_img = profile_img;
    }
}
