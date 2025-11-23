package com.example.neatofood.repository;

import com.example.neatofood.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlaceRepository extends JpaRepository<Place, Long> {


    List<Place> findByCategoryOrderByPriceAsc(String category);

    List<Place> findByCategoryAndBaseItemOrderByPriceAsc(String category, String baseItem);

    List<Place> findTop3ByCategoryAndBaseItemOrderByPriceAsc(String category, String baseItem);

    List<Place> findTop3ByCategoryAndBaseItemOrderByRatingDesc(String category, String baseItem);

    @Query("SELECT DISTINCT p.category FROM Place p")
    List<String> findDistinctCategories();

    @Query("SELECT DISTINCT p.baseItem FROM Place p WHERE p.category = :category")
    List<String> findDistinctBaseItemsByCategory(@Param("category") String category);
}
