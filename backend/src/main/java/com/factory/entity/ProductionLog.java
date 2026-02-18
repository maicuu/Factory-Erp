package com.factory.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class ProductionLog extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    public Long id;

    public Long productId;
    public String productName;
    public Integer quantityProduced;
    public LocalDateTime timestamp;

    public ProductionLog() {}

    public ProductionLog(Long productId, String productName, Integer quantityProduced) {
        this.productId = productId;
        this.productName = productName;
        this.quantityProduced = quantityProduced;
        this.timestamp = LocalDateTime.now();
    }
}