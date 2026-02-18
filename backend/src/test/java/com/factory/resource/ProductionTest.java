package com.factory.resource;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;


import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.greaterThan;

@QuarkusTest
public class ProductionTest {

    @Test
    public void testPriorityByValue() {
        given()
          .when().get("/api/products/optimized-suggestion")
          .then()
             .statusCode(is(200))
             .body("totalPotentialValue", greaterThan(0.0f));
    }
}