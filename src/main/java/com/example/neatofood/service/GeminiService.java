package com.example.neatofood.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

@Service
public class GeminiService {

    @Value("${gemini.apiKey:}")
    private String apiKey;

    private final HttpClient client = HttpClient.newHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();


    public String summariseReviews(List<String> reviews) {
        if (reviews == null || reviews.isEmpty()) {
            return "Not enough reviews to generate a summary.";
        }

        String joined = String.join("\n\n", reviews);

        // If no key, just return a trimmed version so UI still has something
        if (apiKey == null || apiKey.isBlank()) {
            return fallbackSummary(joined);
        }

        try {
            String prompt =
                    "Summarise these customer reviews in 2–3 sentences, focusing on food quality, " +
                            "price, taste and overall experience:\n\n" + joined;

            String body = """
            {
              "contents": [{
                "parts": [{ "text": %s }]
              }]
            }
            """.formatted(objectMapper.writeValueAsString(prompt));

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(
                            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey
                    ))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .build();

            HttpResponse<String> response =
                    client.send(request, HttpResponse.BodyHandlers.ofString());

            // 🔥 DEBUG: print everything Gemini sends back
            System.out.println("Gemini status: " + response.statusCode());
            System.out.println("Gemini raw body: " + response.body());

            JsonNode root = objectMapper.readTree(response.body());

            // If there's an error field, show that instead of generic message
            if (root.has("error")) {
                JsonNode error = root.get("error");
                String msg = error.path("message").asText("Unknown Gemini error");
                System.out.println("Gemini error: " + msg);
                return "Gemini error: " + msg;
            }

            JsonNode candidates = root.path("candidates");

            if (candidates.isArray() && candidates.size() > 0) {
                JsonNode parts = candidates.get(0).path("content").path("parts");
                if (parts.isArray() && parts.size() > 0) {
                    String text = parts.get(0).path("text").asText();
                    if (text != null && !text.isBlank()) {
                        return text;
                    }
                }
            }

            // If structure is weird, fall back instead of failing
            System.out.println("Gemini unexpected response format, using fallback.");
            return fallbackSummary(joined);

        } catch (Exception e) {
            e.printStackTrace();
            return fallbackSummary(joined);
        }
    }

    private String fallbackSummary(String joined) {
        String truncated = joined.trim();
        if (truncated.length() > 400) {
            truncated = truncated.substring(0, 400) + "...";
        }
        return truncated;
    }


}

