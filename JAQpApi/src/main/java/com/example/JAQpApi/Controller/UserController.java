package com.example.JAQpApi.Controller;
import com.example.JAQpApi.Entity.Users;
import com.example.JAQpApi.Repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.OffsetDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/users")
public class UserController
{
    @Autowired
    private UsersRepo usersRepo;
    private Map<String, Integer> tokenMap = new HashMap<>();

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
            return ResponseEntity.ok().header("Access-Control-Allow-Origin", "*").build();
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Error" + e.getMessage());
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
            String token = generateString(new Random(), "QWERTYUIOPASDFGHJKLZXCVBNM1234567890", 20);
            tokenMap.put(token, user.getId());
            return ResponseEntity.ok().body("{\n" + "  token: "+ token +",\n  id: "+ user.getId() + "\n}");
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @PostMapping("/{id}/setting/first_name")
    public ResponseEntity setFirstName(@PathVariable Integer id, @RequestParam String token, @RequestParam String first_name)
    {
        try
        {
            if (tokenMap.get(token) != id)
            {
                throw new Exception();
            }
            Optional<Users> user = usersRepo.findById(id);
            if (user.isEmpty())
            {
                throw new Exception();
            }
            user.get().setFirstName(first_name);
            usersRepo.save(user.get());
            return ResponseEntity.ok().body("OK");
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @PostMapping("/{id}/setting/second_name")
    public ResponseEntity setSecondName(@PathVariable Integer id, @RequestParam String token, @RequestParam String second_name)
    {
        try
        {
            if (tokenMap.get(token) != id)
            {
                throw new Exception();
            }
            Optional<Users> user = usersRepo.findById(id);
            if (user.isEmpty())
            {
                throw new Exception();
            }
            user.get().setSecondName(second_name);
            usersRepo.save(user.get());
            return ResponseEntity.ok().body("OK");
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Error");
        }
    }


    @PostMapping("/{id}/setting/last_name")
    public ResponseEntity setLastName(@PathVariable Integer id, @RequestParam String token, @RequestParam String last_name)
    {
        try
        {
            if (tokenMap.get(token) != id)
            {
                throw new Exception();
            }
            Optional<Users> user = usersRepo.findById(id);
            if (user.isEmpty())
            {
                throw new Exception();
            }
            user.get().setLastName(last_name);
            usersRepo.save(user.get());
            return ResponseEntity.ok().body("OK");
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @PostMapping("/{id}/setting/birth_date")
    public ResponseEntity setBirthDate(@PathVariable Integer id, @RequestParam String token, @RequestParam OffsetDateTime birth_date)
    {
        try
        {
            if (tokenMap.get(token) != id)
            {
                throw new Exception();
            }
            Optional<Users> user = usersRepo.findById(id);
            if (user.isEmpty())
            {
                throw new Exception();
            }
            user.get().setBurthDate(birth_date);
            usersRepo.save(user.get());
            return ResponseEntity.ok().body("OK");
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity getUser(@PathVariable Integer id)
    {
        try
        {
            Optional<Users> user = usersRepo.findById(id);
            if (user.isEmpty())
            {
                throw new Exception();
            }
            user.get().setPassword("");
            return ResponseEntity.ok().body(user);
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
