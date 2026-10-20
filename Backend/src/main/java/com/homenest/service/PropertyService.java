
package com.homenest.service;

import com.homenest.model.Property;
import com.homenest.repository.PropertyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;

    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Property getPropertyById(Long id) {
        return propertyRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Property not found: " + id));
    }

    public List<Property> getPropertiesByCity(String city) {
        return propertyRepository.findByCityIgnoreCase(city);
    }

    public Property addProperty(Property property) {
        property.setId(null);
        return propertyRepository.save(property);
    }

    public Property updateProperty(Long id, Property updatedProperty) {
        Property existing = getPropertyById(id);

        existing.setName(updatedProperty.getName());
        existing.setCity(updatedProperty.getCity());
        existing.setAddress(updatedProperty.getAddress());
        existing.setRoomType(updatedProperty.getRoomType());
        existing.setRent(updatedProperty.getRent());
        existing.setDescription(updatedProperty.getDescription());
        existing.setImageUrl(updatedProperty.getImageUrl());
        existing.setAvailable(updatedProperty.isAvailable());

        return propertyRepository.save(existing);
    }

    public void deleteProperty(Long id) {
        Property existing = getPropertyById(id);
        propertyRepository.delete(existing);
    }
}

