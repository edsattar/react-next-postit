"use client";
import Image from "next/image";
import Link from "next/link";
import { PostType } from "../utils/types";
import { toast } from "react-hot-toast";
import DeleteConfirm from "../dashboard/DeleteConfirm";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  post: PostType;
  allowEdit?: boolean;
}

export default function SinglePost({ post, allowEdit }: Props) {
  const [toggle, setToggle] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/posts/deletePost", { data: id }),
    {
      onSuccess: () => {
        toast.remove();
        toast.success("Post Deleted");
        console.log("deleted");
        queryClient.invalidateQueries(["userPosts"]);
        queryClient.invalidateQueries(["allPosts"]);
      },
      onError: (error) => {
        console.log("ERROR!!!");
      },
    }
  );

  const deletePost = () => {
    toast.loading("Deleting Post...");
    mutate(post.id);
  };

  return (
    <>
      <div className="bg-white my-8 p-8 rounded-lg ">
        {/* Avatar and Name */}
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={post.user.image}
            alt="avatar"
          />
          <h3 className="font-bold text-gray-700">{post.user.name}</h3>
        </div>
        {/* Post Title */}
        <div className="my-8 ">
          <p className="break-all">{post.title}</p>
        </div>
        {/* Comments and Delete */}
        <div className="flex gap-4 cursor-pointer items-center">
          <Link
            href={{
              pathname: `/post/${post.id}`,
            }}>
            <p className=" text-sm font-bold text-gray-700">
              {post.comments?.length} Comments
            </p>
          </Link>
          {allowEdit && (
            <button
              onClick={(e) => setToggle(true)}
              className=" text-sm font-bold text-red-500">
              Delete
            </button>
          )}
        </div>
      </div>
      {toggle && <DeleteConfirm deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
}
