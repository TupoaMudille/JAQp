package com.example.JAQpApi.Repository;

import com.example.JAQpApi.Entity.Users;
import org.springframework.data.repository.CrudRepository;

public interface UsersRepo extends CrudRepository<Users, Integer>
{
    Users findByUsername(String username);
}
