package com.factory.dto;

import java.util.List;

public class SuggestionDTO {
    public Double totalPotentialValue;
    public Double totalPotentialProfit;
    public List<SuggestionItemDTO> items;

    public static class SuggestionItemDTO {
        public String productName;
        public Integer quantity;
        public Double subtotal;
        public Double totalCost;
        public Double margin;
    }
}