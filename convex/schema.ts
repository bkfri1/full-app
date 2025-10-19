import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    tasks: defineTable({
        title: v.string(),
        isCompleted: v.boolean(),
        userId: v.id("users"),
    }),
    users: defineTable({
        username: v.string(),
        password: v.string(),
    }),
    tokens: defineTable({
        userId: v.id("users"),
        token: v.string(),
        loggedOut: v.boolean(),
    }),
});