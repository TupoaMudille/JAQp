package com.example.JAQpApi.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.time.LocalDate;
import java.time.OffsetDateTime;

@Entity
@Getter
@Setter
public class Users
{
    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private Integer role;

    @Column(nullable = false)
    private OffsetDateTime createdAt;

    @Column(nullable = false)
    private String password;

    @Column
    private String firstName;

    @Column
    private String secondName;

    @Column
    private String lastName;

    @Column
    private OffsetDateTime burthDate;

//    @OneToMany(mappedBy = "owner")
//    private Set<Quez> ownerQuezes;
//
//    @OneToMany(mappedBy = "user")
//    private Set<UserAnswer> userUserAnswers;

}
