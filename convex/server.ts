import { randomBytes } from "crypto";
import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

// Create a new task with the given text
export const createTask = mutation({
  args: { text: v.string(), token: v.string(), color: v.string() },

  handler: async (ctx, args) => {
    const token = await ctx.db
      .query('tokens')
      .filter(q => q.eq(q.field('token'), args.token))
      .first();
      if (!token) throw new Error("Invalid token");
    const newTaskId = await ctx.db.insert("tasks", { 
        title: args.text,
        isCompleted: false,
        userId: token.userId,
        color: args.color,
    });
    return newTaskId;
  },
});

export const getTasks = query({
  args: { token: v.string() },
  handler: async(ctx, args) => {
    const token = await ctx.db
      .query('tokens')
      .filter(q => q.eq(q.field('token'), args.token))
      .first();
      if (!token) return[];
      return await ctx.db.query("tasks").filter(q => q.eq(q.field('userId'), token.userId)).collect();
  },
});

export const toggleTaskCompletion = mutation({
  args: { taskId: v.id("tasks") },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.taskId);
    if (!task) throw new Error("Task not found");
    
    await ctx.db.patch(args.taskId, {
      isCompleted: !task.isCompleted,
    });
  },
});

export const deleteTask = mutation({
  args: { taskId: v.id("tasks") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.taskId);

}});

export const editTask = mutation({
  args: { taskId: v.id("tasks"), text: v.string() },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.taskId);
    if (!task) throw new Error("Task not found");

    await ctx.db.patch(args.taskId, {
      title: args.text,
    });
  },
});

export const registerUser = mutation({
  args: { username: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const newUserId = await ctx.db.insert("users", { 
        username: args.username,
        password: args.password,
    });
    return newUserId;
  },
});

export const login = mutation({
  args: { username: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
    .query('users')
    .filter(q => q.eq(q.field('username'), args.username))
    .first();
    if (!user) throw new Error("User not found");
    if (user.password !== args.password) throw new Error("Invalid password");
    
    const token = Math.random().toString(36).substring(2);

    await ctx.db.insert("tokens", {
        userId: user._id,
        token: token,
        loggedOut: false,
    });
    return{ token: token}
  },
});

export const logout = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const token = await ctx.db
      .query('tokens')
      .filter(q => q.eq(q.field('token'), args.token))
      .first();
      if (!token) throw new ConvexError("Invalid token");
      await ctx.db.patch(token._id, { loggedOut: true });
  },
});