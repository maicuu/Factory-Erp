package com.factory.resource;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
public class ProductResourceTest {

    @Test
public void testListAllProducts() {
    given()
      .when().get("/api/products")
      .then()
         .statusCode(is(200));
}
}