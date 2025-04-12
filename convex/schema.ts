// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  assets: defineTable({
    // --- Required Fields ---

    assetNumber: v.string(),
    assetModel: v.string(),
    storageLocation: v.string(),

    // --- Optional Fields ---
    serialNumber: v.optional(v.string()),
    assetName: v.optional(v.string()),
    assetCategory: v.optional(v.string()),
    assetPurchasePrice: v.optional(v.number()),
    assetDailyHire: v.optional(v.number()),
    assetWeeklyHire: v.optional(v.number()),
    weight: v.optional(v.number()),
    assetPurchaseDate: v.optional(v.string())
  }),
models: defineTable({
    modelName: v.string(),
    manufacture: v.string(),
    modelCategory: v.string(),
    modelPurchase: v.number(),
    modelDailyHire: v.number(),
    modelWeeklyHire: v.number(),
    modelWeight: v.number(),
  }),
manufactures: defineTable({
    manufactureName: v.string()
  }),
locations: defineTable({
    locationName: v.string(),
    locationAddressStreet1: v.string(),
    locationAddressStreet2: v.optional(v.string()),
    locationAddressSuburb: v.string(),
    locationAddressPostcode: v.number(),
    locationAddressState: v.string(),
})
});
