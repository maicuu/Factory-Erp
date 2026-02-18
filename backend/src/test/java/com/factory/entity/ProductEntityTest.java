package com.factory.entity;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

@QuarkusTest
public class ProductEntityTest {

    @Test
    @Transactional
    public void testProductPersistence() {
        Product product = new Product();
        product.name = "Test Unit";
        product.price = 150.0;
        product.stockQuantity = 10;
        
        product.persist();
        
        Product found = Product.find("name", "Test Unit").firstResult();
        Assertions.assertNotNull(found);
        Assertions.assertEquals(150.0, found.price);
    }
}