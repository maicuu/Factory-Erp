package com.factory.resource;

import com.factory.entity.Product;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/api/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    @GET
    public List<Product> listAll() {
        return Product.listAll();
    }

    @POST
    @Transactional
    public Product create(Product product) {
        product.persist();
        return product;
    }

    @DELETE
@Path("/{id}")
@Transactional
public void delete(@PathParam("id") Long id) {
    Product.deleteById(id);
}
}
