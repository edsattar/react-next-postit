import prisma from "@/prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET" && typeof(req.query.details) === "string") {
    // GET /api/posts/123
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: req.query.details,
        },
        include: {
          user: true,
          comments: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: "error" });
    }
  }
}
