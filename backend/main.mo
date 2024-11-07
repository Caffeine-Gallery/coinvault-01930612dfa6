import Int "mo:base/Int";

import Time "mo:base/Time";
import Array "mo:base/Array";
import Float "mo:base/Float";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor {
    // Define the structure for price entries
    type PriceEntry = {
        price: Float;
        timestamp: Int;
    };

    // Stable variable to persist data across upgrades
    stable var priceHistory: [PriceEntry] = [];

    // Add a new price entry
    public func addPrice(price: Float) : async () {
        let newEntry: PriceEntry = {
            price = price;
            timestamp = Time.now();
        };
        priceHistory := Array.append(priceHistory, [newEntry]);
    };

    // Get all stored prices
    public query func getPrices() : async [PriceEntry] {
        return priceHistory;
    };

    // Calculate average price
    public query func getAveragePrice() : async ?Float {
        if (priceHistory.size() == 0) {
            return null;
        };
        
        var sum: Float = 0;
        for (entry in priceHistory.vals()) {
            sum += entry.price;
        };
        
        return ?(sum / Float.fromInt(priceHistory.size()));
    };

    // Get highest price
    public query func getHighestPrice() : async ?Float {
        if (priceHistory.size() == 0) {
            return null;
        };
        
        var highest: Float = priceHistory[0].price;
        for (entry in priceHistory.vals()) {
            if (entry.price > highest) {
                highest := entry.price;
            };
        };
        
        return ?highest;
    };
}
