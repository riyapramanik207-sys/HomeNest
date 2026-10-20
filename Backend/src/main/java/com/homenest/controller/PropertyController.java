
package com.homenest.controller;

import com.homenest.model.Property;
import com.homenest.service.PropertyService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "http://localhost:5173")
public class PropertyController {

    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping
    public ResponseEntity<List<Property>> getAllProperties(
            @RequestParam(required = false) String city) {

        List<Property> properties;

        if (city != null && !city.isBlank()) {
            properties = propertyService.getPropertiesByCity(city);
        } else {
            properties = propertyService.getAllProperties();
        }

        return ResponseEntity.ok(properties);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(
            @PathVariable Long id) {
        return ResponseEntity.ok(
                propertyService.getPropertyById(id));
    }

    @PostMapping
    public ResponseEntity<Property> addProperty(
            @RequestBody Property property) {
        Property saved = propertyService.addProperty(property);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Property> updateProperty(
            @PathVariable Long id,
            @RequestBody Property property) {
        return ResponseEntity.ok(
                propertyService.updateProperty(id, property));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(
            @PathVariable Long id) {
        propertyService.deleteProperty(id);
        return ResponseEntity.noContent().build();
    }
}
