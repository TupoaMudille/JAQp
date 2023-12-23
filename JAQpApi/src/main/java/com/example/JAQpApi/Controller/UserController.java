package com.example.JAQpApi.Controller;

import com.example.JAQpApi.Entity.Users;
import com.example.JAQpApi.Repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/users")
public class UserController
{
    @Autowired
    private UsersRepo usersRepo;
    private Map<String, Integer> TokenMap = new HashMap<>();

    @PostMapping("/register")
    public ResponseEntity registerUser(@RequestParam String password, @RequestParam String username)
    {
        try
        {
            Users user = new Users();
            user.setRole(0);
            user.setPassword(password);
            user.setUsername(username);
            user.setCreatedAt(OffsetDateTime.now());
            usersRepo.save(user);
            return ResponseEntity.ok().build();
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping("/login")
    public ResponseEntity loginUser(@RequestParam String password, @RequestParam String username)
    {
        try
        {
            Users user = usersRepo.findByUsername(username);
            if (user == null)
            {
                return ResponseEntity.badRequest().body("UserNotFound");
            }
            if (!user.getPassword().equals(password)) {
                return ResponseEntity.badRequest().body("WrongPassword");
            }
            String token = generateString(new Random(), "qqwertyuiopsdlkjvhgdbenfasdfhvj", 10);
            TokenMap.put(token, user.getId());
            return ResponseEntity.ok().body("{\n" + "  token: "+ token +"\n" + "}");
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    private String generateString(Random rng, String characters, int length)
    {
        char[] text = new char[length];
        for (int i = 0; i < length; i++)
        {
            text[i] = characters.charAt(rng.nextInt(characters.length()));
        }
        return new String(text);
    }

}
