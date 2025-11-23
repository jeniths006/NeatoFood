package com.example.neatofood.service;

import com.example.neatofood.model.Place;
import com.example.neatofood.repository.PlaceRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.neatofood.repository.PlaceRepository;
import com.example.neatofood.service.GooglePlacesService;
import com.example.neatofood.service.GeminiService;



import java.util.List;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@Component
public class ReviewSummaryJob {

    private final PlaceRepository placeRepository;
    private final GooglePlacesService googlePlacesService;
    private final GeminiService geminiService;

    public ReviewSummaryJob(
            PlaceRepository placeRepository,
            GooglePlacesService googlePlacesService,
            GeminiService geminiService
    ) {
        this.placeRepository = placeRepository;
        this.googlePlacesService = googlePlacesService;
        this.geminiService = geminiService;
    }

    // 🔥 Run automatically when the app starts
    @EventListener(ApplicationReadyEvent.class)
    public void runOnStartup() {
        System.out.println("Running startup review update...");
        updateReviewSummary();
    }

    // 🔁 Runs every 5 minutes
    @Scheduled(cron = "0 */5 * * * *")
    public void updateReviewSummary() {
        System.out.println("Running ReviewSummaryJob");

        List<Place> places = placeRepository.findAll();

        for (Place place : places) {
            try {
                System.out.println("Updating: " + place.getName());

                List<String> reviews = googlePlacesService.fetchReviews(place.getGooglePlaceId());

                Double rating = googlePlacesService.fetchRating(place.getGooglePlaceId());
                if (rating != null) {
                    place.setRating(rating);
                    System.out.println("Rating Updated: " + rating);
                }

                if (reviews != null && !reviews.isEmpty()) {
                    String summary = geminiService.summariseReviews(reviews);
                    place.setReviewSummary(summary);
                    System.out.println("Summary updated: " + summary);
                }

                placeRepository.save(place);

            } catch (Exception e) {
                System.out.println("Error updating review summary: " + place.getName());
                e.printStackTrace();
            }
        }

        System.out.println("Finished running ReviewSummaryJob");
    }
}

