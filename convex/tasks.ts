import { query,mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAssets = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("assets").collect();
  },
});
export const getModels = query({
    args: {},
    handler: async (ctx) => {
      return await ctx.db.query("models").collect();
    },
});
export const getManufactures = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("manufactures").collect();
    },
});
export const getLocations = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("locations").collect();
    },
});

export const getManufacturerById = query({
    args: { id: v.string() },
    handler: async (ctx, args) => {
        const manufacturer = await ctx.db
            .query("manufactures")
            .filter((q) => q.eq(q.field("_id"), args.id))
            .first();
        return manufacturer;
    },
});

export const createAsset = mutation({
    args: { 
        assetNumber: v.string(),
        assetModel: v.string(),
        storageLocation: v.string(),
        assetName: v.optional(v.string()),
        assetPurchaseDate: v.optional(v.string()),
        serialNumber: v.optional(v.string()),
     },
    handler: async (ctx, args) => {
      const taskId = await ctx.db.insert("assets", { 
        assetNumber: args.assetNumber,
        assetModel: args.assetModel,
        storageLocation: args.storageLocation,
        assetName: args.assetName,
        assetPurchaseDate: args.assetPurchaseDate,
        serialNumber: args.serialNumber});
      // do something with `taskId`
    },
  });

  