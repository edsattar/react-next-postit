// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { signOut } from "next-auth/react";
import prisma from "../../../prisma/client";
import toast from "react-hot-toast";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);

    // Check if user is logged in
    if (!session?.user?.email) {
      //If user is not logged in alert user, return error
      //TODO: redirect to sign-in page
      toast.error("Please sign-in to create a post.");
      return res
        .status(401)
        .json({ message: "Please sign-in to create a post." });
    } else {
      try {
        const result = await prisma.post.delete({
          where: {
            id: req.body,
          },
        });
        res.status(200).json(result);
        await prisma.$disconnect();
      } catch (error) {
        res.status(403).json({ err: "Error" });
        await prisma.$disconnect();
      }
    }
  }
}
