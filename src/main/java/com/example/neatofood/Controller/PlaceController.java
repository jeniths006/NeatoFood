package com.example.neatofood.Controller;

import com.example.neatofood.service.ReviewSummaryJob;
import com.example.neatofood.model.Place;
import com.example.neatofood.repository.PlaceRepository;
import com.example.neatofood.service.GeminiService;
import com.example.neatofood.service.ReviewSummaryJob;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.neatofood.service.GeminiService;

import java.util.List;

@RestController
@RequestMapping("/api/places")
@CrossOrigin
public class PlaceController {

    private final PlaceRepository placeRepository;
    private final GeminiService geminiService;
    private final ReviewSummaryJob reviewSummaryJob;




    public PlaceController(PlaceRepository placeRepository, GeminiService geminiService, ReviewSummaryJob reviewSummaryJob) {
        this.placeRepository = placeRepository;
        this.geminiService = geminiService;
        this.reviewSummaryJob = reviewSummaryJob;
    }





    @GetMapping("/force-update")
    public String forceUpdate() {
        reviewSummaryJob.updateReviewSummary();
        return "OK";
    }

    @GetMapping("/run-summary-job")
    public String runSummaryJobNow() {
        reviewSummaryJob.updateReviewSummary();
        return "Job executed manually.";
    }

    @GetMapping("/test-gemini")
    public String testGemini(@RequestParam String text) {
        return geminiService.summariseReviews(List.of(text));
    }

    // MAIN LIST ENDPOINT
    // Examples:
    //  - GET /api/places
    //  - GET /api/places?category=drinks
    //  - GET /api/places?category=drinks&item=latte
    @GetMapping
    public List<Place> getPlaces(
            @RequestParam(required = false) String category,
            @RequestParam(name = "item", required = false) String baseItem
    ) {
        if (category != null && !category.isBlank()
                && baseItem != null && !baseItem.isBlank()) {
            // Specific item comparison within a category
            return placeRepository.findByCategoryAndBaseItemOrderByPriceAsc(category, baseItem);
        } else if (category != null && !category.isBlank()) {
            // All items in a category
            return placeRepository.findByCategoryOrderByPriceAsc(category);
        } else {
            // Everything
            return placeRepository.findAll();
        }
    }

    // DETAILS FOR ONE PLACE ROW
    @GetMapping("/{id}")
    public Place getPlace(@PathVariable Long id) {
        return placeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Place not found"));
    }

    // CHEAPEST FOR A SPECIFIC ITEM IN A CATEGORY
    @GetMapping("/cheapest")
    public List<Place> getCheapest(
            @RequestParam String category,
            @RequestParam(name = "item") String baseItem
    ) {
        return placeRepository.findTop3ByCategoryAndBaseItemOrderByPriceAsc(category, baseItem);
    }

    // BEST RATED FOR A SPECIFIC ITEM IN A CATEGORY
    @GetMapping("/best")
    public List<Place> getBest(
            @RequestParam String category,
            @RequestParam(name = "item") String baseItem
    ) {
        return placeRepository.findTop3ByCategoryAndBaseItemOrderByRatingDesc(category, baseItem);
    }

    // LIST ALL CATEGORIES (for homepage dropdown)
    @GetMapping("/categories")
    public List<String> getCategories() {
        return placeRepository.findDistinctCategories();
    }

    // LIST ALL ITEMS IN A CATEGORY (for item dropdown)
    @GetMapping("/items")
    public List<String> getItemsForCategory(@RequestParam String category) {
        return placeRepository.findDistinctBaseItemsByCategory(category);
    }
}
