// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    //Fetch all Post
    // Check if user is logged in
    if (!session?.user?.email) {
      return res.status(403).json({ message: "Not Authenticated" });
    }
    else {
      const active_user = await prisma.user.findUnique({
        where: { email: session.user.email },
        
      });
      if (!active_user) {
        return res.status(403).json({ message: "User not in DB" });
      } else {
        try {
          const result = await prisma.post.findMany({
            include: {
              user: true,
              comments: true,
            },
            orderBy: {
              createdAt: "desc",
            },
            where: {
              userId: active_user.id,
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
  }
}
