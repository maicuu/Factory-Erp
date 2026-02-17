package com.factory.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;

@Entity
public class RawMaterial extends PanacheEntity {
    public String name;
    public String unit; 
    public Double stockQuantity;
}