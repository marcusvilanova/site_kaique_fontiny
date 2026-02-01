import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { eq } from "drizzle-orm";
import { cmsContent, cmsPhotos, type InsertCmsPhoto } from "../drizzle/schema";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  cms: router({
    // Content (Text)
    getContent: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return {};
      const content = await db.select().from(cmsContent);
      return content.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as Record<string, string | null>);
    }),

    updateContent: protectedProcedure.mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      // Input: { key: string, value: string, section: string }
      // Checks if exists, updates or inserts
      const { key, value, section } = input as { key: string; value: string; section: string };

      const existing = await db.select().from(cmsContent).where(eq(cmsContent.key, key));

      if (existing.length > 0) {
        await db.update(cmsContent)
          .set({ value })
          .where(eq(cmsContent.key, key));
      } else {
        await db.insert(cmsContent).values({
          key,
          value,
          section,
        });
      }
      return { success: true };
    }),

    // Photos
    getPhotos: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return await db.select().from(cmsPhotos).orderBy(cmsPhotos.order);
    }),

    addPhoto: protectedProcedure.mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const data = input as InsertCmsPhoto;
      await db.insert(cmsPhotos).values(data);
      return { success: true };
    }),

    updatePhoto: protectedProcedure.mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const { id, ...data } = input as InsertCmsPhoto & { id: number };
      await db.update(cmsPhotos).set(data).where(eq(cmsPhotos.id, id));
      return { success: true };
    }),

    deletePhoto: protectedProcedure.mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const { id } = input as { id: number };
      await db.delete(cmsPhotos).where(eq(cmsPhotos.id, id));
      return { success: true };
    }),
  }),
});

export type AppRouter = typeof appRouter;
