package com.example.neatofood.Controller;

import com.example.neatofood.model.Item;
import com.example.neatofood.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {
    
    @Autowired
    private ItemRepository itemRepository;
    
    // GET endpoint to retrieve all items from the database
    @GetMapping
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }
    
    // GET endpoint to retrieve a single item by ID
    @GetMapping("/{id}")
    public Item getItemById(@PathVariable Long id) {
        return itemRepository.findById(id).orElse(null);
    }
    
    // POST endpoint to create a new item
    @PostMapping
    public Item createItem(@RequestBody Item item) {
        return itemRepository.save(item);
    }
    
    // PUT endpoint to update an existing item
    @PutMapping("/{id}")
    public Item updateItem(@PathVariable Long id, @RequestBody Item itemDetails) {
        Item item = itemRepository.findById(id).orElse(null);
        if (item != null) {
            item.setName(itemDetails.getName());
            item.setDescription(itemDetails.getDescription());
            item.setPrice(itemDetails.getPrice());
            return itemRepository.save(item);
        }
        return null;
    }
    
    // DELETE endpoint to delete an item
    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        itemRepository.deleteById(id);
    }
}
