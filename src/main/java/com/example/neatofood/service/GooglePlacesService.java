package com.example.neatofood.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
public class GooglePlacesService {

    @Value("${google.places.apiKey}")
    private String apiKey;

    private final RestClient restClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public GooglePlacesService(RestClient.Builder builder) {
        this.restClient = builder.build();
    }

    public List<String> fetchReviews(String placeId) {
        if (placeId == null || placeId.isBlank()) {
            System.out.println("No google_place_id set for this place");
            return List.of();
        }

        String encodedPlaceId = URLEncoder.encode(placeId, StandardCharsets.UTF_8);
        String url = "https://maps.googleapis.com/maps/api/place/details/json"
                + "?place_id=" + encodedPlaceId
                + "&key=" + apiKey
                + "&fields=rating,reviews,user_ratings_total";

        System.out.println("Google Places REVIEWS url: " + url);

        String body = restClient.get()
                .uri(url)
                .retrieve()
                .body(String.class);

        System.out.println("Google Places raw body (reviews): " + body);

        try {
            JsonNode root = objectMapper.readTree(body);
            String status = root.path("status").asText();
            if (!"OK".equals(status)) {
                System.out.println("Google Places status not OK (reviews): " + status);
                return List.of();
            }

            JsonNode reviewsNode = root.path("result").path("reviews");
            if (!reviewsNode.isArray()) {
                System.out.println("No reviews array in response");
                return List.of();
            }

            List<String> reviews = new ArrayList<>();
            for (JsonNode reviewNode : reviewsNode) {
                String text = null;

                // Old API: review.text
                if (reviewNode.has("text") && reviewNode.get("text").isTextual()) {
                    text = reviewNode.get("text").asText();
                }
                // Newer style: review.text.text
                else if (reviewNode.has("text") && reviewNode.get("text").isObject()) {
                    text = reviewNode.get("text").path("text").asText();
                }

                if (text != null && !text.isBlank()) {
                    reviews.add(text);
                }
            }

            System.out.println("Extracted " + reviews.size() + " reviews");
            return reviews;

        } catch (Exception e) {
            System.out.println("Error parsing Google Places reviews JSON");
            e.printStackTrace();
            return List.of();
        }
    }

    public Double fetchRating(String placeId) {
        if (placeId == null || placeId.isBlank()) {
            return null;
        }

        String encodedPlaceId = URLEncoder.encode(placeId, StandardCharsets.UTF_8);
        String url = "https://maps.googleapis.com/maps/api/place/details/json"
                + "?place_id=" + encodedPlaceId
                + "&key=" + apiKey
                + "&fields=rating";

        System.out.println("Google Places RATING url: " + url);

        String body = restClient.get()
                .uri(url)
                .retrieve()
                .body(String.class);

        System.out.println("Google Places raw body (rating): " + body);

        try {
            JsonNode root = objectMapper.readTree(body);
            String status = root.path("status").asText();
            if (!"OK".equals(status)) {
                System.out.println("Google Places status not OK (rating): " + status);
                return null;
            }

            if (root.path("result").has("rating")) {
                double rating = root.path("result").path("rating").asDouble();
                System.out.println("Parsed rating: " + rating);
                return rating;
            }
            return null;
        } catch (Exception e) {
            System.out.println("Error parsing Google Places rating JSON");
            e.printStackTrace();
            return null;
        }
    }
}
