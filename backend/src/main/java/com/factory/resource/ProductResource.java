package com.factory.resource;

import com.factory.dto.ProductionCapacityDTO;
import com.factory.dto.SuggestionDTO; 
import com.factory.entity.Product;
import com.factory.entity.ProductComponent;
import com.factory.entity.ProductionLog;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public Response create(Product product) {
        if (product.stockQuantity == null) {
            product.stockQuantity = 0; 
        }
        product.id = null;
        product.persist();
        return Response.status(Response.Status.CREATED).entity(product).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        boolean deleted = Product.deleteById(id);
        return deleted ? Response.noContent().build() : Response.status(Response.Status.NOT_FOUND).build();
    }

    @GET
    @Path("/availability")
    public List<ProductionCapacityDTO> checkAvailability() {
        List<Product> products = Product.listAll();
        List<ProductionCapacityDTO> results = new ArrayList<>();

        for (Product p : products) {
            List<ProductComponent> components = ProductComponent.list("product.id", p.id);
            if (components.isEmpty()) continue; 

            double minCapacity = Double.MAX_VALUE;
            for (ProductComponent comp : components) {
                double possibleWithThisMaterial = (double) comp.material.stockQuantity / comp.quantity;
                if (possibleWithThisMaterial < minCapacity) {
                    minCapacity = possibleWithThisMaterial;
                }
            }

            ProductionCapacityDTO dto = new ProductionCapacityDTO();
            dto.productId = p.id;
            dto.productName = p.name;
            dto.maxPossible = (int) Math.floor(minCapacity); 
            results.add(dto);
        }
        return results;
    }

    @POST
    @Path("/{id}/produce/{quantity}")
    @Transactional
    public Response produce(@PathParam("id") Long id, @PathParam("quantity") Integer quantity) {
        Product product = Product.findById(id);
        if (product == null) return Response.status(Response.Status.NOT_FOUND).build();

        List<ProductComponent> components = ProductComponent.list("product.id", id);
        List<String> missingItems = new ArrayList<>();

        for (ProductComponent comp : components) {
            double required = comp.quantity * quantity;
            if (comp.material.stockQuantity < required) {
                double missing = required - comp.material.stockQuantity;
                missingItems.add(String.format("%s (Faltam %.2f %s)", 
                    comp.material.name, missing, comp.material.unit));
            }
        }

        if (!missingItems.isEmpty()) {
            String errorMessage = "Estoque insuficiente. Itens necessários: " + String.join(", ", missingItems);
            return Response.status(Response.Status.BAD_REQUEST).entity(errorMessage).build();
        }

        for (ProductComponent comp : components) {
            comp.material.stockQuantity -= (comp.quantity * quantity);
        }
        
        product.stockQuantity = (product.stockQuantity == null ? 0 : product.stockQuantity) + quantity;
        
        ProductionLog log = new ProductionLog(product.id, product.name, quantity);
        log.persist();

        return Response.ok().build();
    }

    
    @GET
    @Path("/optimized-suggestion")
    public Response getOptimizedSuggestion() {
        List<Product> products = Product.listAll();
        
        
        products.sort((p1, p2) -> {
            Double v1 = p1.price != null ? p1.price : 0.0;
            Double v2 = p2.price != null ? p2.price : 0.0;
            return v2.compareTo(v1);
        });

        SuggestionDTO response = new SuggestionDTO();
        response.items = new ArrayList<>();
        double totalValue = 0;
        double totalProfit = 0;

        
        Map<Long, Double> temporaryStock = new HashMap<>();

        for (Product p : products) {
            List<ProductComponent> components = ProductComponent.list("product.id", p.id);
            if (components.isEmpty()) continue;

            double unitCost = components.stream()
                .mapToDouble(c -> (c.material.unitPrice != null ? c.material.unitPrice : 0.0) * c.quantity)
                .sum();

            double maxPossible = Double.MAX_VALUE;
            for (ProductComponent comp : components) {
                temporaryStock.putIfAbsent(comp.material.id, (double) (comp.material.stockQuantity != null ? comp.material.stockQuantity : 0));
                double possible = temporaryStock.get(comp.material.id) / comp.quantity;
                if (possible < maxPossible) maxPossible = possible;
            }

            int qty = (int) Math.floor(maxPossible);
            if (qty > 0) {
                for (ProductComponent comp : components) {
                    temporaryStock.put(comp.material.id, temporaryStock.get(comp.material.id) - (qty * comp.quantity));
                }

                SuggestionDTO.SuggestionItemDTO item = new SuggestionDTO.SuggestionItemDTO();
                item.productName = p.name;
                item.quantity = qty;
                item.subtotal = qty * (p.price != null ? p.price : 0.0);
                item.totalCost = qty * unitCost;
                item.margin = item.subtotal > 0 ? ((item.subtotal - item.totalCost) / item.subtotal) * 100 : 0.0;

                response.items.add(item);
                totalValue += item.subtotal;
                totalProfit += (item.subtotal - item.totalCost);
            }
        }

        response.totalPotentialValue = totalValue;
        response.totalPotentialProfit = totalProfit;
        return Response.ok(response).build();
    }
}