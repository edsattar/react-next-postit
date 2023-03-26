"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (title: string) => await axios.post("/api/posts/addPost", { title }),
    {
      // on Error toast error message
      onError: (err) => {
        if (err instanceof AxiosError) {
          toast.dismiss();
          toast.error(err?.response?.data.message);
        }
      },
      // On success toast success message and clear input
      onSuccess: (res) => {
        toast.dismiss();
        toast.success("Post created successfully");
        queryClient.invalidateQueries(["allPosts"]);
        queryClient.invalidateQueries(["userPosts"]);
        setTitle("");
      },
    }
  );

  // Form submit handler
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate(title);
    toast.loading("Creating post...");
  };

  return (
    <>
      {/* Input Form Card */}
      <form onSubmit={submitHandler} className="bg-white my-8 p-8 rounded-md">
        {/* Text input Area */}
        <div className="flex flex-col my-4">
          <textarea
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            value={title}
            placeholder="What's on your mind?"
            className="p-4 text-lg rounded-md my-2 bg-gray-200"></textarea>
        </div>
        {/* Character counter and Button*/}
        <div className=" flex items-center justify-between gap-2">
          {/* Character counter */}
          <p
            className={`font-bold text-sm ${
              title.length > 300 ? "text-red-700" : "text-gray-700"
            }`}>
            {`${title.length}/300`}
          </p>
          {/* Submit button */}
          <button
            disabled={
              title.length > 300 || title.trim().length < 1 ? true : false
            }
            className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
            type="submit">
            Create post
          </button>
        </div>
      </form>
    </>
  );
}
