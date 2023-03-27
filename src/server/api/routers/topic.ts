import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const topicRouter = createTRPCRouter({
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const deleteTopic = ctx.prisma.topic.delete({
        where: {
          id: input.id,
        },
      });

      const deleteNotes = ctx.prisma.note.deleteMany({
        where: {
          topicId: input.id,
        },
      });

      return ctx.prisma.$transaction([deleteNotes, deleteTopic]);
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.topic.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.topic.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
        },
      });
    }),
});
