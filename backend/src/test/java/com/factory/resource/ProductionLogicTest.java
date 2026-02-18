package com.factory.resource;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;
import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.hasItems;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;

@QuarkusTest
public class ProductionLogicTest {

    @Test
    public void testAvailabilityEndpointStructure() {
        
        given()
          .when().get("/api/products/availability")
          .then()
             .statusCode(200)
             .body("productName", hasItems())
             .body("maxPossible", hasItems(greaterThanOrEqualTo(0)));
    }

    @Test
    public void testSuggestionEndpointPriority() {
        
        given()
          .when().get("/api/products/optimized-suggestion")
          .then()
             .statusCode(200);
    }
}