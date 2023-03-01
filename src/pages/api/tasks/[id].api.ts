import { prisma } from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth].api";
import { convertToNumber } from "@/utils/convert-time";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const id = Math.abs(Number(request.query.id));

  const session = await getServerSession(request, response, authOptions);
  const userEmail = session?.user?.email || "";

  if (!session) {
    return response.status(401).send("Unauthorized");
  }

  const taskSchema = z.object({
    task: z
      .string()
      .min(1, { message: "Task name must not be empty" })
      .max(255, {
        message: "Task name must not be longer than 255 characters",
      })
      .optional(),
    timeStart: z.string().optional(),
    timeEnd: z.string().optional(),
  });

  if (isNaN(id)) return response.status(400).json({ message: "Invalid id" });

  const task = await prisma.tasks.findFirst({ where: { id, userEmail } });

  if (!task) return response.status(404).json({ message: "Task not found" });

  switch (request.method) {
    case "GET":
      if (task.userEmail !== userEmail) {
        response.status(404).json({ message: "Task not found" });
      }

      response.status(200).json(task);
      break;
    case "PATCH":
      const parsedTask = taskSchema.parse(request.body);
      const { timeStart, timeEnd } = parsedTask;
      const formattedTimeStart = convertToNumber(
        timeStart || task.timeStart.toString()
      );
      const formattedTimeEnd = convertToNumber(
        timeEnd || task.timeEnd.toString()
      );

      if (task.userEmail !== userEmail) {
        return response.status(404).json({ message: "Task not found" });
      }

      const updatedTask = await prisma.tasks.update({
        where: { id },
        data: {
          task: parsedTask.task,
          timeStart: formattedTimeStart,
          timeEnd: formattedTimeEnd,
        },
      });

      response.status(200).json(updatedTask);
      break;
    case "DELETE":
      console.log(task.userEmail, userEmail);
      if (task.userEmail !== userEmail) {
        return response.status(404).json({ message: "Task not found" });
      }

      await prisma.tasks.delete({ where: { id: Number(id) } });

      response.status(204).end();
      break;
  }
}
