package com.factory.resource;

import com.factory.entity.ProductComponent;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/api/components")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductComponentResource {

    @GET
    @Path("/product/{productId}")
    public List<ProductComponent> getByProduct(@PathParam("productId") Long productId) {
        return ProductComponent.list("product.id", productId);
    }

    @POST
    @Transactional
    public Response addComponent(ProductComponent component) {
        
        component.id = null; 
        component.persist();
        return Response.status(Response.Status.CREATED).entity(component).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response remove(@PathParam("id") Long id) {
        boolean deleted = ProductComponent.deleteById(id);
        if (deleted) {
            return Response.noContent().build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
}