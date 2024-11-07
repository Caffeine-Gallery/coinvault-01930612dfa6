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
}
