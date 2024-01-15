package com.example.JAQpApi.Repository;

import com.example.JAQpApi.Entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UsersRepo extends CrudRepository<User, Integer>
{
    User findByUsername(String username);
}
