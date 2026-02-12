import { pgTable, text, serial, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const assets = pgTable("assets", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull().unique(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'stock' | 'crypto'
  description: text("description"),
  imageUrl: text("image_url"),
  cachedData: jsonb("cached_data"),
  lastUpdated: timestamp("last_updated"),
  isActive: boolean("is_active").default(true),
});

export const insertAssetSchema = createInsertSchema(assets).omit({ 
  id: true, 
  lastUpdated: true, 
  cachedData: true 
});

export type Asset = typeof assets.$inferSelect;
export type InsertAsset = z.infer<typeof insertAssetSchema>;

export type AssetResponse = Asset;

// For API requests
export type CreateAssetRequest = InsertAsset;
export type UpdateAssetRequest = Partial<InsertAsset>;
