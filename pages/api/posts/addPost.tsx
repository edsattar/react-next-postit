// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Not Logged In" });
    }
    const title: string = req.body.title;

    //Check if post is too long or too short
    if (title.length > 300) {
      return res.status(400).json({ message: "Post is too long" });
    } else if (title.length < 1) {
      return res.status(400).json({ message: "Post is too short" });
    }

    //Create post
  }
}
