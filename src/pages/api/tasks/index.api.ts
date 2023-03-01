import { prisma } from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth].api";
import { convertToNumber } from "@/utils/convert-time";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const session = await getServerSession(request, response, authOptions);
  const userEmail = session?.user?.email || "";

  if (!session) {
    return response.status(401).send("Unauthorized");
  }

  const taskSchema = z.object({
    task: z
      .string({ required_error: "Task name is required" })
      .min(1, { message: "Task name must not be empty" })
      .max(255, {
        message: "Task name must not be longer than 255 characters",
      }),
    timeStart: z.string({ required_error: "Time start is required" }),
    timeEnd: z.string({ required_error: "Time end is required" }),
  });

  try {
    switch (request.method) {
      case "GET":
        const tasks = await prisma.tasks.findMany({
          where: { userEmail: userEmail },
          orderBy: { timeStart: "asc" },
        });

        response.status(200).json(tasks);
        break;
      case "POST":
        const task = taskSchema.parse(request.body);
        const { timeStart, timeEnd } = task;
        const formattedTimeStart = convertToNumber(timeStart);
        const formattedTimeEnd = convertToNumber(timeEnd);

        const newTask = await prisma.tasks.create({
          data: {
            userEmail,
            task: task.task,
            timeStart: formattedTimeStart,
            timeEnd: formattedTimeEnd,
          },
        });

        response.status(201).json(newTask);
        break;
      case "DELETE":
        await prisma.tasks.deleteMany({
          where: { userEmail },
        });

        response.status(204).end();
        break;
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues
        .map((issue) => issue.message)
        .join(", ");
      response.status(400).json({ error: errorMessage });
    } else {
      response.status(500).json({ error: "Something went wrong" });
    }
  }
}
