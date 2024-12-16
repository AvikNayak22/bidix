import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const bids = pgTable("b_bids", {
  id: serial("id").primaryKey(),
});
