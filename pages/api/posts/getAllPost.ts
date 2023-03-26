// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    //Fetch all Post
    try {
      const result = await prisma.post.findMany({
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }); 

      // place result in res state
      res.status(200).json(result);
      await prisma.$disconnect();
      
    } catch (err) {
      res.status(403).json({ err: "Error Fetching" });
      await prisma.$disconnect();
    }
  }
}
