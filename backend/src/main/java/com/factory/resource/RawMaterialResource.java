package com.factory.resource;

import com.factory.entity.RawMaterial;
import com.factory.entity.ProductComponent;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/api/materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RawMaterialResource {

    @GET
    public List<RawMaterial> getAll() {
        return RawMaterial.listAll();
    }

    @POST
    @Transactional
    public Response create(RawMaterial material) {
        material.id = null;
        material.persist();
        return Response.status(Response.Status.CREATED).entity(material).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, RawMaterial material) {
        RawMaterial entity = RawMaterial.findById(id);
        if (entity == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        entity.name = material.name;
        entity.unit = material.unit;
        entity.stockQuantity = material.stockQuantity;
        entity.minStock = material.minStock; 
        
        return Response.ok(entity).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        RawMaterial entity = RawMaterial.findById(id);
        if (entity == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        // RF003 - Impede deleção se o material estiver vinculado a um produto
        long usageCount = ProductComponent.count("material.id", id);
        if (usageCount > 0) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Material is currently linked to " + usageCount + " product recipe(s).")
                    .build();
        }

        entity.delete();
        return Response.noContent().build();
    }
}