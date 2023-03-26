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
  if (req.method === "POST") {
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
      //Get User
      const active_user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });


      // Check if user is found in DB
      if (!active_user) {
        //If user is not found, sign out
        await signOut({ redirect: false, callbackUrl: "/" });
        return res.status(403).json({ message: "Something went wrong" });
      } else {
        //Check title length
        //TODO: Might not be necessary if not allowed to submit from client
        const title: string = req.body.title;
        if (title.length > 300) {
          return res.status(406).json({ message: "Too Long" });
        } else if (title.length < 1) {
          return res.status(406).json({ message: "Empty post" });
        } else {
          //Create Post in DB
          try {
            const result = await prisma.post.create({
              data: {
                title,
                userId: active_user.id,
              },
            });
            res.status(200).json(result);
          } catch (err) {
            res.status(403).json({ err: "Error" });
          }
        }
      }
    }
  }
}
