package com.nw.controller;

import com.nw.entity.user.Contact;
import com.nw.repository.user.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ContactController {

    @Autowired
    ContactRepository contactRepository;

    @PostMapping("/contact")
    public ResponseEntity<Contact> createContact(@Valid @RequestBody Contact contact) {
        Contact result = contactRepository.save(contact);
        return ResponseEntity.ok().body(result);
    }


    @GetMapping("/contact")
    public List<Contact> getAllContact() {
        return contactRepository.findAll();
    }


    @GetMapping("/contact/{id}")
    public ResponseEntity<Optional<Contact>> getContact(@PathVariable Long id) {
        Optional<Contact> contact = contactRepository.findById(id);
        return ResponseEntity.ok().body(contact);
    }



    @DeleteMapping("/contact/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        contactRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }


}
