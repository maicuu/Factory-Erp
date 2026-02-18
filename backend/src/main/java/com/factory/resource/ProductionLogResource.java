package com.factory.resource;

import com.factory.entity.ProductionLog;
import io.quarkus.panache.common.Sort;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/api/logs")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductionLogResource {

    @GET
    public List<ProductionLog> getLogs() {
        
        return ProductionLog.listAll(Sort.by("timestamp").descending());
    }

    @GET
    @Path("/count")
    public Long getCount() {
        return ProductionLog.count();
    }
}