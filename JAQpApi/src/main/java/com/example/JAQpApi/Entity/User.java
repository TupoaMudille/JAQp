package com.example.JAQpApi.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;
import java.util.List;

@Entity
@Getter
@Setter
public class User
{
    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String username;

    @Enumerated(EnumType.ORDINAL)
    private Role role;

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
    private OffsetDateTime birthDate;

    @OneToMany(mappedBy = "user")
    private List<Token> tokens;

//    @OneToMany(mappedBy = "owner")
//    private Set<Quez> ownerQuezes;
//
//    @OneToMany(mappedBy = "user")
//    private Set<UserAnswer> userUserAnswers;

}
